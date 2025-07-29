#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for DNA Community Website
Tests all backend functionality including authentication, CRUD operations, and business logic.
"""

import requests
import json
import time
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import uuid

class DNABackendTester:
    def __init__(self, base_url: str = "http://localhost:8001"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.session = requests.Session()
        self.auth_token = None
        self.admin_token = None
        self.test_user_id = None
        self.test_admin_id = None
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, message: str = "", details: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def make_request(self, method: str, endpoint: str, data: Dict = None, 
                    headers: Dict = None, use_auth: bool = False, admin_auth: bool = False) -> requests.Response:
        """Make HTTP request with optional authentication"""
        url = f"{self.api_url}{endpoint}"
        request_headers = headers or {}
        
        if use_auth and self.auth_token:
            request_headers["Authorization"] = f"Bearer {self.auth_token}"
        elif admin_auth and self.admin_token:
            request_headers["Authorization"] = f"Bearer {self.admin_token}"
            
        if data:
            request_headers["Content-Type"] = "application/json"
            
        try:
            response = self.session.request(
                method=method,
                url=url,
                json=data,
                headers=request_headers,
                timeout=30
            )
            return response
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            raise
    
    def test_health_and_docs(self):
        """Test API health and documentation endpoints"""
        print("\n=== Testing API Health & Documentation ===")
        
        # Test health endpoint
        try:
            response = self.make_request("GET", "/health")
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy":
                    self.log_test("Health Check", True, "API is healthy")
                else:
                    self.log_test("Health Check", False, "Unexpected health response", data)
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
        
        # Test root endpoint
        try:
            response = self.make_request("GET", "")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_test("Root Endpoint", True, "Root API accessible")
                else:
                    self.log_test("Root Endpoint", False, "Missing expected fields", data)
            else:
                self.log_test("Root Endpoint", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Exception: {str(e)}")
        
        # Test docs endpoint (just check if accessible)
        try:
            response = requests.get(f"{self.base_url}/docs", timeout=10)
            if response.status_code == 200:
                self.log_test("API Documentation", True, "Docs endpoint accessible")
            else:
                self.log_test("API Documentation", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("API Documentation", False, f"Exception: {str(e)}")
    
    def test_authentication_system(self):
        """Test complete authentication flow"""
        print("\n=== Testing Authentication System ===")
        
        # Generate unique test data
        timestamp = int(time.time())
        test_email = f"testuser{timestamp}@dnadev.com"
        test_password = "SecurePass123!"
        admin_email = f"admin{timestamp}@dnadev.com"
        admin_password = "AdminPass123!"
        
        # Test user registration
        try:
            user_data = {
                "email": test_email,
                "password": test_password,
                "full_name": "John Developer",
                "username": f"johndev{timestamp}",
                "bio": "Full-stack developer passionate about technology",
                "skills": ["Python", "JavaScript", "React", "FastAPI"],
                "github_profile": "https://github.com/johndev",
                "linkedin_profile": "https://linkedin.com/in/johndev"
            }
            
            response = self.make_request("POST", "/auth/register", user_data)
            if response.status_code == 200:
                data = response.json()
                if "user_id" in data:
                    self.test_user_id = data["user_id"]
                    self.log_test("User Registration", True, "User registered successfully")
                else:
                    self.log_test("User Registration", False, "Missing user_id in response", data)
            else:
                self.log_test("User Registration", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("User Registration", False, f"Exception: {str(e)}")
        
        # Test admin registration
        try:
            admin_data = {
                "email": admin_email,
                "password": admin_password,
                "full_name": "Admin User",
                "username": f"admin{timestamp}",
                "role": "admin"
            }
            
            response = self.make_request("POST", "/auth/register", admin_data)
            if response.status_code == 200:
                data = response.json()
                if "user_id" in data:
                    self.test_admin_id = data["user_id"]
                    self.log_test("Admin Registration", True, "Admin registered successfully")
                else:
                    self.log_test("Admin Registration", False, "Missing user_id in response", data)
            else:
                self.log_test("Admin Registration", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Admin Registration", False, f"Exception: {str(e)}")
        
        # Test duplicate registration
        try:
            response = self.make_request("POST", "/auth/register", user_data)
            if response.status_code == 400:
                self.log_test("Duplicate Registration Prevention", True, "Correctly prevented duplicate registration")
            else:
                self.log_test("Duplicate Registration Prevention", False, f"Expected 400, got {response.status_code}")
        except Exception as e:
            self.log_test("Duplicate Registration Prevention", False, f"Exception: {str(e)}")
        
        # Test user login
        try:
            login_data = {"email": test_email, "password": test_password}
            response = self.make_request("POST", "/auth/login", login_data)
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and data.get("token_type") == "bearer":
                    self.auth_token = data["access_token"]
                    self.log_test("User Login", True, "User login successful")
                else:
                    self.log_test("User Login", False, "Missing or invalid token in response", data)
            else:
                self.log_test("User Login", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("User Login", False, f"Exception: {str(e)}")
        
        # Test admin login
        try:
            admin_login_data = {"email": admin_email, "password": admin_password}
            response = self.make_request("POST", "/auth/login", admin_login_data)
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data:
                    self.admin_token = data["access_token"]
                    self.log_test("Admin Login", True, "Admin login successful")
                else:
                    self.log_test("Admin Login", False, "Missing token in response", data)
            else:
                self.log_test("Admin Login", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Admin Login", False, f"Exception: {str(e)}")
        
        # Test invalid login
        try:
            invalid_login = {"email": test_email, "password": "wrongpassword"}
            response = self.make_request("POST", "/auth/login", invalid_login)
            if response.status_code == 401:
                self.log_test("Invalid Login Prevention", True, "Correctly rejected invalid credentials")
            else:
                self.log_test("Invalid Login Prevention", False, f"Expected 401, got {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Login Prevention", False, f"Exception: {str(e)}")
        
        # Test current user info
        if self.auth_token:
            try:
                response = self.make_request("GET", "/auth/me", use_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("email") == test_email:
                        self.log_test("Current User Info", True, "Retrieved current user info")
                    else:
                        self.log_test("Current User Info", False, "Incorrect user info returned", data)
                else:
                    self.log_test("Current User Info", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Current User Info", False, f"Exception: {str(e)}")
        
        # Test token refresh
        if self.auth_token:
            try:
                response = self.make_request("POST", "/auth/refresh", use_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if "access_token" in data:
                        self.log_test("Token Refresh", True, "Token refreshed successfully")
                    else:
                        self.log_test("Token Refresh", False, "Missing token in response", data)
                else:
                    self.log_test("Token Refresh", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Token Refresh", False, f"Exception: {str(e)}")
        
        # Test protected endpoint without token
        try:
            response = self.make_request("GET", "/auth/me")
            if response.status_code == 401:
                self.log_test("Protected Endpoint Security", True, "Correctly rejected request without token")
            else:
                self.log_test("Protected Endpoint Security", False, f"Expected 401, got {response.status_code}")
        except Exception as e:
            self.log_test("Protected Endpoint Security", False, f"Exception: {str(e)}")
    
    def test_user_management(self):
        """Test user management endpoints"""
        print("\n=== Testing User Management ===")
        
        if not self.auth_token:
            self.log_test("User Management", False, "No auth token available for testing")
            return
        
        # Test get users list
        try:
            response = self.make_request("GET", "/users?limit=10", use_auth=True)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Users List", True, f"Retrieved {len(data)} users")
                else:
                    self.log_test("Get Users List", False, "Response is not a list", data)
            else:
                self.log_test("Get Users List", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Users List", False, f"Exception: {str(e)}")
        
        # Test get user by ID
        if self.test_user_id:
            try:
                response = self.make_request("GET", f"/users/{self.test_user_id}")
                if response.status_code == 200:
                    data = response.json()
                    if data.get("_id") == self.test_user_id or data.get("id") == self.test_user_id:
                        self.log_test("Get User by ID", True, "Retrieved user by ID")
                    else:
                        self.log_test("Get User by ID", False, "Incorrect user returned", data)
                else:
                    self.log_test("Get User by ID", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Get User by ID", False, f"Exception: {str(e)}")
        
        # Test update current user profile
        try:
            update_data = {
                "bio": "Updated bio - Senior Full-stack Developer",
                "skills": ["Python", "JavaScript", "React", "FastAPI", "MongoDB"]
            }
            response = self.make_request("PUT", "/users/me", update_data, use_auth=True)
            if response.status_code == 200:
                data = response.json()
                if data.get("bio") == update_data["bio"]:
                    self.log_test("Update User Profile", True, "Profile updated successfully")
                else:
                    self.log_test("Update User Profile", False, "Profile not updated correctly", data)
            else:
                self.log_test("Update User Profile", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Update User Profile", False, f"Exception: {str(e)}")
        
        # Test user statistics
        try:
            response = self.make_request("GET", "/users/stats/overview")
            if response.status_code == 200:
                data = response.json()
                if "total_users" in data and "active_users" in data:
                    self.log_test("User Statistics", True, f"Total users: {data['total_users']}")
                else:
                    self.log_test("User Statistics", False, "Missing expected statistics", data)
            else:
                self.log_test("User Statistics", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("User Statistics", False, f"Exception: {str(e)}")
        
        # Test search users
        try:
            response = self.make_request("GET", "/users?search=John", use_auth=True)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Search Users", True, f"Search returned {len(data)} results")
                else:
                    self.log_test("Search Users", False, "Search response is not a list", data)
            else:
                self.log_test("Search Users", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Search Users", False, f"Exception: {str(e)}")
    
    def test_events_system(self):
        """Test events and RSVP system"""
        print("\n=== Testing Events System ===")
        
        if not self.admin_token:
            self.log_test("Events System", False, "No admin token available for testing")
            return
        
        event_id = None
        rsvp_id = None
        
        # Test create event (admin only)
        try:
            event_data = {
                "title": "Python Web Development Workshop",
                "description": "Learn modern web development with Python and FastAPI",
                "event_type": "workshop",
                "start_date": (datetime.now() + timedelta(days=7)).isoformat(),
                "end_date": (datetime.now() + timedelta(days=7, hours=4)).isoformat(),
                "location": "DNA Community Center",
                "is_online": False,
                "max_participants": 50,
                "registration_deadline": (datetime.now() + timedelta(days=5)).isoformat(),
                "tags": ["python", "web-development", "fastapi"],
                "requirements": ["Basic Python knowledge", "Laptop with Python installed"],
                "agenda": [
                    {"time": "09:00", "topic": "Introduction to FastAPI"},
                    {"time": "10:30", "topic": "Building REST APIs"},
                    {"time": "12:00", "topic": "Database Integration"}
                ]
            }
            
            response = self.make_request("POST", "/events", event_data, admin_auth=True)
            if response.status_code == 200:
                data = response.json()
                if "_id" in data or "id" in data:
                    event_id = data.get("_id") or data.get("id")
                    self.log_test("Create Event", True, "Event created successfully")
                else:
                    self.log_test("Create Event", False, "Missing event ID in response", data)
            else:
                self.log_test("Create Event", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Create Event", False, f"Exception: {str(e)}")
        
        # Test create event without admin privileges
        if self.auth_token:
            try:
                response = self.make_request("POST", "/events", event_data, use_auth=True)
                if response.status_code == 403:
                    self.log_test("Event Creation Authorization", True, "Correctly prevented non-admin from creating events")
                else:
                    self.log_test("Event Creation Authorization", False, f"Expected 403, got {response.status_code}")
            except Exception as e:
                self.log_test("Event Creation Authorization", False, f"Exception: {str(e)}")
        
        # Test get events list
        try:
            response = self.make_request("GET", "/events?limit=10")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Events List", True, f"Retrieved {len(data)} events")
                else:
                    self.log_test("Get Events List", False, "Response is not a list", data)
            else:
                self.log_test("Get Events List", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Events List", False, f"Exception: {str(e)}")
        
        # Test get event by ID
        if event_id:
            try:
                response = self.make_request("GET", f"/events/{event_id}")
                if response.status_code == 200:
                    data = response.json()
                    if data.get("_id") == event_id or data.get("id") == event_id:
                        self.log_test("Get Event by ID", True, "Retrieved event by ID")
                    else:
                        self.log_test("Get Event by ID", False, "Incorrect event returned", data)
                else:
                    self.log_test("Get Event by ID", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Get Event by ID", False, f"Exception: {str(e)}")
        
        # Test RSVP to event
        if event_id and self.auth_token:
            try:
                rsvp_data = {
                    "event_id": event_id,
                    "user_id": self.test_user_id,
                    "notes": "Looking forward to this workshop!"
                }
                response = self.make_request("POST", f"/events/{event_id}/rsvp", rsvp_data, use_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if "_id" in data or "id" in data:
                        rsvp_id = data.get("_id") or data.get("id")
                        self.log_test("Create RSVP", True, "RSVP created successfully")
                    else:
                        self.log_test("Create RSVP", False, "Missing RSVP ID in response", data)
                else:
                    self.log_test("Create RSVP", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Create RSVP", False, f"Exception: {str(e)}")
        
        # Test duplicate RSVP prevention
        if event_id and self.auth_token:
            try:
                response = self.make_request("POST", f"/events/{event_id}/rsvp", rsvp_data, use_auth=True)
                if response.status_code == 400:
                    self.log_test("Duplicate RSVP Prevention", True, "Correctly prevented duplicate RSVP")
                else:
                    self.log_test("Duplicate RSVP Prevention", False, f"Expected 400, got {response.status_code}")
            except Exception as e:
                self.log_test("Duplicate RSVP Prevention", False, f"Exception: {str(e)}")
        
        # Test get event RSVPs
        if event_id and self.auth_token:
            try:
                response = self.make_request("GET", f"/events/{event_id}/rsvps", use_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if isinstance(data, list):
                        self.log_test("Get Event RSVPs", True, f"Retrieved {len(data)} RSVPs")
                    else:
                        self.log_test("Get Event RSVPs", False, "Response is not a list", data)
                else:
                    self.log_test("Get Event RSVPs", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Get Event RSVPs", False, f"Exception: {str(e)}")
        
        # Test update RSVP
        if rsvp_id and self.auth_token:
            try:
                update_data = {
                    "status": "confirmed",
                    "notes": "Confirmed attendance - very excited!"
                }
                response = self.make_request("PUT", f"/events/rsvps/{rsvp_id}", update_data, use_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("status") == "confirmed":
                        self.log_test("Update RSVP", True, "RSVP updated successfully")
                    else:
                        self.log_test("Update RSVP", False, "RSVP not updated correctly", data)
                else:
                    self.log_test("Update RSVP", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Update RSVP", False, f"Exception: {str(e)}")
        
        # Test update event (admin only)
        if event_id and self.admin_token:
            try:
                update_data = {
                    "title": "Advanced Python Web Development Workshop",
                    "max_participants": 60
                }
                response = self.make_request("PUT", f"/events/{event_id}", update_data, admin_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("title") == update_data["title"]:
                        self.log_test("Update Event", True, "Event updated successfully")
                    else:
                        self.log_test("Update Event", False, "Event not updated correctly", data)
                else:
                    self.log_test("Update Event", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Update Event", False, f"Exception: {str(e)}")
        
        # Test event filtering
        try:
            response = self.make_request("GET", "/events?event_type=workshop&status=upcoming")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Event Filtering", True, f"Filtered events returned {len(data)} results")
                else:
                    self.log_test("Event Filtering", False, "Response is not a list", data)
            else:
                self.log_test("Event Filtering", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Event Filtering", False, f"Exception: {str(e)}")
    
    def test_blog_system(self):
        """Test blog system"""
        print("\n=== Testing Blog System ===")
        
        if not self.admin_token:
            self.log_test("Blog System", False, "No admin token available for testing")
            return
        
        blog_post_id = None
        
        # Test create blog post (admin only)
        try:
            blog_data = {
                "title": "Getting Started with FastAPI and MongoDB",
                "content": "FastAPI is a modern, fast web framework for building APIs with Python 3.6+ based on standard Python type hints...",
                "excerpt": "Learn how to build modern APIs with FastAPI and MongoDB",
                "featured_image": "https://example.com/fastapi-blog.jpg",
                "tags": ["fastapi", "python", "mongodb", "tutorial"],
                "is_published": True,
                "is_featured": False
            }
            
            response = self.make_request("POST", "/blog", blog_data, admin_auth=True)
            if response.status_code == 200:
                data = response.json()
                if "_id" in data or "id" in data:
                    blog_post_id = data.get("_id") or data.get("id")
                    self.log_test("Create Blog Post", True, "Blog post created successfully")
                else:
                    self.log_test("Create Blog Post", False, "Missing blog post ID in response", data)
            else:
                self.log_test("Create Blog Post", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Create Blog Post", False, f"Exception: {str(e)}")
        
        # Test create blog post without admin privileges
        if self.auth_token:
            try:
                response = self.make_request("POST", "/blog", blog_data, use_auth=True)
                if response.status_code == 403:
                    self.log_test("Blog Creation Authorization", True, "Correctly prevented non-admin from creating blog posts")
                else:
                    self.log_test("Blog Creation Authorization", False, f"Expected 403, got {response.status_code}")
            except Exception as e:
                self.log_test("Blog Creation Authorization", False, f"Exception: {str(e)}")
        
        # Test get blog posts
        try:
            response = self.make_request("GET", "/blog?limit=10")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Blog Posts", True, f"Retrieved {len(data)} blog posts")
                else:
                    self.log_test("Get Blog Posts", False, "Response is not a list", data)
            else:
                self.log_test("Get Blog Posts", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Blog Posts", False, f"Exception: {str(e)}")
        
        # Test get blog post by ID (should increment view count)
        if blog_post_id:
            try:
                response = self.make_request("GET", f"/blog/{blog_post_id}")
                if response.status_code == 200:
                    data = response.json()
                    if (data.get("_id") == blog_post_id or data.get("id") == blog_post_id) and data.get("view_count", 0) > 0:
                        self.log_test("Get Blog Post & View Count", True, f"Retrieved blog post, view count: {data['view_count']}")
                    else:
                        self.log_test("Get Blog Post & View Count", False, "Blog post or view count issue", data)
                else:
                    self.log_test("Get Blog Post & View Count", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Get Blog Post & View Count", False, f"Exception: {str(e)}")
        
        # Test update blog post
        if blog_post_id and self.admin_token:
            try:
                update_data = {
                    "title": "Advanced FastAPI and MongoDB Integration",
                    "is_featured": True
                }
                response = self.make_request("PUT", f"/blog/{blog_post_id}", update_data, admin_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("title") == update_data["title"]:
                        self.log_test("Update Blog Post", True, "Blog post updated successfully")
                    else:
                        self.log_test("Update Blog Post", False, "Blog post not updated correctly", data)
                else:
                    self.log_test("Update Blog Post", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Update Blog Post", False, f"Exception: {str(e)}")
        
        # Test blog statistics
        try:
            response = self.make_request("GET", "/blog/stats/overview")
            if response.status_code == 200:
                data = response.json()
                if "total_posts" in data and "published_posts" in data:
                    self.log_test("Blog Statistics", True, f"Total posts: {data['total_posts']}, Published: {data['published_posts']}")
                else:
                    self.log_test("Blog Statistics", False, "Missing expected statistics", data)
            else:
                self.log_test("Blog Statistics", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Blog Statistics", False, f"Exception: {str(e)}")
        
        # Test blog filtering
        try:
            response = self.make_request("GET", "/blog?is_published=true&is_featured=true")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Blog Filtering", True, f"Filtered blog posts returned {len(data)} results")
                else:
                    self.log_test("Blog Filtering", False, "Response is not a list", data)
            else:
                self.log_test("Blog Filtering", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Blog Filtering", False, f"Exception: {str(e)}")
    
    def test_newsletter_system(self):
        """Test newsletter subscription system"""
        print("\n=== Testing Newsletter System ===")
        
        timestamp = int(time.time())
        test_email = f"newsletter{timestamp}@dnadev.com"
        
        # Test newsletter subscription
        try:
            subscription_data = {
                "email": test_email,
                "full_name": "Newsletter Subscriber",
                "preferences": ["events", "announcements", "blog_posts"]
            }
            
            response = self.make_request("POST", "/newsletter/subscribe", subscription_data)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_test("Newsletter Subscription", True, "Newsletter subscription successful")
                else:
                    self.log_test("Newsletter Subscription", False, "Missing message in response", data)
            else:
                self.log_test("Newsletter Subscription", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Newsletter Subscription", False, f"Exception: {str(e)}")
        
        # Test duplicate subscription
        try:
            response = self.make_request("POST", "/newsletter/subscribe", subscription_data)
            if response.status_code == 400:
                self.log_test("Duplicate Subscription Prevention", True, "Correctly prevented duplicate subscription")
            else:
                self.log_test("Duplicate Subscription Prevention", False, f"Expected 400, got {response.status_code}")
        except Exception as e:
            self.log_test("Duplicate Subscription Prevention", False, f"Exception: {str(e)}")
        
        # Test unsubscribe
        try:
            response = self.make_request("POST", f"/newsletter/unsubscribe?email={test_email}")
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_test("Newsletter Unsubscribe", True, "Newsletter unsubscribe successful")
                else:
                    self.log_test("Newsletter Unsubscribe", False, "Missing message in response", data)
            else:
                self.log_test("Newsletter Unsubscribe", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Newsletter Unsubscribe", False, f"Exception: {str(e)}")
        
        # Test get subscribers (admin only)
        if self.admin_token:
            try:
                response = self.make_request("GET", "/newsletter/subscribers?limit=10", admin_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if isinstance(data, list):
                        self.log_test("Get Newsletter Subscribers", True, f"Retrieved {len(data)} subscribers")
                    else:
                        self.log_test("Get Newsletter Subscribers", False, "Response is not a list", data)
                else:
                    self.log_test("Get Newsletter Subscribers", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Get Newsletter Subscribers", False, f"Exception: {str(e)}")
        
        # Test newsletter statistics (admin only)
        if self.admin_token:
            try:
                response = self.make_request("GET", "/newsletter/stats", admin_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if "total_subscribers" in data and "active_subscribers" in data:
                        self.log_test("Newsletter Statistics", True, f"Total: {data['total_subscribers']}, Active: {data['active_subscribers']}")
                    else:
                        self.log_test("Newsletter Statistics", False, "Missing expected statistics", data)
                else:
                    self.log_test("Newsletter Statistics", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Newsletter Statistics", False, f"Exception: {str(e)}")
    
    def test_projects_system(self):
        """Test projects system"""
        print("\n=== Testing Projects System ===")
        
        if not self.auth_token:
            self.log_test("Projects System", False, "No auth token available for testing")
            return
        
        project_id = None
        
        # Test create project
        try:
            project_data = {
                "title": "DNA Community Website",
                "description": "A modern community website built with React and FastAPI",
                "github_url": "https://github.com/dna-community/website",
                "demo_url": "https://dna-community.dev",
                "image_url": "https://example.com/project-image.jpg",
                "technologies": ["React", "FastAPI", "MongoDB", "Tailwind CSS"],
                "contributors": [self.test_user_id] if self.test_user_id else [],
                "status": "active",
                "featured": True
            }
            
            response = self.make_request("POST", "/projects", project_data, use_auth=True)
            if response.status_code == 200:
                data = response.json()
                if "_id" in data or "id" in data:
                    project_id = data.get("_id") or data.get("id")
                    self.log_test("Create Project", True, "Project created successfully")
                else:
                    self.log_test("Create Project", False, "Missing project ID in response", data)
            else:
                self.log_test("Create Project", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Create Project", False, f"Exception: {str(e)}")
        
        # Test get projects
        try:
            response = self.make_request("GET", "/projects?limit=10")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Projects", True, f"Retrieved {len(data)} projects")
                else:
                    self.log_test("Get Projects", False, "Response is not a list", data)
            else:
                self.log_test("Get Projects", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Projects", False, f"Exception: {str(e)}")
        
        # Test get project by ID
        if project_id:
            try:
                response = self.make_request("GET", f"/projects/{project_id}")
                if response.status_code == 200:
                    data = response.json()
                    if data.get("_id") == project_id or data.get("id") == project_id:
                        self.log_test("Get Project by ID", True, "Retrieved project by ID")
                    else:
                        self.log_test("Get Project by ID", False, "Incorrect project returned", data)
                else:
                    self.log_test("Get Project by ID", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Get Project by ID", False, f"Exception: {str(e)}")
        
        # Test get featured projects
        try:
            response = self.make_request("GET", "/projects/featured/list")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Get Featured Projects", True, f"Retrieved {len(data)} featured projects")
                else:
                    self.log_test("Get Featured Projects", False, "Response is not a list", data)
            else:
                self.log_test("Get Featured Projects", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Get Featured Projects", False, f"Exception: {str(e)}")
        
        # Test update project
        if project_id and self.auth_token:
            try:
                update_data = {
                    "description": "An advanced community website built with modern technologies",
                    "status": "completed"
                }
                response = self.make_request("PUT", f"/projects/{project_id}", update_data, use_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if data.get("status") == "completed":
                        self.log_test("Update Project", True, "Project updated successfully")
                    else:
                        self.log_test("Update Project", False, "Project not updated correctly", data)
                else:
                    self.log_test("Update Project", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Update Project", False, f"Exception: {str(e)}")
        
        # Test project statistics
        try:
            response = self.make_request("GET", "/projects/stats/overview")
            if response.status_code == 200:
                data = response.json()
                if "total_projects" in data and "active_projects" in data:
                    self.log_test("Project Statistics", True, f"Total: {data['total_projects']}, Active: {data['active_projects']}")
                else:
                    self.log_test("Project Statistics", False, "Missing expected statistics", data)
            else:
                self.log_test("Project Statistics", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Project Statistics", False, f"Exception: {str(e)}")
        
        # Test project filtering
        try:
            response = self.make_request("GET", "/projects?status=active&featured=true")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("Project Filtering", True, f"Filtered projects returned {len(data)} results")
                else:
                    self.log_test("Project Filtering", False, "Response is not a list", data)
            else:
                self.log_test("Project Filtering", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Project Filtering", False, f"Exception: {str(e)}")
    
    def test_contact_system(self):
        """Test contact message system"""
        print("\n=== Testing Contact System ===")
        
        message_id = None
        
        # Test create contact message
        try:
            contact_data = {
                "name": "Jane Developer",
                "email": "jane.developer@example.com",
                "subject": "Interested in joining DNA Community",
                "message": "Hi, I'm a full-stack developer interested in joining your community. Could you provide more information about membership and upcoming events?"
            }
            
            response = self.make_request("POST", "/contact", contact_data)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_test("Create Contact Message", True, "Contact message sent successfully")
                else:
                    self.log_test("Create Contact Message", False, "Missing message in response", data)
            else:
                self.log_test("Create Contact Message", False, f"Status code: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("Create Contact Message", False, f"Exception: {str(e)}")
        
        # Test get contact messages (admin only)
        if self.admin_token:
            try:
                response = self.make_request("GET", "/contact?limit=10", admin_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if isinstance(data, list):
                        self.log_test("Get Contact Messages", True, f"Retrieved {len(data)} contact messages")
                        if data:
                            message_id = data[0].get("_id") or data[0].get("id")
                    else:
                        self.log_test("Get Contact Messages", False, "Response is not a list", data)
                else:
                    self.log_test("Get Contact Messages", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Get Contact Messages", False, f"Exception: {str(e)}")
        
        # Test mark message as read (admin only)
        if message_id and self.admin_token:
            try:
                response = self.make_request("PUT", f"/contact/{message_id}/read", admin_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if "message" in data:
                        self.log_test("Mark Message as Read", True, "Message marked as read successfully")
                    else:
                        self.log_test("Mark Message as Read", False, "Missing message in response", data)
                else:
                    self.log_test("Mark Message as Read", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Mark Message as Read", False, f"Exception: {str(e)}")
        
        # Test contact statistics (admin only)
        if self.admin_token:
            try:
                response = self.make_request("GET", "/contact/stats", admin_auth=True)
                if response.status_code == 200:
                    data = response.json()
                    if "total_messages" in data and "unread_messages" in data:
                        self.log_test("Contact Statistics", True, f"Total: {data['total_messages']}, Unread: {data['unread_messages']}")
                    else:
                        self.log_test("Contact Statistics", False, "Missing expected statistics", data)
                else:
                    self.log_test("Contact Statistics", False, f"Status code: {response.status_code}", response.text)
            except Exception as e:
                self.log_test("Contact Statistics", False, f"Exception: {str(e)}")
        
        # Test unauthorized access to admin endpoints
        if self.auth_token:
            try:
                response = self.make_request("GET", "/contact", use_auth=True)
                if response.status_code == 403:
                    self.log_test("Contact Admin Authorization", True, "Correctly prevented non-admin access")
                else:
                    self.log_test("Contact Admin Authorization", False, f"Expected 403, got {response.status_code}")
            except Exception as e:
                self.log_test("Contact Admin Authorization", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Comprehensive DNA Community Backend Testing")
        print("=" * 60)
        
        start_time = time.time()
        
        # Run all test suites
        self.test_health_and_docs()
        self.test_authentication_system()
        self.test_user_management()
        self.test_events_system()
        self.test_blog_system()
        self.test_newsletter_system()
        self.test_projects_system()
        self.test_contact_system()
        
        # Generate summary
        end_time = time.time()
        duration = end_time - start_time
        
        print("\n" + "=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        print(f"📊 Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   • {result['test']}: {result['message']}")
        
        print("\n🎯 CRITICAL FUNCTIONALITY STATUS:")
        critical_tests = [
            "Health Check", "User Registration", "User Login", "Current User Info",
            "Create Event", "Create RSVP", "Create Blog Post", "Newsletter Subscription",
            "Create Project", "Create Contact Message"
        ]
        
        for test_name in critical_tests:
            test_result = next((r for r in self.test_results if r["test"] == test_name), None)
            if test_result:
                status = "✅" if test_result["success"] else "❌"
                print(f"   {status} {test_name}")
        
        return {
            "total_tests": total_tests,
            "passed_tests": passed_tests,
            "failed_tests": failed_tests,
            "success_rate": (passed_tests/total_tests)*100,
            "duration": duration,
            "results": self.test_results
        }

def main():
    """Main function to run the tests"""
    # Use localhost for testing since we're running inside the container
    tester = DNABackendTester("http://localhost:8001")
    
    try:
        results = tester.run_all_tests()
        
        # Save detailed results to file
        with open("/app/backend_test_results.json", "w") as f:
            json.dump(results, f, indent=2, default=str)
        
        print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
        
        # Exit with appropriate code
        if results["failed_tests"] > 0:
            print("\n⚠️  Some tests failed. Check the results above for details.")
            return 1
        else:
            print("\n🎉 All tests passed successfully!")
            return 0
            
    except Exception as e:
        print(f"\n💥 Test execution failed: {str(e)}")
        return 1

if __name__ == "__main__":
    exit(main())