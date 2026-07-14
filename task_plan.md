# 静态原型与原型评审实施计划

## Goal

基于 `docs/05-页面卡与UI规范.md` 交付 9 页 Bootstrap 静态原型的 static-v1 与审计修正版 static-v2，并完成说明文档、评审清单、响应式浏览器验收和 Git 节点提交。

## Current Phase

Phase 20 (complete)

## Phases

### Phase 1: 需求与资源盘点
- [x] 读取页面卡与 UI 规范
- [x] 确认已有审计要求
- [x] 盘点仓库和可用前端/浏览器资源
- **Status:** complete

### Phase 2: 原型结构与共享资产
- [x] 固定 9 页文件名、共享假数据和跳转关系
- [x] 建立 Bootstrap 与自定义样式/脚本方案
- [x] 固定 390x844 与 1366x768 验收画布
- **Status:** complete

### Phase 3: static-v1 实现
- [x] 完成 5 个用户端页面
- [x] 完成 4 个管理端页面
- [x] 检查相对链接、成功/空/异常状态
- **Status:** complete

### Phase 4: static-v2 与文档
- [x] 根据审计意见补齐统一数据、可访问性和稳定画布
- [x] 完成 static-v2 九页
- [x] 完成原型说明与评审清单
- **Status:** complete

### Phase 5: 浏览器视觉验收
- [x] 启动本地服务
- [x] 手机/桌面截图检查
- [x] 检查无溢出、无重叠、组件和跳转有效
- [x] 修复发现的问题并复测
- **Status:** complete

### Phase 6: 交付与提交
- [x] 核对输出清单和工作区范围
- [x] 提交 Git 节点
- [x] 提供本地访问地址与结果摘要
- **Status:** complete

### Phase 7: 开发准备范围与仓库核对
- [x] 读取系统设计、数据库设计和关键链路详细设计
- [x] 提取固定页面、主链路、开发顺序和里程碑线索
- [x] 确认现有 Git 根目录、远端和相邻项目风险
- **Status:** complete

### Phase 8: README 与 Sprint 文档
- [x] 完成 README 初稿
- [x] 完成开发准备与 Sprint 0 文档
- [x] 完成任务板与迭代记录
- [x] 增加项目级 .gitignore
- **Status:** complete

### Phase 9: 一致性与格式检查
- [x] 检查当前已存在/后续待生成表述
- [x] 检查 Sprint 0 任务覆盖和 Sprint 1-4 多轮口径
- [x] 检查任务卡字段、里程碑和前序范围
- **Status:** complete

### Phase 10: Git 节点提交
- [x] 精确暂存本阶段产物
- [x] 检查暂存范围并创建节点提交
- **Status:** complete

### Phase 11: 远端推送
- [x] 建立 main 分支并设置上游
- [x] 推送到 GitHub
- [x] 验证远端提交
- **Status:** complete

### Phase 12: 总审计证据提取
- [x] 读取 12 份输入材料并提取范围、页面、数据、实现、验收基线
- [x] 建立跨文档术语与状态对照表
- [x] 核对任务板和 Git 现状
- **Status:** complete

### Phase 13: 冲突分级与修订决策
- [x] 为每个问题分配编号和 P0/P1/建议级别
- [x] 判定是否可在不改变范围的前提下直接修正
- [x] 确定主修订文档和联动修订文档
- **Status:** complete

### Phase 14: 联动修订与总审计报告
- [x] 回改所有可直接修正的源文档
- [x] 更新项目任务板的阻塞项、修订项和清零状态
- [x] 输出 docs/11-开发前一致性总审计.md
- **Status:** complete

### Phase 15: 一致性复核
- [x] 复查五类一致性和所有问题状态
- [x] 验证 9 页、实体、状态、路由、统计与任务卡映射
- [x] 检查格式、链接和工作区修改范围
- **Status:** complete

### Phase 16: Git 节点提交与远端验证
- [x] 精确暂存本轮审计及修订文件
- [x] 创建重要节点提交并推送 main
- [x] 验证远端提交和文件清单
- **Status:** complete

### Phase 17: 11b 覆盖与门禁核验
- [x] 读取 docs/11、任务板和 11a 修订清单
- [x] 核对 01-10、README、任务板覆盖范围
- [x] 核对范围、页面、数据、实现、验收五类检查证据
- **Status:** complete

