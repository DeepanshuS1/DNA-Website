from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from models import ContactMessage, ContactMessageCreate, User
from auth import get_current_active_user, require_admin
from database import get_database
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/", response_model=dict)
async def create_contact_message(message: ContactMessageCreate):
    """Create a new contact message"""
    database = await get_database()
    
    message_dict = message.dict()
    message_dict["_id"] = str(uuid.uuid4())
    message_dict["is_read"] = False
    message_dict["created_at"] = datetime.utcnow()
    
    await database.contact_messages.insert_one(message_dict)
    
    return {"message": "Your message has been sent successfully. We'll get back to you soon!"}

@router.get("/", response_model=List[ContactMessage])
async def get_contact_messages(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    is_read: Optional[bool] = None,
    current_user: User = Depends(require_admin)
):
    """Get all contact messages (Admin only)"""
    database = await get_database()
    
    # Build query
    query = {}
    if is_read is not None:
        query["is_read"] = is_read
    
    # Get messages
    cursor = database.contact_messages.find(query).sort("created_at", -1).skip(skip).limit(limit)
    messages = []
    async for message_data in cursor:
        message_data["_id"] = str(message_data["_id"])
        messages.append(ContactMessage(**message_data))
    
    return messages

@router.put("/{message_id}/read")
async def mark_message_as_read(
    message_id: str,
    current_user: User = Depends(require_admin)
):
    """Mark contact message as read (Admin only)"""
    database = await get_database()
    
    result = await database.contact_messages.update_one(
        {"_id": message_id},
        {"$set": {"is_read": True}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )
    
    return {"message": "Message marked as read"}

@router.delete("/{message_id}")
async def delete_contact_message(
    message_id: str,
    current_user: User = Depends(require_admin)
):
    """Delete contact message (Admin only)"""
    database = await get_database()
    
    result = await database.contact_messages.delete_one({"_id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found"
        )
    
    return {"message": "Contact message deleted successfully"}

@router.get("/stats")
async def get_contact_stats(current_user: User = Depends(require_admin)):
    """Get contact message statistics (Admin only)"""
    database = await get_database()
    
    total_messages = await database.contact_messages.count_documents({})
    unread_messages = await database.contact_messages.count_documents({"is_read": False})
    read_messages = total_messages - unread_messages
    
    # Get recent messages (last 7 days)
    from datetime import timedelta
    seven_days_ago = datetime.utcnow() - timedelta(days=7)
    recent_messages = await database.contact_messages.count_documents({
        "created_at": {"$gte": seven_days_ago}
    })
    
    return {
        "total_messages": total_messages,
        "unread_messages": unread_messages,
        "read_messages": read_messages,
        "recent_messages": recent_messages
    }