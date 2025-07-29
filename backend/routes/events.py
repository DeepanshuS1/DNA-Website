from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from models import Event, EventCreate, EventUpdate, RSVP, RSVPCreate, RSVPUpdate, User
from auth import get_current_active_user, require_admin
from database import get_database
from datetime import datetime
import uuid

router = APIRouter()

@router.get("/", response_model=List[Event])
async def get_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    status: Optional[str] = None,
    event_type: Optional[str] = None
):
    """Get all events (paginated)"""
    database = await get_database()
    
    # Build query
    query = {}
    if status:
        query["status"] = status
    if event_type:
        query["event_type"] = event_type
    
    # Get events
    cursor = database.events.find(query).sort("start_date", 1).skip(skip).limit(limit)
    events = []
    async for event_data in cursor:
        event_data["_id"] = str(event_data["_id"])
        events.append(Event(**event_data))
    
    return events

@router.post("/", response_model=Event)
async def create_event(
    event: EventCreate,
    current_user: User = Depends(require_admin)
):
    """Create a new event (Admin only)"""
    database = await get_database()
    
    event_dict = event.dict()
    event_dict["_id"] = str(uuid.uuid4())
    event_dict["created_by"] = current_user.id
    event_dict["created_at"] = datetime.utcnow()
    event_dict["updated_at"] = datetime.utcnow()
    event_dict["participant_count"] = 0
    
    await database.events.insert_one(event_dict)
    
    return Event(**event_dict)

@router.get("/{event_id}", response_model=Event)
async def get_event(event_id: str):
    """Get event by ID"""
    database = await get_database()
    event_data = await database.events.find_one({"_id": event_id})
    
    if not event_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    event_data["_id"] = str(event_data["_id"])
    return Event(**event_data)

@router.put("/{event_id}", response_model=Event)
async def update_event(
    event_id: str,
    event_update: EventUpdate,
    current_user: User = Depends(require_admin)
):
    """Update event (Admin only)"""
    database = await get_database()
    
    # Check if event exists
    existing_event = await database.events.find_one({"_id": event_id})
    if not existing_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    # Prepare update data
    update_data = event_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update event
    await database.events.update_one(
        {"_id": event_id},
        {"$set": update_data}
    )
    
    # Return updated event
    event_data = await database.events.find_one({"_id": event_id})
    event_data["_id"] = str(event_data["_id"])
    
    return Event(**event_data)

@router.delete("/{event_id}")
async def delete_event(
    event_id: str,
    current_user: User = Depends(require_admin)
):
    """Delete event (Admin only)"""
    database = await get_database()
    
    result = await database.events.delete_one({"_id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    # Also delete related RSVPs
    await database.rsvps.delete_many({"event_id": event_id})
    
    return {"message": "Event deleted successfully"}

# RSVP Routes
@router.post("/{event_id}/rsvp", response_model=RSVP)
async def create_rsvp(
    event_id: str,
    rsvp_data: RSVPCreate,
    current_user: User = Depends(get_current_active_user)
):
    """RSVP to an event"""
    database = await get_database()
    
    # Check if event exists
    event = await database.events.find_one({"_id": event_id})
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    
    # Check if user already has an RSVP
    existing_rsvp = await database.rsvps.find_one({
        "event_id": event_id,
        "user_id": current_user.id
    })
    if existing_rsvp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already RSVPed to this event"
        )
    
    # Create RSVP
    rsvp_dict = rsvp_data.dict()
    rsvp_dict["_id"] = str(uuid.uuid4())
    rsvp_dict["user_id"] = current_user.id
    rsvp_dict["event_id"] = event_id
    rsvp_dict["created_at"] = datetime.utcnow()
    rsvp_dict["updated_at"] = datetime.utcnow()
    
    await database.rsvps.insert_one(rsvp_dict)
    
    # Update event participant count
    await database.events.update_one(
        {"_id": event_id},
        {"$inc": {"participant_count": 1}}
    )
    
    return RSVP(**rsvp_dict)

@router.get("/{event_id}/rsvps", response_model=List[dict])
async def get_event_rsvps(
    event_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get RSVPs for an event"""
    database = await get_database()
    
    # Build aggregation pipeline to join with users
    pipeline = [
        {"$match": {"event_id": event_id}},
        {"$lookup": {
            "from": "users",
            "localField": "user_id",
            "foreignField": "_id",
            "as": "user"
        }},
        {"$unwind": "$user"},
        {"$project": {
            "_id": {"$toString": "$_id"},
            "status": 1,
            "notes": 1,
            "created_at": 1,
            "user": {
                "_id": {"$toString": "$user._id"},
                "full_name": "$user.full_name",
                "email": "$user.email",
                "avatar_url": "$user.avatar_url"
            }
        }}
    ]
    
    rsvps = []
    async for rsvp in database.rsvps.aggregate(pipeline):
        rsvps.append(rsvp)
    
    return rsvps

@router.put("/rsvps/{rsvp_id}", response_model=RSVP)
async def update_rsvp(
    rsvp_id: str,
    rsvp_update: RSVPUpdate,
    current_user: User = Depends(get_current_active_user)
):
    """Update user's RSVP"""
    database = await get_database()
    
    # Check if RSVP exists and belongs to user
    existing_rsvp = await database.rsvps.find_one({
        "_id": rsvp_id,
        "user_id": current_user.id
    })
    if not existing_rsvp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="RSVP not found"
        )
    
    # Prepare update data
    update_data = rsvp_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update RSVP
    await database.rsvps.update_one(
        {"_id": rsvp_id},
        {"$set": update_data}
    )
    
    # Return updated RSVP
    rsvp_data = await database.rsvps.find_one({"_id": rsvp_id})
    rsvp_data["_id"] = str(rsvp_data["_id"])
    
    return RSVP(**rsvp_data)

@router.delete("/rsvps/{rsvp_id}")
async def cancel_rsvp(
    rsvp_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Cancel RSVP"""
    database = await get_database()
    
    # Check if RSVP exists and belongs to user
    existing_rsvp = await database.rsvps.find_one({
        "_id": rsvp_id,
        "user_id": current_user.id
    })
    if not existing_rsvp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="RSVP not found"
        )
    
    # Delete RSVP
    await database.rsvps.delete_one({"_id": rsvp_id})
    
    # Update event participant count
    await database.events.update_one(
        {"_id": existing_rsvp["event_id"]},
        {"$inc": {"participant_count": -1}}
    )
    
    return {"message": "RSVP cancelled successfully"}