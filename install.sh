#!/bin/bash

# Controleer of we root zijn
if [ "$EUID" -ne 0 ]
  then echo "Dit script moet als root worden uitgevoerd"
  exit
fi

# Update systeem
apt update && apt upgrade -y

# Zorg ervoor dat Node.js 20 is geïnstalleerd
if ! command -v node &> /dev/null || [ $(node -v | cut -d'.' -f1 | tr -d 'v') -lt 20 ]
then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    apt-get install -y nodejs
fi

# Installeer benodigde pakketten
apt install -y nginx mysql-server

# Kloon de repository
git clone https://github.com/Sellenix/sellenixapp.git /var/www/sellenix
cd /var/www/sellenix

# Update package.json om date-fns versie te corrigeren en andere dependencies toe te voegen
sed -i 's/"date-fns": "4.1.0"/"date-fns": "^2.30.0"/' package.json
npm install --save @types/node @types/react

# Installeer dependencies
npm install --legacy-peer-deps

# Maak .env bestand aan
cat > .env << EOL
NODE_ENV=production
NEXTAUTH_URL=https://sellenix.com
NEXTAUTH_SECRET=$(openssl rand -base64 32)
DATABASE_URL="mysql://root:LPUxVCpTjAgHmwN4aahg@localhost:3306/sellenix"
MOLLIE_API_KEY=your_mollie_api_key
IS_INSTALLED=false
EOL

# Voer database migraties uit
npx prisma generate
npx prisma migrate deploy

# Build de applicatie
npm run build

# Installeer PM2 globaal
npm install -g pm2

# Start de applicatie met PM2
pm2 start npm --name "sellenix" -- start

# Stel PM2 in om te starten bij systeemstart
pm2 startup
pm2 save

# Nginx configuratie
cat > /etc/nginx/sites-available/sellenix << EOL
server {
    listen 80;
    server_name sellenix.com www.sellenix.com;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl;
    server_name sellenix.com www.sellenix.com;

    ssl_certificate /etc/letsencrypt/live/sellenix.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sellenix.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    access_log /var/log/nginx/sellenix_access.log;
    error_log /var/log/nginx/sellenix_error.log;
}
EOL

# Verwijder de standaard Nginx configuratie en eventuele bestaande symlinks
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/sellenix

# Activeer de nieuwe configuratie
ln -s /etc/nginx/sites-available/sellenix /etc/nginx/sites-enabled/

# Test Nginx configuratie en herstart
nginx -t && systemctl restart nginx

echo "Installatie voltooid! Ga naar https://sellenix.com/install om de setup te voltooien."

