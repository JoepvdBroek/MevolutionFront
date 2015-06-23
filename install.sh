#!/bin/sh

# Install composer dependencies
composer install

# Install npm dependencies
npm install

# Install bower dependencies
bower install

# Write .bowerrc file
echo <<EOT > .bowerrc
{
    "directory" : "resources/assets/bower_components"
}
EOT

# Write .env file
echo <<EOT > .env
APP_ENV=local
APP_DEBUG=false
APP_KEY=7m113gubxyW3mtYjhl5klhJimL8vNUzb

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync
EOT

# Run gulp
gulp
