from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum
import uuid

class UserRole(str, Enum):
    ADMIN = "admin"
    MEMBER = "member"
    MODERATOR = "moderator"

class EventStatus(str, Enum):
    UPCOMING = "upcoming"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class RSVPStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

# User Models
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    username: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    github_profile: Optional[str] = None
    linkedin_profile: Optional[str] = None
    skills: List[str] = []
    is_active: bool = True
    role: UserRole = UserRole.MEMBER

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    github_profile: Optional[str] = None
    linkedin_profile: Optional[str] = None
    skills: Optional[List[str]] = None

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

class UserInDB(User):
    hashed_password: str

# Authentication Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Event Models
class EventBase(BaseModel):
    title: str
    description: str
    event_type: str  # workshop, hackathon, bootcamp, meetup
    start_date: datetime
    end_date: datetime
    location: Optional[str] = None
    is_online: bool = False
    max_participants: Optional[int] = None
    registration_deadline: Optional[datetime] = None
    tags: List[str] = []
    image_url: Optional[str] = None
    requirements: List[str] = []
    agenda: List[Dict[str, Any]] = []
    status: EventStatus = EventStatus.UPCOMING

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    event_type: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    is_online: Optional[bool] = None
    max_participants: Optional[int] = None
    registration_deadline: Optional[datetime] = None
    tags: Optional[List[str]] = None
    image_url: Optional[str] = None
    requirements: Optional[List[str]] = None
    agenda: Optional[List[Dict[str, Any]]] = None
    status: Optional[EventStatus] = None

class Event(EventBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    created_by: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    participant_count: int = 0

    class Config:
        populate_by_name = True

# RSVP Models
class RSVPBase(BaseModel):
    event_id: str
    user_id: str
    status: RSVPStatus = RSVPStatus.PENDING
    notes: Optional[str] = None

class RSVPCreate(RSVPBase):
    pass

class RSVPUpdate(BaseModel):
    status: Optional[RSVPStatus] = None
    notes: Optional[str] = None

class RSVP(RSVPBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

# Blog Models
class BlogPostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    tags: List[str] = []
    is_published: bool = False
    is_featured: bool = False

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    tags: Optional[List[str]] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None

class BlogPost(BlogPostBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    author_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    view_count: int = 0

    class Config:
        populate_by_name = True

# Newsletter Models
class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    preferences: List[str] = []  # events, announcements, blog_posts

    class Config:
        populate_by_name = True

class NewsletterSubscribe(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    preferences: List[str] = []

# Project Models
class ProjectBase(BaseModel):
    title: str
    description: str
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    technologies: List[str] = []
    contributors: List[str] = []  # user IDs
    status: str = "active"  # active, completed, archived
    featured: bool = False

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    technologies: Optional[List[str]] = None
    contributors: Optional[List[str]] = None
    status: Optional[str] = None
    featured: Optional[bool] = None

class Project(ProjectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    created_by: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

# Contact Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), alias="_id")
    name: str
    email: EmailStr
    subject: str
    message: str
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str