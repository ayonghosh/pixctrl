# PiXCtrl
X11 GUI control over the web.

Developed for Raspberry Pi but should work on any X11 system. Supports both desktop and mobile devices.

Dependencies:

* Node.js
* xdotool
 
##### Steps to install

1. Git clone this repo
2. Install nodejs (sudo apt-get install nodejs on Debian systems)
3. Install xdotool (sudo apt-get install xdotool on Debian systems)
4. Navigate to root of the repo
5. npm install
6. node app/index.js (or nodejs app/index.js, depending on the exact command on your system)
7. Connect a client over HTTP to port 5001

###### Notes:

* Hold down the Shift key to disable touchpad on desktop (useful when you want to move the mouse to click on a button)
