from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from models import User, UserUpdate
from auth import get_current_active_user, require_admin
from database import get_database
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=List[User])
async def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    search: Optional[str] = None,
    current_user: User = Depends(get_current_active_user)
):
    """Get all users (paginated)"""
    database = await get_database()
    
    # Build query
    query = {}
    if search:
        query["$or"] = [
            {"full_name": {"$regex": search, "$options": "i"}},
            {"username": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}}
        ]
    
    # Get users
    cursor = database.users.find(query).skip(skip).limit(limit)
    users = []
    async for user_data in cursor:
        user_data["_id"] = str(user_data["_id"])
        # Remove sensitive data
        if "hashed_password" in user_data:
            del user_data["hashed_password"]
        users.append(User(**user_data))
    
    return users

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str):
    """Get user by ID"""
    database = await get_database()
    user_data = await database.users.find_one({"_id": user_id})
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    user_data["_id"] = str(user_data["_id"])
    # Remove sensitive data
    if "hashed_password" in user_data:
        del user_data["hashed_password"]
    
    return User(**user_data)

@router.put("/me", response_model=User)
async def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user)
):
    """Update current user profile"""
    database = await get_database()
    
    # Prepare update data
    update_data = user_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update user
    await database.users.update_one(
        {"_id": current_user.id},
        {"$set": update_data}
    )
    
    # Return updated user
    user_data = await database.users.find_one({"_id": current_user.id})
    user_data["_id"] = str(user_data["_id"])
    if "hashed_password" in user_data:
        del user_data["hashed_password"]
    
    return User(**user_data)

@router.get("/stats/overview")
async def get_user_stats():
    """Get user statistics"""
    database = await get_database()
    
    total_users = await database.users.count_documents({})
    active_users = await database.users.count_documents({"is_active": True})
    
    # Get user role distribution
    pipeline = [
        {"$group": {"_id": "$role", "count": {"$sum": 1}}}
    ]
    role_stats = []
    async for stat in database.users.aggregate(pipeline):
        role_stats.append({"role": stat["_id"], "count": stat["count"]})
    
    return {
        "total_users": total_users,
        "active_users": active_users,
        "inactive_users": total_users - active_users,
        "role_distribution": role_stats
    }