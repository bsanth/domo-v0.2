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

# Deploy dashboard with Helm
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

# Port forward to access the dashboard
k8s_resource(
    'chart-dashboard',
    port_forwards=['3000:3000'],
    labels=['app'],
    resource_deps=[]
)

# Deploy MQTT with Helm
k8s_yaml(helm(
    'helm/mqtt',
    values=['./helm/mqtt/values.yaml'],
    set=[
        'config.persistence.enabled=false',  # Disable persistence in development
    ]
))

# Port forward MQTT
k8s_resource('chart-mqtt',
    port_forwards=['1883:1883'],
    labels=['mqtt']
)

# Build custom Frigate image
docker_build('frigate-dev', '.', dockerfile='Dockerfile.frigate',
    live_update=[
        sync('frigate/web', '/opt/frigate/web'),
        run('cd /opt/frigate/web && npm install', trigger=['frigate/web/package.json']),
        run('cd /opt/frigate/web && npm run build', trigger=['frigate/web/src'])
    ]
)

# Deploy Frigate with Helm
k8s_yaml(helm(
    'helm/frigate',
    values=['./helm/frigate/values.yaml'],
    set=[
        'image.repository=frigate-dev',
        'image.tag=latest',
        'image.pullPolicy=Never',  # Use local image
        'persistence.enabled=false',  # Disable persistence in development
    ]
))

# Define local port forwarding for the Frigate UI
k8s_resource('chart-frigate', 
    port_forwards=5000,
    labels=['frigate']
)