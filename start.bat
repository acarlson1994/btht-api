@echo Off

echo Start MongoDB.
start cmd /c "D:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath d:\mongodbdata\temp

echo Start Redis
start cmd /c bash -xe -c "sudo redis-server /etc/redis/redis.conf && tail -f /var/log/redis/redis-server.log"

rem TIMEOUT 5
echo Delete Docs dir.
call rd /s /q "doc"

echo Generate API Documentation.
rem call apidoc

echo Wait for MongoDB to start.
TIMEOUT 2

echo Start app with nodemon for file change detection.
start cmd /c nodemon app.js

exit