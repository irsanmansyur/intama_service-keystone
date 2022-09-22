export $(cat ./.env)
export SESSION_SECRET=$(head -c50 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c50)
export NODE_ENV=production