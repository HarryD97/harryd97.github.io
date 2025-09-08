#!/bin/bash
# Build Hugo site with Hextra theme
echo "Building Hugo site with Hextra theme..."
hugo --theme hextra --minify
echo "Site built successfully in public/ directory"