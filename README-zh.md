# EasyHomePage

[English](./README.md) | **简体中文**

EasyHomePage 是一个用 Markdown 和图片驱动的现代个人主页模板。

无需编写复杂前端代码，只需编辑 `site/` 目录中的 Markdown 文件与图片，即可快速生成极具设计感、响应式且开箱即用的静态个人主页。

---

## 核心设计与目录结构

所有与你个人相关的内容均存放在 `site/` 目录下：

```text
site/
  config.md            # 全站全局配置（品牌、主题、支持的语言、社交链接、统计等）
  assets/              # 公共静态资源（头像、Logo、产品截图等共享存放）
  en/                  # 英文语言目录（目录名对应语言代码）
    locale.md          # 英文专属配置（网站标题、描述、导航标签文本）
    sections/          # 英文区块内容（介绍、故事、技能、经历、产品、作品、服务、联系）
  zh-CN/               # 中文语言目录
    locale.md          # 中文专属配置
    sections/          # 中文区块内容
```

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

## 单语言与多语言部署

系统最多支持 **2 种语言**（可以是世界上任意两种语言），并完美支持单语言直接部署：

### 1. 单语言部署（仅需一个语言版本）
如果你只需要单语言主页（如纯中文或纯英文）：
1. 在 `site/config.md` 的 `languages` 中仅声明该语言（例如只保留 `zh-CN` 或 `en`）；
2. 在 `site/` 目录下只保留对应的语言子目录（如仅保留 `site/zh-CN/`，删除其他语言目录）；
3. **系统自动以单语言模式运行，并在桌面顶栏和移动端抽屉中完全隐藏语言切换开关**。

### 2. 双语言部署（多语言模式）
1. 在 `site/config.md` 的 `languages` 中配置 2 种语言，并可指定 `default: true` 作为默认兜底语言；
2. 在 `site/` 下保留对应的两个语言子目录（如 `en/` 和 `zh-CN/`，或者 `ja/` 与 `en/` 等任意组合）；
3. 访客初次进入时，系统会优先根据其浏览器首选语言自动呈现对应版本（无匹配则 fallback 到默认语言）；
4. 页面顶部与手机端抽屉提供轻巧的切换开关（如 `EN | 中`），切换时全站无刷新热更新并持久化记住偏好。

---

## 个性化配置

### 1. 全局配置 (`site/config.md`)

集中管理跨语言的全站通用设置，修改一处全站生效：

- **品牌资产 (`brand`)**：`name`、`logo`、`avatar`、`favicon`。
- **主题配色 (`theme`)**：预设可选 `graphite` (石墨灰)、`violet` (紫罗兰)、`ocean` (深海蓝)、`forest` (森林绿)、`rose` (玫瑰粉)。暗黑模式会自动跟随系统自适应切换。
- **语言列表 (`languages`)**：声明支持的语言代码（`code`）、显示全称（`name`）、缩写（`short`）及默认语言（`default: true`）。最多支持 2 种语言。
- **社交网络 (`socialLinks`)**：配置个人主页链接（支持 `github`、`twitter`/`x`、`linkedin`、`instagram`、`envelope`、`rss`、`wikipedia` 等图标）。
- **网站分析 (`analytics`)**：配置 GA4 Measurement ID (`G-...`)。

### 2. 本地化元数据与导航 (`site/{lang}/locale.md`)

配置对应语言下的文案与导航标签：

- **站点文案 (`site`)**：`title`（网页标题）、`description`（SEO 描述）、`loadingTitle` / `loadingDescription`（首屏加载文案）。
- **导航管理 (`navigation.items`)**：配置各区块在导航栏显示的标签文案（`label`），调整数组顺序可同时改变导航栏与首页区块的排列顺序；将某项设为 `enabled: false` 即可隐藏该区块。

### 3. 区块正文编辑 (`site/{lang}/sections/*.md`)

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
