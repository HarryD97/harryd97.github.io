# 网站流量统计设置指南

## Google Analytics 4 (推荐)

### 设置步骤：

1. **注册Google Analytics**
   - 访问 [Google Analytics](https://analytics.google.com/)
   - 创建新的GA4属性
   - 获取你的测量ID（格式：G-XXXXXXXXXX）

2. **在Hugo配置中启用**
   - 打开 `hugo.toml` 文件
   - 取消注释并替换以下行：
   ```toml
   googleAnalytics = "G-XXXXXXXXXX"  # 替换为你的真实ID
   ```

3. **高级配置**（可选）
   ```toml
   [services.googleAnalytics]
     id = "G-XXXXXXXXXX"
     anonymizeIP = true
     respectDoNotTrack = true
   ```

## 其他流量统计选项

### 1. Cloudflare Analytics (免费)
- 如果使用Cloudflare CDN，可以启用免费的Web Analytics
- 在PaperMod主题中添加自定义脚本

### 2. Microsoft Clarity (免费)
- 提供热图和用户行为分析
- 添加跟踪代码到主题

### 3. 百度统计 (中文市场推荐)
- 对中文搜索引擎优化更友好
- 适合主要面向中文用户的网站

## PaperMod主题特定功能

PaperMod主题支持的分析功能：

- ✅ Google Analytics 4
- ✅ 自定义JavaScript跟踪代码
- ✅ 尊重"禁止跟踪"设置
- ✅ Cookie同意横幅（需额外配置）

## 隐私配置

在`hugo.toml`中添加隐私设置：

```toml
[privacy]
  [privacy.googleAnalytics]
    anonymizeIP = true
    respectDoNotTrack = true
    useSessionStorage = false
  [privacy.youtube]
    privacyEnhanced = true
```

## 实时统计显示

如果想在网站上显示访问统计，可以考虑：

1. **不蒜子统计** - 简单的访问量显示
2. **Google Analytics嵌入式报告** - 需要配置
3. **自定义统计API** - 更高级的需求

## 使用建议

1. **新网站**: 推荐Google Analytics 4
2. **隐私敏感**: 考虑使用Cloudflare Analytics
3. **中文网站**: 同时使用Google Analytics和百度统计
4. **技术博客**: 可以添加GitHub统计展示

## 常见问题

**Q: 为什么看不到数据？**
A: Google Analytics需要24-48小时才能显示数据

**Q: 如何验证是否正确安装？**
A: 使用浏览器开发者工具检查是否有GA请求发出

**Q: 是否需要Cookie横幅？**
A: 根据地区法律要求，欧盟用户需要Cookie同意