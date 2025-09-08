#!/bin/bash
# Build Hugo site with Ananke theme
echo "Building Hugo site with Ananke theme..."
hugo --theme ananke --minify
echo "Site built successfully in public/ directory"