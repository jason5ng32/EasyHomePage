# EasyHomePage

[English](./README.md) | **简体中文**

EasyHomePage 是一个用 Markdown 和图片驱动的现代个人主页模板。

无需编写复杂前端代码，只需编辑 `site/` 目录中的 Markdown 文件与图片，即可快速生成极具设计感、响应式且开箱即用的静态个人主页。

---

## 核心设计与目录结构

所有与你个人相关的内容均存放在 `site/` 目录下：

```text
site/
  assets/              # 公共静态资源（头像、Logo、产品截图等共享存放）
  en/                  # 英文内容（默认与兜底语言）
    config.md          # 站点信息、品牌、主题、导航、社交链接
    sections/          # 各区块内容（自我介绍、故事、技能、经历、产品、作品、服务、联系）
  zh-CN/               # 中文内容
    config.md
    sections/
```

> **向下兼容说明**：如果你只需要单语言主页，也可以直接使用根目录模式（保留 `site/config.md` 和 `site/sections/*.md`），系统会自动以单语言运行并隐藏切换器。

---

## 快速上手

本项目使用 [pnpm](https://pnpm.io/) 作为包管理器。

```bash
# 1. 安装依赖
pnpm install

# 2. 启动本地实时预览
pnpm run dev

# 3. 构建生产静态页面（产物位于 docs/）
pnpm run build
```

启动后在浏览器打开终端提示的地址（通常为 `http://localhost:18772`）即可实时预览修改。

---

## 个性化配置

### 1. 基础信息与导航 (`site/{lang}/config.md`)

在 `config.md` 中配置站点元数据、品牌、导航项及社交网络：

- **基础与品牌**：`site.title`、`site.description`、`brand.name`、`brand.avatar`、`brand.logo` 等。
- **导航管理**：通过调整 `navigation.items` 的数组顺序即可同时改变导航栏与页面区块的排列顺序；将某个项的 `enabled` 设为 `false` 即可关闭对应区块。
- **社交链接**：在 `socialLinks` 中配置个人社交主页（支持 `github`、`twitter`/`x`、`linkedin`、`instagram`、`envelope`、`rss`、`wikipedia` 等图标）。

### 2. 区块内容编辑 (`site/{lang}/sections/*.md`)

每个区块对应一个独立 Markdown 文件，顶部通过 YAML frontmatter 配置属性，正文支持标准 Markdown 语法：

| 区块文件 | 作用说明 | 关键配置与内容 |
| :--- | :--- | :--- |
| `introduce.md` | 首屏核心自我介绍 | 名字、标语（subtitle）、核心统计数据（heroStat） |
| `stories.md` | 第三人称视角个人故事 | 叙事短文列表及关键词标签 |
| `skills.md` | 技能与专业能力卡片 | 能力项、熟练度（level 0-100）、图标 |
| `jobs.md` | 工作履历与职业历程 | 公司、职位、时间跨度、职责成就列表（支持首行对齐的 bullet） |
| `products.md` | 代表产品与核心项目 | 产品截图、项目链接、发布年份、详细介绍 |
| `works.md` | 开源项目与小品集 | 项目链接、技术栈标签、简介 |
| `services.md` | 咨询与外部合作服务 | 价格、服务说明、包含与不包含事项 |
| `footer.md` | 页脚联系方式引导 | 结尾寄语与联络说明 |

### 3. 主题与颜色

在 `config.md` 中选择内置主题预设：

```yaml
theme:
  preset: 'graphite' # 可选：graphite (石墨灰), violet (紫罗兰), ocean (深海蓝), forest (森林绿), rose (玫瑰粉)
```

暗黑模式会自动跟随访客操作系统偏好自适应切换。

---

## 多语言（i18n）机制

1. **自动感知**：系统使用 `site/{lang}/` 目录结构，在 `site/` 下新建一个语言文件夹（如 `site/ja/`）即可被前端自动发现，**零代码改动**。
2. **智能检测与 Fallback**：访客进入时自动根据其浏览器首选语言展示对应版本；若无匹配则统一 Fallback 至英文（`en`）。
3. **无刷新热切换**：桌面端顶栏右侧及移动端抽屉右上角均提供小巧的语言切换开关（`EN | 中`），切换时全站响应式热更新并持久化记忆至 `localStorage`。

---

## 部署到 GitHub Pages

1. 将仓库推送到你的 GitHub。
2. 在 GitHub 仓库设置进入 **Settings -> Pages**。
3. **Build and deployment -> Source** 选择 **GitHub Actions**（仓库已内置自动构建部署工作流），或者将 Source 选为 **Deploy from a branch** 并选择 `gh-pages` 分支。
4. 推送代码至 `main` 分支后，GitHub Actions 会自动编译并发布。

---

## 常见问题

- **某区块内容清空后会怎样？** 页面会优雅呈现空状态提示卡片，不会崩溃或显示错乱。
- **自定义样式或组件结构？** 页面组件位于 `src/components/`，全局样式 token 与工具类位于 `src/style.css`。
