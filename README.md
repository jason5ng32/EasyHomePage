# EasyHomePage

EasyHomePage 是一个用 Markdown 和图片驱动的个人主页模板。

你不需要改 Vue 组件，也不需要理解前端工程。大多数情况下，只要修改 `site` 目录里的配置、文案和图片，就可以生成自己的主页。

## 适合谁

- 想做一个个人主页，但不想从零写网页的人。
- 想把经历、作品、服务、联系方式整理成一个静态网页的人。
- 希望直接部署到 GitHub Pages，不想自己维护服务器的人。

## 先看这里

这个项目里最重要的是 `site` 目录：

```text
site/
  config.md              全站配置
  sections/              首页各区域内容
  assets/                图片资源
```

通常你只需要改这三个地方：

- `site/config.md`：网站标题、导航、主题、头像、Logo、社交链接。
- `site/sections/*.md`：每个页面区域的具体内容。
- `site/assets/`：头像、Logo、产品截图等图片。

`src` 目录是页面程序代码。除非你想改页面结构或样式，否则不用碰。

## 快速修改自己的主页

### 1. 修改网站基础信息

打开 `site/config.md`，先改最上面的 `site` 和 `brand`：

```yaml
site:
  title: '你的名字的个人主页'
  description: '一句话介绍这个网站'
  language: 'zh-CN'

brand:
  name: '你的名字'
  logo: 'assets/logo.png'
  avatar: 'assets/memoji.png'
  favicon: 'favicon.ico'
```

字段说明：

- `title`：浏览器标题，也会用于搜索引擎。
- `description`：网站描述。
- `language`：页面语言，中文一般用 `zh-CN`，英文一般用 `en-US`。
- `brand.name`：导航栏里显示的名字。
- `brand.logo`：导航栏 Logo 图片。
- `brand.avatar`：首页右侧人物图。
- `brand.favicon`：浏览器标签页小图标。

图片路径是相对于 `site` 目录写的。比如 `assets/logo.png` 对应的是 `site/assets/logo.png`。

### 2. 替换头像和图片

把你的图片放到 `site/assets/` 里，然后在配置里写图片路径。

例如你放了一张头像：

```text
site/assets/me.png
```

就可以这样配置：

```yaml
brand:
  avatar: 'assets/me.png'
```

产品截图建议放在：

```text
site/assets/products/
```

然后在 `site/sections/products.md` 里写文件名：

```yaml
cover: 'my-product.jpg'
```

### 3. 开关和调整导航顺序

导航也在 `site/config.md`：

```yaml
navigation:
  items:
    - id: 'Introduce'
      label: '简介'
      enabled: true
    - id: 'Stories'
      label: '故事'
      enabled: true
```

字段说明：

- `id`：对应页面区域，不建议随便改名字。
- `label`：导航栏显示的文字，可以随便改。
- `enabled`：是否显示这个区域。

如果你不想显示某个区域，把它改成：

```yaml
enabled: false
```

如果你想调整页面顺序，直接调整 `items` 里的顺序即可。页面主体和导航会一起变化。

可用的 `id` 有：

- `Introduce`：首页介绍
- `Stories`：故事/他人视角
- `Skills`：技能
- `Jobs`：经历
- `Products`：代表产品
- `Works`：作品
- `Services`：服务
- `Footer`：联系

## 修改每个区域

所有页面区域都在 `site/sections/` 里。

```text
site/sections/
  introduce.md
  stories.md
  skills.md
  jobs.md
  products.md
  works.md
  services.md
  footer.md
```

每个文件顶部都有一段被 `---` 包起来的配置，这叫 frontmatter。你只需要照着现有格式改。

例如：

```md
---
badge: '代表产品'
title: '创·造'
openLabel: '打开产品'
---
```

`---` 下面的普通文字就是 Markdown 正文。

### 首页介绍：`introduce.md`

这里负责第一屏。

常用字段：

- `name`：大标题，通常是你的名字。
- `subtitle`：副标题。
- `heroStatValue`：右侧小卡片的大数字。
- `heroStatLabel`：右侧小卡片说明。
- `heroCallout`：右侧强调语。

下面的正文可以直接写段落和列表：

```md
欢迎来到我的主页。

在开始之前，请了解本页面：

* 可以在办公室查看
* 可以在路上查看
```

### 故事：`stories.md`

适合写别人眼中的你、个人故事、评价片段。

```yaml
items:
  - content: |
      这是第一段故事。

      可以写多段文字。

    tags:
      - 产品
      - 创业
```

`tags` 可以不写。

### 技能：`skills.md`

适合展示能力、方向、特长。

```yaml
items:
  - title: '产品策略'
    icon: 'layout'
    level: 95
    content: |
      这里写这项能力的说明。
```

常用字段：

- `title`：技能名称。
- `icon`：图标，目前常用 `layout`、`chart`、`store`、`users`。
- `level`：百分比数字。
- `content`：说明文字。

### 经历：`jobs.md`

适合写工作经历、项目经历、组织经历。

```yaml
items:
  - date: '2023-11-01'
    title: '创始人'
    company: 'One Man Company'
    range: '2023 -'
    url: 'https://example.com/'
    content: |
      这里写经历介绍。

      - 可以写列表
      - 可以写成果
```

`date` 用来排序，越新的越靠前。

