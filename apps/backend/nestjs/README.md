# ReactAI NestJS Backend

A scalable NestJS backend service with JWT authentication, WebSocket real-time chat, PostgreSQL database, and microservices architecture.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │  Microservices  │
│   (React)       │◄──►│   (Port 3000)   │◄──►│                 │
└─────────────────┘    └─────────────────┘    │  Auth (3001)    │
                                              │  User (3002)    │
                                              │  Chat (3003)    │
                                              └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   Redis Cache   │
                    └─────────────────┘
```

## 🚀 Features

- **🔐 JWT Authentication**: Secure authentication with access and refresh tokens
- **👥 User Management**: Complete user CRUD operations
- **💬 Real-time Chat**: WebSocket-powered chat with rooms and messaging
- **📡 Microservices**: Scalable architecture with independent services
- **📊 PostgreSQL**: Robust relational database with TypeORM
- **🗄️ Redis**: Caching and session management
- **📝 API Documentation**: Swagger/OpenAPI integration
- **🐳 Docker**: Containerized deployment
- **🔒 Security**: Helmet, CORS, rate limiting, validation
- **📈 Monitoring**: Health checks and logging

## 🛠️ Technology Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Cache**: Redis with IORedis
- **Authentication**: JWT with Passport
- **Real-time**: Socket.IO WebSockets
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer
- **Containerization**: Docker & Docker Compose
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js 18+
- pnpm
- Docker & Docker Compose
- PostgreSQL (local or containerized)
- Redis (local or containerized)

## 🚀 Quick Start

### 1. Clone and Install

```bash
cd apps/backend/nestjs
pnpm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
# Update database credentials, JWT secrets, etc.
nano .env
```

### 3. Start Development Infrastructure

```bash
# Start PostgreSQL, Redis, pgAdmin, and Redis Commander
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Run Development Services

```bash
# Install dependencies
pnpm install

# Start all services in development mode
pnpm run start:dev

# Or start services individually:
pnpm run start:api-gateway      # API Gateway (Port 3000)
pnpm run start:auth-service     # Auth Service (Port 3001)  
pnpm run start:user-service     # User Service (Port 3002)
pnpm run start:chat-service     # Chat Service (Port 3003)
```

### 5. Access Services

- **API Documentation**: http://localhost:3000/api/docs
- **API Gateway**: http://localhost:3000/api
- **pgAdmin**: http://localhost:8080 (admin@reactai.com / admin123)
- **Redis Commander**: http://localhost:8081

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID

### Chat
- `POST /api/chat/rooms` - Create chat room
- `GET /api/chat/rooms` - Get user's chat rooms
- `POST /api/chat/rooms/:id/join` - Join chat room
- `POST /api/chat/rooms/:id/leave` - Leave chat room
- `GET /api/chat/rooms/:id/messages` - Get room messages
- `POST /api/chat/messages` - Send message (HTTP)

### WebSocket Events (ws://localhost:3004/chat)
- `join_room` - Join a chat room
- `leave_room` - Leave a chat room
- `message` - Send message
- `typing` - Typing indicator
- `new_message` - Receive new message
- `user_joined` - User joined room
- `user_left` - User left room

## 🗄️ Database Schema

### Users Table
```sql
id (UUID), email, username, firstName, lastName, 
passwordHash, isActive, emailVerified, lastLogin,
createdAt, updatedAt
```

### ChatRooms Table
```sql
id (UUID), name, description, isPrivate, maxMembers,
isActive, createdById, createdAt, updatedAt
```

### Messages Table
```sql
id (UUID), content, type, chatRoomId, userId, replyToId,
isEdited, editedAt, isDeleted, deletedAt, metadata,
createdAt, updatedAt
```

### UserChatRooms Table (Many-to-Many)
```sql
id (UUID), userId, chatRoomId, role, isMuted, mutedUntil,
lastReadAt, notificationEnabled, joinedAt, leftAt,
isActive, createdAt, updatedAt
```

## 🐳 Docker Deployment

### Development
```bash
# Start development infrastructure only
docker-compose -f docker-compose.dev.yml up -d

# Run services locally with hot reload
pnpm run start:dev
```

### Production
```bash
# Create production environment file
cp .env.example .env.production
# Update .env.production with production values

# Build and deploy all services
docker-compose --env-file .env.production up -d

# Or use the deployment script
./scripts/deploy.sh
```

## 🔧 Development Scripts

```bash
# Development
pnpm run start:dev          # Start API Gateway in development
pnpm run start:api-gateway  # Start API Gateway
pnpm run start:auth-service # Start Auth Service  
pnpm run start:user-service # Start User Service
pnpm run start:chat-service # Start Chat Service

# Building
pnpm run build             # Build all services
pnpm run build:api-gateway # Build API Gateway
pnpm run build:auth-service# Build Auth Service

# Testing
pnpm run test              # Run unit tests
pnpm run test:watch        # Run tests in watch mode
pnpm run test:cov          # Run tests with coverage
pnpm run test:e2e          # Run end-to-end tests

# Linting & Formatting
pnpm run lint              # Lint code
pnpm run format            # Format code

# Database
pnpm run migration:generate # Generate migration
pnpm run migration:run      # Run migrations
pnpm run migration:revert   # Revert migration
```

## 🔒 Environment Variables

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=reactai_db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Microservices Ports
API_GATEWAY_PORT=3000
AUTH_SERVICE_PORT=3001
USER_SERVICE_PORT=3002
CHAT_SERVICE_PORT=3003
WS_PORT=3004

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100
```

## 🧪 Testing

### Unit Tests
```bash
pnpm run test
```

### E2E Tests
```bash
pnpm run test:e2e
```

### WebSocket Testing
Use a WebSocket client or the frontend application to test real-time chat functionality.

## 📊 Monitoring & Health Checks

- **Health Endpoint**: `GET /api/health`
- **Service Status**: Each microservice exposes health checks
- **Logging**: Winston logger with different log levels
- **Metrics**: Built-in NestJS metrics and custom business metrics

## 🔧 Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000-3004, 5432, 6379 are available
2. **Database connection**: Ensure PostgreSQL is running and accessible
3. **Redis connection**: Ensure Redis is running and accessible
4. **Environment variables**: Check all required env vars are set
5. **Dependencies**: Run `pnpm install` if packages are missing

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development LOG_LEVEL=debug pnpm run start:dev
```

### Container Logs
```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api-gateway
docker-compose logs -f auth-service
```

## 📚 API Documentation

Interactive API documentation is available at:
- **Swagger UI**: http://localhost:3000/api/docs
- **JSON Schema**: http://localhost:3000/api/docs-json

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Coding! 🚀**