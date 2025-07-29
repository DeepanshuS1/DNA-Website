from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from models import BlogPost, BlogPostCreate, BlogPostUpdate, User
from auth import get_current_active_user, require_admin
from database import get_database
from datetime import datetime
import uuid

router = APIRouter()

@router.get("/", response_model=List[BlogPost])
async def get_blog_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    is_published: Optional[bool] = True,
    is_featured: Optional[bool] = None,
    search: Optional[str] = None
):
    """Get all blog posts (paginated)"""
    database = await get_database()
    
    # Build query
    query = {}
    if is_published is not None:
        query["is_published"] = is_published
    if is_featured is not None:
        query["is_featured"] = is_featured
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
            {"tags": {"$in": [search]}}
        ]
    
    # Get blog posts
    cursor = database.blog_posts.find(query).sort("created_at", -1).skip(skip).limit(limit)
    posts = []
    async for post_data in cursor:
        post_data["_id"] = str(post_data["_id"])
        posts.append(BlogPost(**post_data))
    
    return posts

@router.post("/", response_model=BlogPost)
async def create_blog_post(
    post: BlogPostCreate,
    current_user: User = Depends(require_admin)
):
    """Create a new blog post (Admin only)"""
    database = await get_database()
    
    post_dict = post.dict()
    post_dict["_id"] = str(uuid.uuid4())
    post_dict["author_id"] = current_user.id
    post_dict["created_at"] = datetime.utcnow()
    post_dict["updated_at"] = datetime.utcnow()
    post_dict["view_count"] = 0
    
    await database.blog_posts.insert_one(post_dict)
    
    return BlogPost(**post_dict)

@router.get("/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    """Get blog post by ID"""
    database = await get_database()
    post_data = await database.blog_posts.find_one({"_id": post_id})
    
    if not post_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Increment view count
    await database.blog_posts.update_one(
        {"_id": post_id},
        {"$inc": {"view_count": 1}}
    )
    
    post_data["_id"] = str(post_data["_id"])
    post_data["view_count"] += 1  # Update for response
    
    return BlogPost(**post_data)

@router.put("/{post_id}", response_model=BlogPost)
async def update_blog_post(
    post_id: str,
    post_update: BlogPostUpdate,
    current_user: User = Depends(require_admin)
):
    """Update blog post (Admin only)"""
    database = await get_database()
    
    # Check if post exists
    existing_post = await database.blog_posts.find_one({"_id": post_id})
    if not existing_post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Prepare update data
    update_data = post_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update post
    await database.blog_posts.update_one(
        {"_id": post_id},
        {"$set": update_data}
    )
    
    # Return updated post
    post_data = await database.blog_posts.find_one({"_id": post_id})
    post_data["_id"] = str(post_data["_id"])
    
    return BlogPost(**post_data)

@router.delete("/{post_id}")
async def delete_blog_post(
    post_id: str,
    current_user: User = Depends(require_admin)
):
    """Delete blog post (Admin only)"""
    database = await get_database()
    
    result = await database.blog_posts.delete_one({"_id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    return {"message": "Blog post deleted successfully"}

@router.get("/stats/overview")
async def get_blog_stats():
    """Get blog statistics"""
    database = await get_database()
    
    total_posts = await database.blog_posts.count_documents({})
    published_posts = await database.blog_posts.count_documents({"is_published": True})
    featured_posts = await database.blog_posts.count_documents({"is_featured": True})
    
    # Get most viewed posts
    cursor = database.blog_posts.find({"is_published": True}).sort("view_count", -1).limit(5)
    popular_posts = []
    async for post in cursor:
        popular_posts.append({
            "id": str(post["_id"]),
            "title": post["title"],
            "view_count": post["view_count"]
        })
    
    return {
        "total_posts": total_posts,
        "published_posts": published_posts,
        "draft_posts": total_posts - published_posts,
        "featured_posts": featured_posts,
        "popular_posts": popular_posts
    }