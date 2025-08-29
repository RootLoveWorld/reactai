#!/bin/bash

# ReactAI Backend Development Setup Script

echo "🚀 Starting ReactAI Backend Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 pnpm not found. Installing pnpm..."
    npm install -g pnpm
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your configuration before running the services."
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Start development infrastructure (PostgreSQL, Redis, etc.)
echo "🐳 Starting development infrastructure..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until docker exec reactai-postgres-dev pg_isready -U postgres > /dev/null 2>&1; do
    sleep 1
done

echo "✅ Development infrastructure is ready!"
echo ""
echo "🔗 Available services:"
echo "   📊 pgAdmin: http://localhost:8080 (admin@reactai.com / admin123)"
echo "   🗄️  Redis Commander: http://localhost:8081"
echo "   🐘 PostgreSQL: localhost:5432 (postgres / postgres123)"
echo "   📦 Redis: localhost:6379"
echo ""
echo "🚀 Starting NestJS services in development mode..."
echo "   Use the following commands to start individual services:"
echo "   📡 API Gateway: pnpm run start:api-gateway"
echo "   🔐 Auth Service: pnpm run start:auth-service"
echo "   👤 User Service: pnpm run start:user-service" 
echo "   💬 Chat Service: pnpm run start:chat-service"
echo ""
echo "   Or start all services:"
echo "   🎯 All Services: pnpm run start:all"