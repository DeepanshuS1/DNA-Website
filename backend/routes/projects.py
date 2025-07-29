from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import List, Optional
from models import Project, ProjectCreate, ProjectUpdate, User
from auth import get_current_active_user, require_admin
from database import get_database
from datetime import datetime
import uuid

router = APIRouter()

@router.get("/", response_model=List[Project])
async def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    status: Optional[str] = None,
    featured: Optional[bool] = None,
    search: Optional[str] = None
):
    """Get all projects (paginated)"""
    database = await get_database()
    
    # Build query
    query = {}
    if status:
        query["status"] = status
    if featured is not None:
        query["featured"] = featured
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"technologies": {"$in": [search]}}
        ]
    
    # Get projects
    cursor = database.projects.find(query).sort("created_at", -1).skip(skip).limit(limit)
    projects = []
    async for project_data in cursor:
        project_data["_id"] = str(project_data["_id"])
        projects.append(Project(**project_data))
    
    return projects

@router.post("/", response_model=Project)
async def create_project(
    project: ProjectCreate,
    current_user: User = Depends(get_current_active_user)
):
    """Create a new project"""
    database = await get_database()
    
    project_dict = project.dict()
    project_dict["_id"] = str(uuid.uuid4())
    project_dict["created_by"] = current_user.id
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()
    
    await database.projects.insert_one(project_dict)
    
    return Project(**project_dict)

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    """Get project by ID"""
    database = await get_database()
    project_data = await database.projects.find_one({"_id": project_id})
    
    if not project_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    project_data["_id"] = str(project_data["_id"])
    return Project(**project_data)

@router.put("/{project_id}", response_model=Project)
async def update_project(
    project_id: str,
    project_update: ProjectUpdate,
    current_user: User = Depends(get_current_active_user)
):
    """Update project"""
    database = await get_database()
    
    # Check if project exists
    existing_project = await database.projects.find_one({"_id": project_id})
    if not existing_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check if user owns the project or is admin
    if existing_project["created_by"] != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this project"
        )
    
    # Prepare update data
    update_data = project_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update project
    await database.projects.update_one(
        {"_id": project_id},
        {"$set": update_data}
    )
    
    # Return updated project
    project_data = await database.projects.find_one({"_id": project_id})
    project_data["_id"] = str(project_data["_id"])
    
    return Project(**project_data)

@router.delete("/{project_id}")
async def delete_project(
    project_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Delete project"""
    database = await get_database()
    
    # Check if project exists
    existing_project = await database.projects.find_one({"_id": project_id})
    if not existing_project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found"
        )
    
    # Check if user owns the project or is admin
    if existing_project["created_by"] != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this project"
        )
    
    # Delete project
    await database.projects.delete_one({"_id": project_id})
    
    return {"message": "Project deleted successfully"}

@router.get("/featured/list", response_model=List[Project])
async def get_featured_projects():
    """Get featured projects"""
    database = await get_database()
    
    cursor = database.projects.find({"featured": True, "status": "active"}).sort("created_at", -1).limit(6)
    projects = []
    async for project_data in cursor:
        project_data["_id"] = str(project_data["_id"])
        projects.append(Project(**project_data))
    
    return projects

@router.get("/stats/overview")
async def get_project_stats():
    """Get project statistics"""
    database = await get_database()
    
    total_projects = await database.projects.count_documents({})
    active_projects = await database.projects.count_documents({"status": "active"})
    completed_projects = await database.projects.count_documents({"status": "completed"})
    featured_projects = await database.projects.count_documents({"featured": True})
    
    # Get technology breakdown
    pipeline = [
        {"$unwind": "$technologies"},
        {"$group": {"_id": "$technologies", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    
    tech_stats = []
    async for stat in database.projects.aggregate(pipeline):
        tech_stats.append({"technology": stat["_id"], "count": stat["count"]})
    
    return {
        "total_projects": total_projects,
        "active_projects": active_projects,
        "completed_projects": completed_projects,
        "archived_projects": total_projects - active_projects - completed_projects,
        "featured_projects": featured_projects,
        "technology_breakdown": tech_stats
    }