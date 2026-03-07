#!/bin/sh
# Substitute BACKEND_URL placeholder in nginx config
BACKEND_URL="${BACKEND_URL:-https://ucp-business-agent-mhff4zrwlq-uc.a.run.app}"

sed -i "s|BACKEND_URL_PLACEHOLDER|${BACKEND_URL}|g" /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g "daemon off;"
