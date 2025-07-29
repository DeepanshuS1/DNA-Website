import os
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from typing import Optional

class Database:
    client: Optional[AsyncIOMotorClient] = None
    database = None

db = Database()

async def get_database():
    return db.database

async def connect_to_mongo():
    """Create database connection"""
    mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/dna_website")
    db.client = AsyncIOMotorClient(mongo_url, server_api=ServerApi('1'))
    db.database = db.client.get_database("dna_website")
    
    # Test the connection
    try:
        await db.client.admin.command('ping')
        print("✅ Successfully connected to MongoDB!")
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {e}")

async def close_mongo_connection():
    """Close database connection"""
    if db.client:
        db.client.close()
        print("✅ Disconnected from MongoDB")

# Collection names
COLLECTIONS = {
    "users": "users",
    "events": "events",
    "rsvps": "rsvps",
    "blog_posts": "blog_posts",
    "newsletter_subscribers": "newsletter_subscribers",
    "projects": "projects",
    "contact_messages": "contact_messages"
}