### 产品：`products.md`

适合展示你做过的产品、业务、重点项目。

```yaml
items:
  - date: '2026'
    title: 'My Product'
    cover: 'my-product.jpg'
    url: 'https://example.com/'
    tags:
      - SaaS
      - AI
    content: |
      这里写产品介绍。
```

注意：

- `cover` 写的是 `site/assets/products/` 里的图片文件名。
- 第一条产品会被当作重点产品展示。
- `date` 用来排序，年份越新越靠前。

### 作品：`works.md`

适合放开源项目、小工具、文章合集、独立作品。

```yaml
items:
  - date: '2024-05'
    title: 'My Work'
    url: 'https://github.com/your/project'
    tags:
      - Vue
      - Tool
    content: |
      这里写作品说明。
```

### 服务：`services.md`

适合写你提供的服务、合作方式、咨询项目。

```yaml
items:
  - title: '产品咨询'
    subtitle: '提供产品方向和策略建议'
    price: '99 USD'
    featured: true
    includes:
      - 产品策略建议
      - 体验评估
    excludes:
      - 不包含长期驻场
```

说明：

- `price` 为空时，页面不会显示按钮。
- `featured: true` 会让这张卡片更突出。
- `includes` 是包含内容。
- `excludes` 是不包含内容。

### 联系：`footer.md`

这里控制页面底部联系区域的文案。

社交链接不在这里改，而是在 `site/config.md` 的 `socialLinks` 里改。

## 修改社交链接

在 `site/config.md` 里修改：

```yaml
socialLinks:
  - name: 'GitHub'
    icon: 'github'
    url: 'https://github.com/your-name'
  - name: 'Email'
    icon: 'envelope'
    url: 'mailto:you@example.com'
```

常用图标：

- `github`
- `twitter`
- `linkedin`
- `envelope`
- `instagram`
- `rss`
- `wikipedia`

如果图标名写错，会显示默认图标。

## 修改主题颜色

内置主题在 `site/config.md` 里选择：

```yaml
theme:
  preset: 'graphite'
```

可选主题：

- `graphite`
- `violet`
- `ocean`
- `forest`
- `rose`

如果你只是想改一两个颜色，可以使用 `customTokens`：

```yaml
theme:
  preset: 'graphite'
  customTokens:
    primary: '#111111'
    accent: '#b6ff55'
  customDarkTokens:
    accent: '#d4ff7a'
```

常用颜色 token：

- `background`：页面背景
- `foreground`：主要文字
- `primary`：主要颜色
- `primaryForeground`：主要颜色上的文字
- `accent`：强调色
- `accentForeground`：强调色上的文字
- `card`：卡片背景
- `border`：边框
- `hero`：首页背景
- `panel`：深色区域背景

暗黑模式会自动跟随系统设置，不需要手动开关。

## 写 Markdown 时要注意

这个项目使用 YAML + Markdown。最容易出错的是缩进。

建议遵守这几条：

- 冒号后面要有空格：`title: '我的标题'`
- 列表用 `-` 开头，并保持缩进一致。
- 多行文字用 `|`，下一行开始缩进两个空格。
- 文件名尽量使用英文、数字和 `-`，比如 `my-product.jpg`。
- 不确定怎么写时，复制现有的一段再改内容。

多行文字例子：

```yaml
content: |
  第一段文字。

  第二段文字。

  - 一个列表
  - 另一个列表
```

如果内容格式写错，开发环境的浏览器控制台会出现 `[EasyHomePage content]` 开头的提示。

## 本地预览

如果你会使用命令行，可以在本地预览。

第一次运行：

```bash
npm install
```

启动预览：

```bash
npm run dev
```

然后打开终端里显示的网址，通常是：

```text
http://localhost:18772
```

构建正式版本：

```bash
npm run build
```

构建产物会生成在 `docs` 目录。

## 部署到 GitHub Pages

一种常见方式：

1. Fork 或复制这个项目到你的 GitHub。
2. 修改 `site` 目录里的内容。
3. 在 GitHub 仓库设置里打开 Pages。
4. 让 GitHub Pages 使用 `gh-pages` 分支，或者按项目里的 GitHub Actions 自动部署。
5. 推送到 `main` 后，等待 Actions 运行完成。
6. 打开你的 GitHub Pages 地址。

如果你只想先试试看，也可以先在本地运行，不急着部署。

## 常见问题

### 我只想删掉某个区域，怎么做？

在 `site/config.md` 里找到对应导航项，把 `enabled` 改成 `false`。

```yaml
- id: 'Services'
  label: '服务'
  enabled: false
```

### 我删空了某个列表，会不会报错？

不会。页面会显示一个空状态提示。提示文案可以在 `site/config.md` 里修改：

```yaml
site:
  emptyStateTitle: '暂时没有内容'
  emptyStateDescription: '在对应的 Markdown 文件里添加 items 后，这里会自动显示。'
```

### 我想做英文网站，需要改程序吗？

不需要。把 `site/config.md` 和 `site/sections/` 里的文案改成英文，并把语言改成：

```yaml
site:
  language: 'en-US'
```

### 我想修改布局和样式怎么办？

内容配置改 `site`。如果你想改页面结构、动效、组件样式，再修改 `src` 目录。

主要样式在：

```text
src/style.css
```

页面组件在：

```text
src/components/
```
