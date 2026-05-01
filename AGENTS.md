# AGENTS.md

> **维护规则**：≤ 80 行；只写 EasyHomePage 专属约定，不重复全局 Profile / 红线 / 蓝线 / 灰线；`<待补充>` 表示暂未确认，应通过读代码、查 [local-context.md](./local-context.md) 或问用户来获取；每条 Never 配一条 Do；末尾 [local-context.md](./local-context.md) 指向必须保留。

### 项目定位

EasyHomePage 是一个 Markdown + 图片驱动的个人主页模板，让非技术用户通过编辑 `site/` 内容快速生成现代、可部署的静态个人主页。

### 技术栈

Vue 3.5 + Vite 8 + JavaScript + Pinia 3；Tailwind CSS 4 + shadcn-vue 风格本地组件；内容层使用 `vite-plugin-markdown`、YAML frontmatter、`markdown-it`；图标用 `lucide-vue-next`，Drawer 用 `vaul-vue`，Toast 用 `vue-sonner`。

### 常用命令

- 装依赖：`npm install`
- 启动 dev：`npm run dev`
- 跑测试：`<待补充：当前没有正式测试套件>`
- Lint / Type check：`<待补充：当前没有 lint/typecheck 脚本>`
- 构建：`npm run build`（Vite 8 需要 Node 20.19+ / 22.12+；本机可用 Node 24）

### 项目特定的陷阱与领域词汇

- Never：不要把渲染结果做成 EasyHomePage 的产品说明页。Do：页面首先是用户自己的个人主页，模板说明放 README。
- Never：不要在 Vue 组件里硬编码个人事实或 section 文案。Do：优先放进 `site/config.md` 或 `site/sections/*.md`。
- Never：不要在 section 组件里直接 import Markdown。Do：通过 `@/content/site` 和 `@/content/sections` 读取归一化数据。
- Never：不要新增无意义字段增加用户填写负担。Do：能用数组顺序表达的内容就不要额外加 `order`。
- Never：不要散落 `bg-white/10`、`border-white/15`、裸 `rgb(...)`。Do：使用或扩展 `src/style.css` 的语义化 token。
- Never：不要添加手动暗黑模式切换。Do：暗黑模式只跟随系统。
- Never：不要默认增加 `sm:`、`lg:`、`xl:` 多断点。Do：默认移动端样式 + `md:`，除非有明确布局理由。
- Never：不要把所有区块做成同一种卡片。Do：Stories、Skills、Jobs、Products、Works、Services 应有各自视觉角色。
- Never：不要把 `docs/` 当源码维护。Do：把它视为 `npm run build` 的构建产物。
- Never：不要把 workflow 改回依赖 lockfile 的 `npm ci`。Do：保持用户偏好的 `npm install` 流程，除非用户改变决定。
- Never：不要继续依赖 UA 统计代码。Do：Google Analytics 使用 GA4 Measurement ID（`G-...`）。
- Never：不要只看运行时 metadata。Do：title、description、favicon、loading 文案、统计代码也要考虑 Vite 构建期 HTML 注入。
- Never：不要主动实现完整运行时 i18n。Do：保留单语言内容模式，让用户通过 Markdown/config 自行选择语言。

### Git / PR 约定

- `dev` 是用户自己的集成分支；AI 不应占用、重建或长期停留在 `dev` 上。
- 需要开发时，从用户的 `dev` 同步，再使用独立分支或独立 worktree。
- 实现类改动交付前至少运行 `npm run build`；纯文档改动可不构建。
- 内容结构、主题配置、部署流程、统计配置变化时，同步评估是否更新 README。

---

如果工作区根存在 [local-context.md](./local-context.md)，请一并读取和使用——里面是本项目对应的 Knowledge Hub 资源链接（仅本机生效，不进 git）。
