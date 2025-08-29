#!/bin/bash

# ReactAI Backend Production Deployment Script

echo "🚀 Deploying ReactAI Backend to Production..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if production .env exists
if [ ! -f .env.production ]; then
    echo "❌ Production environment file (.env.production) not found."
    echo "   Please create .env.production with your production configuration."
    exit 1
fi

# Build all Docker images
echo "🔨 Building Docker images..."
docker-compose build --no-cache

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Start production environment
echo "🐳 Starting production environment..."
docker-compose --env-file .env.production up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🔍 Checking service health..."

# Check API Gateway
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ API Gateway is healthy"
else
    echo "❌ API Gateway health check failed"
fi

# Check if database is accessible
if docker exec reactai-postgres pg_isready -U postgres > /dev/null 2>&1; then
    echo "✅ Database is ready"
else
    echo "❌ Database is not ready"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "🔗 Available endpoints:"
echo "   📡 API Gateway: http://localhost:3000"
echo "   📚 API Documentation: http://localhost:3000/api/docs"
echo "   ❤️  Health Check: http://localhost:3000/api/health"
echo ""
echo "📊 To monitor logs:"
echo "   🔍 All services: docker-compose logs -f"
echo "   📡 API Gateway: docker-compose logs -f api-gateway"
echo "   🔐 Auth Service: docker-compose logs -f auth-service"
echo "   👤 User Service: docker-compose logs -f user-service"
echo "   💬 Chat Service: docker-compose logs -f chat-service"