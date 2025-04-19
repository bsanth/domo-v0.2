# -*- mode: Python -*-

# Load environment variables
load('ext://dotenv', 'dotenv')
dotenv()

# Set default registry for Docker images
# Use localhost:5000 as default registry which doesn't need authentication
default_registry('localhost:5000')

# Define constants
DASHBOARD_IMAGE_NAME = 'dashboard'
DASHBOARD_DIR = './dashboard'

# Build Docker image for development
docker_build(
    DASHBOARD_IMAGE_NAME,
    '.',
    dockerfile='Dockerfile',
    target='development',  # Use the development target for hot reloading
    only=['./dashboard'],  # Only watch the dashboard directory
    live_update=[
        # Sync changed files to the container
        sync('./dashboard/src', '/app/src'),
        sync('./dashboard/public', '/app/public'),
        # Restart the process if package.json changes
        run('cd /app && yarn install', trigger=['./dashboard/package.json', './dashboard/package-lock.json'])
    ]
)

# Deploy with Helm
k8s_yaml(helm(
    'helm/dashboard',
    # Set development mode in Helm
    values=['./helm/dashboard/values.yaml'],
    set=[
        'development.enabled=false',  # Disable development volumes in Helm
        'image.repository=' + DASHBOARD_IMAGE_NAME,
        'image.tag=latest',
        'image.pullPolicy=Never',  # Use local image
    ]
))

# Port forward to access the application
k8s_resource(
    'chart-dashboard',
    port_forwards=['3000:3000'],
    labels=['app'],
    resource_deps=[]
) 