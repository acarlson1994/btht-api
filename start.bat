@echo Off

echo Start MongoDB.
start cmd /c "D:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath d:\mongodbdata\temp

echo Delete Docs dir.
call rd /s /q "doc"

echo Generate API Documentation.
call apidoc

echo Wait for MongoDB to start.
TIMEOUT 2

echo Start app with nodemon for file change detection.
start cmd /c nodemon app.js

exit