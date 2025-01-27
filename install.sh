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
apt install -y npm nginx

# Kloon de repository
git clone https://github.com/uw-repo-url/sellenix.git /var/www/sellenix
cd /var/www/sellenix

# Installeer dependencies
npm install

# Maak .env bestand aan
cat > .env << EOL
NODE_ENV=production
NEXTAUTH_URL=https://sellenix.com
NEXTAUTH_SECRET=$(openssl rand -base64 32)
DATABASE_URL="mysql://sellenix_user:yigitemirK2016@@localhost:3306/sellenix_db"
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

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

ln -s /etc/nginx/sites-available/sellenix /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx

echo "Installatie voltooid! Ga naar http://sellenix.com/install om de setup te voltooien."

