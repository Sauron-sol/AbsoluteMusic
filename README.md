# Absolute - Comparaison de Performances Musicales

Absolute est une application web permettant aux musiciens de comparer leurs performances musicales en vidéo. Elle offre une interface intuitive pour uploader, visualiser et comparer des vidéos côte à côte.

## 🚀 Fonctionnalités

- Upload de vidéos musicales
- Visualisation côte à côte pour comparaison
- Gestion de bibliothèque de vidéos
- Interface utilisateur moderne et réactive
- Support de différents formats vidéo (MP4, MOV, WebM)

## 🛠 Technologies Utilisées

### Frontend
- React avec TypeScript
- Vite pour le build
- TailwindCSS pour le style
- Framer Motion pour les animations
- React Query pour la gestion d'état
- Material-UI pour les composants

### Backend
- NestJS avec TypeScript
- SQLite pour la base de données
- TypeORM pour l'ORM
- Multer pour la gestion des fichiers

### Infrastructure
- Docker & Docker Compose
- Nginx comme reverse proxy
- Multi-stage builds pour l'optimisation

## 🚀 Installation

1. Cloner le repository :
\`\`\`bash
git clone [URL_DU_REPO]
cd absolute
\`\`\`

2. Lancer avec Docker :
\`\`\`bash
docker-compose up --build
\`\`\`

L'application sera accessible sur :
- Frontend : http://localhost
- Backend : http://localhost:3000

## 📁 Structure du Projet

\`\`\`
absolute/
├── frontend/          # Application React
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
├── backend/           # API NestJS
│   ├── src/
│   ├── Dockerfile
│   └── uploads/       # Dossier des vidéos
└── docker-compose.yml
\`\`\`

## 💻 Développement Local

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Backend
\`\`\`bash
cd backend
npm install
npm run start:dev
\`\`\`

## 📝 Configuration

- Les vidéos sont stockées dans `backend/uploads/`
- La base de données SQLite est dans `backend/db.sqlite`
- La configuration nginx est dans `frontend/nginx.conf`

## 🔒 Sécurité

- Validation des fichiers uploadés
- Gestion des CORS
- Limitation de la taille des fichiers
- Formats de fichiers restreints