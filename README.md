# BoomTube
BoomTube - Video Streaming Platform
🚀 Tech Stack
Frontend

React with TypeScript
Tailwind CSS for styling
React Hook Form with Yup validation
React Hot Toast for notifications
Axios for API communication

Backend

Node.js with Express.js
TypeScript for type safety
MongoDB with Mongoose ODM
JWT for authentication
Multer for file uploads
bcryptjs for password hashing

Additional Tools

Cloudinary for video storage
Nodemon for development
CORS for cross-origin requests

🎯 Features Implemented
Core Features

✅ User Authentication - Registration, Login, JWT-based sessions
✅ Video Upload - Support for both short-form (.mp4) and long-form (URL) videos
✅ Unified Scrolling Feed - Mixed content feed with auto-play for short videos
✅ Video Interaction - Watch videos, purchase paid content
✅ Mock Wallet System - Simulated payments with ₹500 starting balance
✅ Comments System - Add and view comments on videos
✅ Creator Gifting - Send gifts to creators with wallet deduction



📋 Prerequisites
Before running this application, make sure you have:

Node.js (v14 or higher)
npm or yarn
MongoDB (local installation or MongoDB Atlas)

🛠️ Installation & Setup
1. Clone the Repository
bashgit clone https://github.com/yourusername/boom-platform.git
cd boom-platform
2. Backend Setup
bashcd backend
npm install
Create a .env file in the backend directory:
envPORT=5000
MONGODB_URI=mongodb://localhost:27017/boom-platform
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development

# Optional: Cloudinary for video storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the backend server:
bashnpm run dev
3. Frontend Setup
bashcd frontend
npm install
Create a .env file in the frontend directory:
envREACT_APP_API_URL=http://localhost:5000
Start the frontend development server:
bashnpm start
4. Database Setup
The application will automatically create the necessary collections when you first run it. No manual database setup required.
🔧 API Documentation
Authentication Endpoints
Register User
httpPOST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  dateOfBirth : "02/12/1994"
}
Login User
httpPOST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
Video Endpoints
Upload Video
httpPOST /api/videos/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "My Video",
  "description": "Video description",
  "type": "short", // or "long"
  "videoFile": <file>, // for short videos
  "videoUrl": "https://example.com/video", // for long videos
  "price": 29 // for paid long videos
}
Get Feed
httpGET /api/videos/feed?page=1&limit=10
Authorization: Bearer <token>
Get Video Details
httpGET /api/videos/:id
Authorization: Bearer <token>
Purchase Endpoints
Purchase Video
httpPOST /api/purchases/:videoId
Authorization: Bearer <token>

Gift Creator
httpPOST /api/gifts/:videoId
Authorization: Bearer <token>
Content-Type: application/json

{
  
  "amount": 50
}
Comment Endpoints
Add Comment
httpPOST /api/comments/:videoId
Authorization: Bearer <token>
Content-Type: application/json

{

  "content": "Great video!"
}
Get Comments
httpGET /api/comments/:videoId
Authorization: Bearer <token>

User Endpoints
Get User Profile
httpGET /api/users/profile
Authorization: Bearer <token>



🎮 Usage Guide
1. User Registration & Login

Visit the application at http://localhost:3000
Click "Sign Up" to create a new account
Use the credentials to log in

2. Uploading Videos
Short-Form Videos

Go to "create Video" page
Fill in title and description
Select "Short-Form" as video type
Upload an MP4 file (max 10MB)
Click "Upload Video"

Long-Form Videos

Go to "create Video" page
Fill in title and description
Select "Long-Form" as video type
Enter a video URL (YouTube, Vimeo, etc.)
Set price (0 for free, or any amount)
Click "Upload Video"

3. Browsing the Feed

Visit the main feed page
Scroll through mixed short and long-form content
Short videos auto-play when in view
Click "Watch" on free content or "Buy" on paid content

4. Interacting with Videos

Click on any video to open the player page
Add comments below the video
Use "Gift Creator" to send money to the creator
Your wallet balance is displayed in the header

🧪 Testing
Manual Testing Scenarios

User Flow: Register → Login → Upload Video → View Feed
Payment Flow: Purchase paid video → Check wallet balance
Interaction Flow: Comment on video → Gift creator
Validation Testing: Try invalid inputs on forms
File Upload Testing: Upload different video formats and sizes

Test Users
You can create multiple test accounts to simulate different user interactions:

Creator account: Upload various types of content
Viewer account: Purchase and interact with content


Database (MongoDB Atlas)

Create a MongoDB Atlas cluster
Update MONGODB_URI in environment variables
Whitelist deployment server IPs

🔐 Security Features

JWT Authentication with secure token handling
Password Hashing using bcrypt
Input Validation 
File Upload Restrictions for security
CORS Configuration for API security

