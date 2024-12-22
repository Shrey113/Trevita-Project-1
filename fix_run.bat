@echo off
echo Stopping processes using ports 3000 and 4000...

:: Find the process using port 3000 and kill it
echo Killing process on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /f /pid %%a

:: Find the process using port 4000 and kill it
echo Killing process on port 4000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4000') do taskkill /f /pid %%a

echo Ports 3000 and 4000 should now be free.
pause
