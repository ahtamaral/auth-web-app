#!/bin/bash

sudo cp -r ./* /var/www/auth-web-app/
echo "static webpages served at /var/www/auth-web-app/"
echo "Web app can be accessed by http://localhost:81"
cd ../backend
node index.js
