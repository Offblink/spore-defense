# Spore 手机端 · 系统详细设计

信息系统作业 10 的小组答辩演示稿，共 27 页。内容是自己做的手机截图搜题 App Spore 的详细设计：BCE 抽取、PIM 类图、接口契约、E-R 与数据表、UI 原型，以及 AI 使用说明。

用 [open-slide](https://www.npmjs.com/package/@open-slide/core) 写：每页是一个 React 组件，画布固定 1920 × 1080。

## 讲什么

| 部分 | 讲者 | 页码 | 内容 |
| --- | --- | --- | --- |
| 分工 | 全员 | 03 | 四棒接力与交接句 |
| 01 需求与 BCE 抽取 | 成员 A | 04–10 | 系统边界、三类对象、九步协作 |
| 02 PIM 与接口 | 成员 B | 11–15 | 类图、四条约束、三层接口、一次同步 |
| 03 数据库设计 | 成员 C | 16–20 | E-R、关系模式、两张主表与六张支撑表 |
| 04 UI 与收尾 | 成员 D | 21–27 | 两张原型、六条原则、AI 说明、修改记录、致谢 |

讲稿在同文件 `notes` 导出里，按下标与页面一一对应。

## 跑起来

```bash
pnpm install
pnpm dev      # 开发服务器，改稿热更新
pnpm build    # 静态产物输出到 dist/
pnpm preview  # 预览构建产物
```

打开后：方向键 / PageUp / PageDown 翻页，`F` 进入全屏演示。

## 文件

| 路径 | 说明 |
| --- | --- |
| `slides/spore-system-design/index.tsx` | 全部 27 页与讲稿 |
| `slides/spore-system-design/assets/` | 演示视频、封面图、三端仓库二维码 |
| `spec.md` | 逐页设计说明，附录含数据表 DDL |
| `netlify.toml` / `vercel.json` | 静态部署配置 |

改稿只动 `index.tsx`：页面用 1920 × 1080 绝对像素排版，不新增依赖，不拆组件文件。

## 三端仓库

| 端 | 仓库 |
| --- | --- |
| Android 客户端 | https://github.com/Offblink/Spore-Mobile |
| MV3 扩展 | https://github.com/Offblink/Spore |
| 桌面端 | https://github.com/Offblink/Spore-GUI |
