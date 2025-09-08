# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based blog/website using the PaperMod theme, hosted on GitHub Pages. The site supports both Chinese and English content with Hugo's built-in multilingual features.

## Architecture

- **Hugo Static Site**: Uses Hugo with the PaperMod theme configured in `hugo.toml`
- **Bilingual Support**: 
  - Content files use language suffixes (`.en.md`, `.zh.md`)
  - English as default language, Chinese as secondary
  - Automatic language switching and SEO optimization
- **GitHub Pages Deployment**: Can use GitHub Actions workflow for Hugo deployment

## Directory Structure

- `content/` - Hugo content files
  - `posts/` - Blog posts with language suffixes
    - `*.en.md` - English posts
    - `*.zh.md` - Chinese posts
  - `about.en.md` - English about page
  - `about.zh.md` - Chinese about page
  - `_index.en.md` - English homepage
  - `_index.zh.md` - Chinese homepage
- `layouts/` - Custom Hugo layouts and partials
- `themes/` - Hugo themes (Ananke)
- `static/` - Static assets (images, CSS, JS)
- `assets/` - Hugo assets for processing
- `hugo.toml` - Main Hugo configuration

### Legacy Jekyll Files (can be removed):
- `_posts/`, `_posts_zh/` - Old Jekyll posts
- `_layouts/`, `_includes/`, `_sass/` - Jekyll template files
- `_config.yml` - Jekyll configuration

## Development Commands

This is now a Hugo site with multilingual support:

### Local Development
```bash
# Install Hugo (if not already installed)
brew install hugo

# Serve site locally (recommended - uses scripts)
./serve.sh

# Build site (recommended - uses script)
./build.sh

# Manual commands
hugo server --theme PaperMod
hugo server --theme PaperMod --buildDrafts
hugo --theme PaperMod --minify
```

### Important Notes
- Hugo requires the `--theme PaperMod` parameter to work correctly
- Use the provided scripts (`serve.sh` and `build.sh`) for convenience
- PaperMod theme includes search functionality, dark mode, and analytics support

### GitHub Pages Deployment
- **Automated**: GitHub Actions workflow (`.github/workflows/hugo.yml`) automatically builds and deploys on push to `main`
- **Manual**: Run `./build.sh` locally and deploy `public/` directory
- **Setup**: Enable GitHub Pages with "GitHub Actions" as source in repository settings
- See `DEPLOYMENT_GUIDE.md` for detailed setup instructions

## Content Creation

### Blog Posts
- Create posts in `content/posts/` directory
- English posts: Use `.en.md` suffix (e.g., `my-post.en.md`)
- Chinese posts: Use `.zh.md` suffix (e.g., `my-post.zh.md`)
- Use Hugo front matter for metadata

### Static Pages
- Place pages in `content/` directory
- English pages: Use `.en.md` suffix (e.g., `about.en.md`)
- Chinese pages: Use `.zh.md` suffix (e.g., `about.zh.md`)

## Theme Customization
- Currently uses Ananke theme
- Custom layouts can be added to `layouts/` directory
- Static assets go in `static/` directory
- Processed assets go in `assets/` directory
- Theme can be customized by overriding layouts and partials