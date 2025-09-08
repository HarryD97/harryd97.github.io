# GitHub Pages 部署指南

## 📋 部署步骤

### 1. GitHub 仓库设置

确保你的仓库名为 `harryd97.github.io`（你的GitHub用户名.github.io）

### 2. 启用 GitHub Pages 和 Actions

1. 进入GitHub仓库设置页面
2. 点击左侧的 **Pages**
3. 在 **Source** 中选择 **GitHub Actions**
4. 保存设置

### 3. 推送代码

```bash
# 提交所有更改
git add .
git commit -m "Add Hugo site with PaperMod theme and GitHub Actions"
git push origin main
```

### 4. 自动部署

- 推送后，GitHub Actions会自动开始构建
- 可以在 **Actions** 标签页查看构建状态
- 构建完成后，网站将在 `https://harryd97.github.io` 可用

## 🔄 工作流程说明

我们的 `.github/workflows/hugo.yml` 工作流会：

1. **触发条件**:
   - 推送到 `main` 分支时自动运行
   - 可以手动从 Actions 页面触发

2. **构建过程**:
   - 设置最新的 Hugo 环境
   - 使用 PaperMod 主题构建站点
   - 启用压缩和清理功能

3. **部署过程**:
   - 将构建的 `public/` 目录部署到 GitHub Pages
   - 自动更新网站内容

## 🛠️ 本地开发流程

```bash
# 开发阶段
./serve.sh                    # 启动本地服务器
# 修改内容...

# 部署阶段  
git add .
git commit -m "Update content"
git push origin main          # 触发自动部署
```

## 🚨 常见问题

### 问题1：Actions 权限错误
**解决**: 在仓库设置 → Actions → General → Workflow permissions 中选择 "Read and write permissions"

### 问题2：Pages 没有启用
**解决**: 确保在仓库设置 → Pages 中选择 "GitHub Actions" 作为源

### 问题3：主题文件丢失  
**解决**: 确保主题目录 `themes/PaperMod` 存在且包含所有文件

### 问题4：baseURL 配置错误
**解决**: 确认 `hugo.toml` 中的 `baseURL = 'https://harryd97.github.io/'`

## 📊 监控部署

### GitHub Actions 状态
- 绿色 ✅: 部署成功
- 红色 ❌: 部署失败，查看日志修复问题
- 黄色 🟡: 部署进行中

### 部署时间
- 通常需要 2-5 分钟完成构建和部署
- 第一次部署可能需要更长时间

## 🎯 优化建议

### 1. 缓存优化
工作流已包含 Hugo 缓存设置，加速后续构建

### 2. 分支保护
可以设置 `main` 分支保护，要求 Actions 成功后才能合并

### 3. 自定义域名
如有自定义域名，在仓库设置 → Pages 中配置

### 4. 环境变量
可在仓库设置 → Secrets 中添加敏感配置（如 Analytics ID）

## 🔍 调试技巧

### 查看构建日志
1. 进入仓库 **Actions** 标签页
2. 点击失败的工作流运行
3. 查看详细错误信息

### 常见错误类型
- **Hugo 版本不匹配**: 更新工作流中的 HUGO_VERSION
- **主题路径错误**: 检查 themes 目录结构
- **配置文件语法**: 验证 hugo.toml 语法

## 📝 部署检查清单

- [ ] 仓库名正确 (username.github.io)
- [ ] Pages 设置为 GitHub Actions
- [ ] 工作流文件存在 (.github/workflows/hugo.yml)
- [ ] 主题文件完整 (themes/PaperMod/)
- [ ] 配置文件正确 (hugo.toml)
- [ ] 删除旧的 Jekyll 文件
- [ ] 推送到 main 分支

完成以上步骤后，你的 Hugo 双语博客就会自动部署到 GitHub Pages！