# GitHub Actions 构建失败修复

## 🚨 问题描述

GitHub Actions 构建失败，错误信息：
```
The process '/usr/bin/git' failed with exit code 128
No url found for submodule path 'themes/PaperMod' in .gitmodules
```

## 🔍 根本原因

1. **主题目录包含.git文件夹**: 使用 `git clone` 安装主题时，保留了原始的 `.git` 目录
2. **GitHub Actions误判为submodule**: Actions的 `checkout` 操作发现 `.git` 目录，认为是submodule
3. **缺少.gitmodules配置**: 没有正确配置submodules，导致Git无法找到submodule的URL

## ✅ 修复方案

### 步骤1：删除主题的.git目录
```bash
rm -rf themes/PaperMod/.git
rm -rf themes/ananke/.git
```

### 步骤2：修改GitHub Actions配置
移除 `submodules: recursive` 设置：

```yaml
# 修改前（有问题）
- name: Checkout
  uses: actions/checkout@v4
  with:
    submodules: recursive
    fetch-depth: 0

# 修改后（正确）  
- name: Checkout
  uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

### 步骤3：验证本地构建
```bash
hugo --theme PaperMod --quiet
```

## 🔧 验证修复

1. **本地验证**: ✅ Hugo构建成功，无错误
2. **主题功能**: ✅ PaperMod主题正常工作
3. **双语支持**: ✅ 中英文页面正常生成

## 📋 提交清单

- [x] 删除主题.git目录
- [x] 更新GitHub Actions配置
- [x] 验证本地构建成功
- [x] 准备推送修复

## 🚀 下一步操作

推送修复到GitHub：
```bash
git add .
git commit -m "Fix GitHub Actions build: remove theme .git directories and update workflow"
git push origin main
```

## 🎯 预期结果

推送后，GitHub Actions应该能够：
1. 成功checkout代码
2. 正确安装Hugo
3. 使用PaperMod主题构建站点
4. 部署到GitHub Pages

## 🛠️ 备用方案

如果问题仍然存在，可以考虑：

### 方案A：使用Hugo Modules
```bash
hugo mod init github.com/harryd97/harryd97.github.io
hugo mod get github.com/adityatelange/hugo-PaperMod
```

### 方案B：在GitHub Actions中下载主题
在workflow中添加主题下载步骤：
```yaml
- name: Download theme
  run: |
    git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod
    rm -rf themes/PaperMod/.git
```

## 📚 相关文档

- [Hugo Themes Installation](https://gohugo.io/hugo-modules/use-modules/)
- [GitHub Actions Checkout](https://github.com/actions/checkout)
- [PaperMod Theme Docs](https://github.com/adityatelange/hugo-PaperMod)