@echo off
echo Starting MongoDB...
echo Make sure MongoDB is installed and in your PATH

echo.
echo If MongoDB is not installed, you can:
echo 1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
echo 2. Or use MongoDB Atlas (cloud) and update the MONGODB_URI in backend/.env
echo.

mongod --dbpath="C:\data\db"
pause
