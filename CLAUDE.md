# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based blog/website using the Minima theme, hosted on GitHub Pages. The site supports both Chinese (default) and English content.

## Architecture

- **Jekyll Static Site**: Uses Jekyll with the Minima theme configured in `_config.yml`
- **Bilingual Support**: 
  - Default content in Chinese (`_posts/`, root `index.md`)
  - English content in dedicated directories (`_posts_en/`, `en/`)
- **GitHub Pages Deployment**: Automated via GitHub Actions workflow (`.github/workflows/jekyll-gh-pages.yml`)

## Directory Structure

- `_posts/` - Chinese blog posts
- `_posts_en/` - English blog posts  
- `_layouts/` - Jekyll page layouts (currently empty)
- `_includes/` - Reusable Jekyll components (currently empty)
- `_sass/` - Sass stylesheets (currently empty)
- `_data/` - YAML data files (currently empty)
- `assets/` - Static assets organized by type:
  - `css/` - Custom stylesheets
  - `js/` - JavaScript files
  - `images/` - Image assets
- `en/` - English version pages

## Development Commands

Since this is a Jekyll site without a Gemfile, use these commands:

### Local Development
```bash
# Install Jekyll (if not already installed)
gem install jekyll bundler

# Serve site locally
jekyll serve

# Build site
jekyll build
```

### GitHub Pages Deployment
- Deployment is automatic on push to `main` branch
- Uses GitHub Actions workflow: `jekyll-gh-pages.yml`
- No manual deployment commands needed

## Content Creation

### Blog Posts
- Chinese posts: Place in `_posts/` with format `YYYY-MM-DD-title.md`
- English posts: Place in `_posts_en/` with format `YYYY-MM-DD-title.md`
- Use Jekyll front matter for metadata

### Static Pages
- Chinese pages: Place in root directory
- English pages: Place in `en/` directory

## Theme Customization
- Currently uses default Minima theme
- Custom styles can be added to `assets/css/`
- Custom JavaScript can be added to `assets/js/`
- Theme overrides can be placed in `_layouts/`, `_includes/`, or `_sass/`