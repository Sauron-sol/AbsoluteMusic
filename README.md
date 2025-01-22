# Absolute - Music Performance Comparison

Absolute is a web application that allows musicians to compare their musical performances in video. It offers an intuitive interface to upload, view, and compare videos.

## 🚀 Features

- Upload musical videos
- Side-by-side video comparison
- Video library management
- Modern and responsive user interface
- Support for various video formats (MP4, MOV, WebM)

## 🛠 Technologies Used

### Frontend
- React with TypeScript
- Vite for building
- TailwindCSS for styling
- Framer Motion for animations
- React Query for state management
- Material-UI for components

### Backend
- NestJS with TypeScript
- SQLite for the database
- TypeORM for ORM
- Multer for file handling

### Infrastructure
- Docker & Docker Compose
- Nginx as reverse proxy
- Multi-stage builds for optimization

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone [REPO_URL]
   cd absolute
   ```

2. Start with Docker:
   ```bash
   docker-compose up --build
   ```

The application will be accessible at:
- Frontend: http://localhost
- Backend: http://localhost:3000

## 📁 Project Structure

```
absolute/
├── frontend/          # React application
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
├── backend/           # NestJS API
│   ├── src/
│   ├── Dockerfile
│   └── uploads/       # Video folder
└── docker-compose.yml
```

## 💻 Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run start:dev
```

## 📝 Configuration

- Videos are stored in `backend/uploads/`
- SQLite database is in `backend/db.sqlite`
- Nginx configuration is in `frontend/nginx.conf`

## 🔒 Security

- Validation of uploaded files
- CORS management
- File size limitation
- Restricted file formats
