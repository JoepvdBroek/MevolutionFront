#!/bin/sh

# Install composer dependencies
composer install

# Install npm dependencies
npm install

# Write .bowerrc file
cat > .bowerrc <<EOT
{
    "directory" : "resources/assets/bower_components"
}
EOT

# Write .env file
cat > .env <<EOT
APP_ENV=local
APP_DEBUG=false
APP_KEY=7m113gubxyW3mtYjhl5klhJimL8vNUzb

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync
EOT

# Install Bower components
bower install

# Set file permissions
chmod -R 0777 storage/

# Run gulp
gulp