### Phase 18: 修订落点与分级复核
- [x] 逐项核对 CONS-01 至 CONS-21 的源文档结果
- [x] 复核 P0/P1 分级和任务板清零状态
- [x] 判断 Go / No-Go 与剩余未修项是否合理
- **Status:** complete

### Phase 19: 复核报告与校验
- [x] 输出 docs/11-开发前一致性总审计-复核.md
- [x] 检查 A-E 格式、问题证据和门禁结论
- [x] 确认未修改 11a 报告、任务板和源文档
- **Status:** complete

### Phase 20: Git 提交与远端验证
- [x] 仅暂存 11b 复核报告
- [x] 创建节点提交并推送 main
- [x] 验证远端文件和提交号
- **Status:** complete

## Key Questions

1. Bootstrap 是否可使用本地资源，避免截图验收依赖外网？
2. 如何让 static-v1 与 static-v2 都覆盖 9 页，同时避免重复维护造成内容漂移？
3. 如何在纯静态页面中表现成功、空、异常状态而不实现真实业务逻辑？

## Decisions Made

| Decision | Rationale |
| --- | --- |
| static-v1 与 static-v2 均保留完整 9 页 | 满足固定输出和已有审计意见要求 |
| static-v2 作为推荐评审版本 | 承载统一样例数据、可访问性和画布修正 |
| 页面只使用静态假数据与 Bootstrap 交互组件 | 遵守不接数据库、不实现真实业务逻辑的边界 |
| 复制本地 Bootstrap 5.1.0 到各版本 assets | 断网可渲染，截图不依赖 CDN |
| 不额外引入图标框架 | 本地无 Bootstrap Icons，使用文字按钮和少量熟悉符号控制范围 |
| 以 docs/04 起的 5+4 页面和 docs/09 工程路由为最终基线 | 后序文档已有完整页面、路由、实现和验收证据，修正早期分组不改变功能范围 |
| 所有 P0 在本轮直接清零 | P0 均为明确的文档职责/字段/任务板冲突，无需人工拍板 |
| 仓库根 README 入口作为唯一未直接修正 P1 | 该文件不在本轮允许回改源文档列表内，且不阻塞业务代码开工 |

## Errors Encountered

| Error | Attempt | Resolution |
| --- | --- | --- |
| `rg.exe` 在 Codex WindowsApps 路径被拒绝访问 | 1 | 改用 PowerShell `Get-ChildItem` 和 `Select-String`，不重复调用该二进制 |
| Playwright 找不到 `playwright-core` | 1 | 查找 pnpm 隔离目录并将实际模块路径加入 `NODE_PATH` 后重试 |
| 计划日志补丁上下文不匹配 | 1 | 读取实际段落后以精确上下文重新应用 |
| fullPage 截图不适合固定导航验收 | 1 | 改为精确视口截图 |
| 趋势柱没有形成高度差 | 1 | 设置固定柱容器高度后复测 |
| 第二次组合补丁上下文不匹配 | 1 | 将 QA 修复与日志更新拆分处理 |
| 组件截图发生在过渡中段 | 1 | 等待 Bootstrap 过渡结束后再截图 |
| 开发准备组合补丁上下文不匹配 | 1 | 读取三个文件末尾后拆分使用精确上下文 |
| 大型开发准备补丁被自动审查容量限制拒绝 | 2 | 改为按单文件和单 Sprint 章节分段应用补丁 |
| 首次推送 main 被远端非快进拒绝 | 1 | fetch 远端独立 main，保留远端 README 后合并无共同祖先历史，再正常快进推送 |
| docs/03 总审计大型补丁上下文未命中 | 1 | 文件未部分修改；改为按页面清单、流程、验收分段读取并修订 |
| docs/07 组合修订补丁上下文未命中 | 1 | 文件未部分修改；按目录、分层、页面映射、主链路拆分修订 |
| 计划日志组合补丁上下文未命中 | 1 | 读取 progress/findings 尾部后使用精确上下文补记 |
| Markdown 链接检查无法处理根层文件的空父路径 | 1 | 根层文件基准显式设为 `.` 后重跑 |
| 计划状态补丁 hunk 格式无效 | 1 | 拆分 task_plan 与 progress 补丁并使用完整 hunk |
