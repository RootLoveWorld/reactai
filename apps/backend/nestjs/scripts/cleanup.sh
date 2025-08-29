#!/bin/bash

# ReactAI Backend Cleanup Script

echo "🧹 Cleaning up ReactAI Backend environment..."

# Stop all containers
echo "🛑 Stopping all containers..."
docker-compose down
docker-compose -f docker-compose.dev.yml down

# Remove containers (optional)
read -p "🗑️  Remove all containers? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose rm -f
    docker-compose -f docker-compose.dev.yml rm -f
    echo "✅ Containers removed"
fi

# Remove volumes (optional) 
read -p "🗑️  Remove all volumes (THIS WILL DELETE ALL DATA)? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose down -v
    docker-compose -f docker-compose.dev.yml down -v
    echo "✅ Volumes removed"
fi

# Remove images (optional)
read -p "🗑️  Remove all images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker rmi $(docker images "reactai*" -q) 2>/dev/null || echo "No ReactAI images to remove"
    echo "✅ Images removed"
fi

# Clean Docker system (optional)
read -p "🗑️  Run Docker system prune? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker system prune -f
    echo "✅ Docker system cleaned"
fi

# Remove node_modules (optional)
read -p "🗑️  Remove node_modules? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf node_modules
    rm -rf apps/*/node_modules
    rm -rf libs/*/node_modules
    echo "✅ node_modules removed"
fi

# Remove dist folder (optional)
read -p "🗑️  Remove dist folder? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf dist
    echo "✅ dist folder removed"
fi

echo ""
echo "🎉 Cleanup complete!"
echo "   Run 'pnpm install' to reinstall dependencies"
echo "   Run './scripts/dev-start.sh' to start development environment"