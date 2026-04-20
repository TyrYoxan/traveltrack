# --- ÉTAPE 1 : Construction (Build) ---
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
# On copie package.json ET package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer toutes les dépendances (y compris devDependencies pour TS)
RUN npm install

# Copier le reste du code source
COPY . .

# Compiler le TypeScript (si applicable)
# Assurez-vous d'avoir un script "build" dans votre package.json
RUN npm run build

# --- ÉTAPE 2 : Exécution (Run) ---
FROM node:20-alpine

WORKDIR /app

# Définir l'environnement en production
ENV NODE_ENV=production

# Copier uniquement les fichiers nécessaires de l'étape builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Installer uniquement les dépendances de production
RUN npm ci --only=production

# Exposer le port sur lequel votre app écoute (ex: 3000)
EXPOSE 3001

# Utiliser l'utilisateur 'node' (fourni par l'image alpine) pour plus de sécurité
USER node

# Commande pour démarrer l'application
CMD ["node", "dist/index.js"]