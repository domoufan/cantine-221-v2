# CANTINE 221 v2 — Version Dockerisée

**Auteur :** Mouhamed Diop  
**Version :** 2.0.0  
**Stack :** Node.js · Express.js · Prisma ORM · PostgreSQL · Docker · Docker Compose

---

## Démarrage rapide (Docker)

```bash
# 1. Copier le fichier d'environnement
cp .env.example .env

# 2. Lancer tous les services (DB + migrations + API)
docker compose up -d

# 3. Vérifier que tout fonctionne
docker compose ps
docker compose logs api
```

L'API est disponible sur `http://localhost:3000`  
La documentation Swagger sur `http://localhost:3000/api-docs`

---

## Services Docker

| Service | Conteneur | Port | Description |
|---------|-----------|------|-------------|
| `postgres` | cantine221_db | 5433 (hôte) | Base de données PostgreSQL 16 |
| `migrate` | cantine221_migrate | — | Lance les migrations Prisma au démarrage |
| `api` | cantine221_api | 3000 | API Node.js/Express |
| `prisma-studio` | cantine221_studio | 5555 | Interface visuelle (profil dev) |

---

## Commandes utiles

```bash
# Démarrer (production)
docker compose up -d

# Démarrer avec Prisma Studio (développement)
docker compose --profile dev up -d

# Voir les logs de l'API
docker compose logs -f api

# Arrêter tous les services
docker compose down

# Arrêter ET supprimer les volumes (reset complet de la BDD)
docker compose down -v

# Reconstruire l'image après modification du code
docker compose up -d --build api

# Accéder au shell de l'API
docker compose exec api sh

# Accéder à PostgreSQL
docker compose exec postgres psql -U cantine -d cantine221
```

---

## Variables d'environnement (.env)

| Variable | Défaut | Description |
|----------|--------|-------------|
| `PORT` | 3000 | Port de l'API |
| `NODE_ENV` | production | Environnement |
| `POSTGRES_USER` | cantine | Utilisateur PostgreSQL |
| `POSTGRES_PASSWORD` | cantine221pass | Mot de passe PostgreSQL |
| `POSTGRES_DB` | cantine221 | Nom de la base |
| `DATABASE_URL` | (construit depuis les vars ci-dessus) | URL Prisma |

---

## Architecture Docker

```
docker-compose.yml
├── postgres        # PostgreSQL 16-alpine avec healthcheck
├── migrate         # Conteneur temporaire : prisma migrate deploy
├── api             # Image multi-stage (builder + production)
└── prisma-studio   # Profil "dev" uniquement
```

Le build Docker utilise un **multi-stage build** :
1. **Stage `builder`** : installe `node_modules` et génère le client Prisma
2. **Stage `production`** : image finale légère, utilisateur non-root, sans devDependencies
