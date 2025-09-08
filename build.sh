#!/bin/bash
# Build Hugo site with PaperMod theme
echo "Building Hugo site with PaperMod theme..."
hugo --theme PaperMod --minify
echo "Site built successfully in public/ directory"