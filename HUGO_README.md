# Hugo Bilingual Blog

这是一个使用Hugo构建的现代化双语博客，支持中英文内容。

## 特性

- 🌐 **双语支持**: 支持中英文内容，使用文件后缀（`.en.md`, `.zh.md`）区分语言
- 📱 **响应式设计**: 使用Ananke主题，适配各种设备
- ⚡ **快速加载**: Hugo静态生成，性能优秀
- 🔍 **SEO优化**: 包含多语言SEO元标签
- 🎨 **可定制**: 易于扩展和自定义

## 目录结构

```
hugo-blog/
├── config/           # 配置文件
├── content/          # 内容文件
│   ├── posts/        # 博客文章
│   │   ├── *.en.md   # 英文文章
│   │   └── *.zh.md   # 中文文章
│   ├── about.en.md   # 英文关于页面
│   ├── about.zh.md   # 中文关于页面
│   ├── _index.en.md  # 英文首页
│   └── _index.zh.md  # 中文首页
├── layouts/          # 自定义布局
├── themes/           # 主题文件
└── hugo.toml         # 主配置文件
```

## 开发命令

### 本地开发
```bash
# 启动开发服务器
hugo server

# 启动开发服务器并包含草稿
hugo server --buildDrafts

# 指定端口启动
hugo server --port 3000
```

### 内容创建
```bash
# 创建新的英文文章
hugo new posts/my-new-post.en.md

# 创建新的中文文章  
hugo new posts/my-new-post.zh.md

# 创建页面
hugo new about.en.md
```

### 构建部署
```bash
# 构建生产版本
hugo

# 构建并包含草稿
hugo --buildDrafts

# 清理构建缓存
hugo --gc
```

## 内容管理

### 文章头部信息 (Front Matter)

每篇文章需要包含以下元信息：

```yaml
---
title: "文章标题"
date: 2024-01-01T00:00:00+08:00
draft: false
categories: ["分类"]
tags: ["标签1", "标签2"]
summary: "文章摘要"
---
```

### 多语言内容

- 英文内容使用 `.en.md` 后缀
- 中文内容使用 `.zh.md` 后缀
- 相同文件名的不同语言版本会自动关联

### 示例
```
content/
├── posts/
│   ├── welcome.en.md  # 英文版本
│   └── welcome.zh.md  # 中文版本
```

## 配置说明

主要配置项在 `hugo.toml` 中：

- `defaultContentLanguage`: 默认语言
- `[languages]`: 语言特定配置
- `[menu]`: 导航菜单配置
- `[params]`: 自定义参数

## 部署

### GitHub Pages
1. 推送代码到GitHub仓库
2. 配置GitHub Actions使用Hugo构建
3. 设置GitHub Pages源为Actions

### Netlify
1. 连接GitHub仓库
2. 构建命令：`hugo`
3. 发布目录：`public`

## 自定义

### 主题定制
- 在 `layouts/` 目录中创建文件覆盖主题模板
- 在 `static/` 目录中添加自定义CSS/JS
- 在 `assets/` 目录中添加需要处理的资源

### 语言配置
在 `hugo.toml` 中添加新语言：

```toml
[languages.fr]
  languageCode = "fr-FR" 
  languageName = "Français"
  weight = 3
```

## 故障排除

### 常见问题
1. **布局警告**: 确保主题已正确安装在 `themes/` 目录中
2. **多语言不工作**: 检查文件后缀是否正确（`.en.md`, `.zh.md`）
3. **菜单不显示**: 确认 `hugo.toml` 中菜单配置正确

### 开发技巧
- 使用 `hugo server -D` 查看草稿内容
- 使用 `hugo --gc` 清理缓存
- 使用 `hugo config` 检查配置

## 从Jekyll迁移

如果你从Jekyll迁移过来，主要差异：

1. **配置文件**: `_config.yml` → `hugo.toml`
2. **内容目录**: `_posts/` → `content/posts/`
3. **布局目录**: `_layouts/` → `layouts/`
4. **Front Matter**: 时间格式略有不同
5. **多语言**: Jekyll使用目录结构，Hugo使用文件后缀

## 更多资源

- [Hugo官方文档](https://gohugo.io/documentation/)
- [Ananke主题文档](https://github.com/theNewDynamic/gohugo-theme-ananke)
- [Hugo多语言指南](https://gohugo.io/content-management/multilingual/)