from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from models import NewsletterSubscriber, NewsletterSubscribe, User
from auth import get_current_active_user, require_admin
from database import get_database
from datetime import datetime
import uuid

router = APIRouter()

@router.post("/subscribe", response_model=dict)
async def subscribe_to_newsletter(subscription: NewsletterSubscribe):
    """Subscribe to newsletter"""
    database = await get_database()
    
    # Check if email is already subscribed
    existing_subscriber = await database.newsletter_subscribers.find_one({
        "email": subscription.email
    })
    if existing_subscriber:
        if existing_subscriber["is_active"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email is already subscribed to newsletter"
            )
        else:
            # Reactivate subscription
            await database.newsletter_subscribers.update_one(
                {"email": subscription.email},
                {"$set": {"is_active": True, "subscribed_at": datetime.utcnow()}}
            )
            return {"message": "Newsletter subscription reactivated successfully"}
    
    # Create new subscription
    subscriber_dict = subscription.dict()
    subscriber_dict["_id"] = str(uuid.uuid4())
    subscriber_dict["is_active"] = True
    subscriber_dict["subscribed_at"] = datetime.utcnow()
    
    await database.newsletter_subscribers.insert_one(subscriber_dict)
    
    return {"message": "Successfully subscribed to newsletter"}

@router.post("/unsubscribe")
async def unsubscribe_from_newsletter(email: str):
    """Unsubscribe from newsletter"""
    database = await get_database()
    
    result = await database.newsletter_subscribers.update_one(
        {"email": email},
        {"$set": {"is_active": False}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found in newsletter subscriptions"
        )
    
    return {"message": "Successfully unsubscribed from newsletter"}

@router.get("/subscribers", response_model=List[NewsletterSubscriber])
async def get_newsletter_subscribers(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    is_active: Optional[bool] = True,
    current_user: User = Depends(require_admin)
):
    """Get newsletter subscribers (Admin only)"""
    database = await get_database()
    
    # Build query
    query = {}
    if is_active is not None:
        query["is_active"] = is_active
    
    # Get subscribers
    cursor = database.newsletter_subscribers.find(query).sort("subscribed_at", -1).skip(skip).limit(limit)
    subscribers = []
    async for subscriber_data in cursor:
        subscriber_data["_id"] = str(subscriber_data["_id"])
        subscribers.append(NewsletterSubscriber(**subscriber_data))
    
    return subscribers

@router.get("/stats")
async def get_newsletter_stats(current_user: User = Depends(require_admin)):
    """Get newsletter statistics (Admin only)"""
    database = await get_database()
    
    total_subscribers = await database.newsletter_subscribers.count_documents({})
    active_subscribers = await database.newsletter_subscribers.count_documents({"is_active": True})
    inactive_subscribers = total_subscribers - active_subscribers
    
    # Get subscription preferences breakdown
    pipeline = [
        {"$match": {"is_active": True}},
        {"$unwind": {"path": "$preferences", "preserveNullAndEmptyArrays": True}},
        {"$group": {"_id": "$preferences", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    
    preferences_stats = []
    async for stat in database.newsletter_subscribers.aggregate(pipeline):
        preference = stat["_id"] if stat["_id"] else "no_preference"
        preferences_stats.append({"preference": preference, "count": stat["count"]})
    
    # Get recent subscriptions (last 30 days)
    from datetime import timedelta
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_subscriptions = await database.newsletter_subscribers.count_documents({
        "subscribed_at": {"$gte": thirty_days_ago},
        "is_active": True
    })
    
    return {
        "total_subscribers": total_subscribers,
        "active_subscribers": active_subscribers,
        "inactive_subscribers": inactive_subscribers,
        "recent_subscriptions": recent_subscriptions,
        "preferences_breakdown": preferences_stats
    }

@router.delete("/subscribers/{subscriber_id}")
async def delete_subscriber(
    subscriber_id: str,
    current_user: User = Depends(require_admin)
):
    """Delete newsletter subscriber (Admin only)"""
    database = await get_database()
    
    result = await database.newsletter_subscribers.delete_one({"_id": subscriber_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscriber not found"
        )
    
    return {"message": "Subscriber deleted successfully"}