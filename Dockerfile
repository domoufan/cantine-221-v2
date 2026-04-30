# ─── STAGE 1 : build / install ───────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier uniquement les fichiers de dépendances d'abord (cache layer)
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=production

# Générer le client Prisma
RUN npx prisma generate

# ─── STAGE 2 : image finale légère ───────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Métadonnées
LABEL maintainer="Mouhamed Diop"
LABEL project="CANTINE 221 v2"
LABEL version="2.0.0"

# Copier node_modules et client Prisma depuis le builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copier le code source
COPY src ./src
COPY package*.json ./

# Utilisateur non-root pour la sécurité
RUN addgroup -S cantine && adduser -S cantine -G cantine
USER cantine

EXPOSE 3000

# Script de démarrage : attendre la DB puis lancer les migrations et le serveur
CMD ["node", "src/server.js"]
