# 静态原型任务发现与决策

## Requirements

- 输入：`docs/05-页面卡与UI规范.md`。
- 输出：`prototype/static-v1/`、`prototype/static-v2/`、`docs/06-静态原型与原型评审.md`、`prototype/review-1/原型评审清单.md`。
- 两个版本均按 9 页：用户端 5 页，管理端 4 页。
- 使用 Bootstrap 和额外自定义样式；页面通过相对链接跳转。
- 仅静态假数据，不接数据库，不实现真实业务逻辑。
- 用户端手机优先；管理端桌面后台优先。
- 至少展示成功、空、异常中的两类状态。
- 最终需要浏览器截图和响应式检查，并启动本地服务。

## Research Findings

- UI 主方向是“安静学习感的校园服务界面”。
- 主品牌绿 `#1F6B5C`，页面背景 `#F5F7F6`，卡片圆角不超过 8px。
- 用户端目标画布 390x844；管理端目标画布 1366x768。
- static-v2 必须落实审计要求：统一跨页假数据、明确画布、可访问名称/焦点/对比度。
- A-P03 必须在一个页面用同页面板表示新增/编辑，不能拆页。
- 本机 Node、npm、.NET 可用；Codex 内置运行时提供 Node 包，可用于浏览器自动化。
- 当前工作区没有 `prototype` 目录。
- 相邻课程项目提供本地 Bootstrap 5.1.0 CSS 和 bundle JS，可复制到原型目录。
- 未找到本地 Bootstrap Icons；为避免联网和新增框架，使用清晰文字按钮与少量熟悉符号。
- Codex Node 依赖包含 Playwright；浏览器可在后续通过可用 executable 或系统 Chromium/Edge 解析。
- static-v1 已完成 9 页；每页均本地引用 Bootstrap、自定义样式和原型脚本。
- static-v1 相对页面/资源链接全部存在，外部 CDN 引用为 0。
- static-v1 已通过查询参数覆盖成功、空、异常状态，未增加额外业务页面。
- static-v2 已完成 9 页复制与审计修正，无 static-v1 标识残留、无 CDN、无相对链接断链。
- `demo-data.json` 已固定 2 用户、8 座位（7 启用/1 停用）、3 预约、统计 8/7/1/3/1 和两种验收画布。

## Technical Decisions

| Decision | Rationale |
| --- | --- |
| 页面文件使用语义化英文短名 | 相对链接清楚，避免浏览器路径编码问题 |
| 每个版本包含独立 `assets/styles.css` | 满足自定义样式要求并方便版本对比 |
| Bootstrap 优先使用本地文件 | 浏览器验收不依赖网络 |
| 仅使用少量展示脚本 | 支持 Bootstrap 菜单/弹窗和静态状态演示，不实现业务数据逻辑 |
| static-v1 与 v2 各自携带 Bootstrap 和 styles.css | 两版可以独立打开和比较 |

## Issues Encountered

| Issue | Resolution |
| --- | --- |
| `rg.exe` 因 WindowsApps 权限无法启动 | 改用 PowerShell 文件检索 |
| 初次统计用户座位卡匹配到 `seat-card-side` 导致结果为 16 | 改用只匹配 `<a class="seat-card...` 的精确规则复核 |
| 内置 `playwright` 无法从顶层解析 `playwright-core` | 使用 `.pnpm` 中实际 `playwright-core/node_modules` 路径扩展 `NODE_PATH` |
| 计划日志补丁因上下文不匹配未应用 | 读取文件末尾后使用精确上下文重新补丁 |
| 全页截图导致固定底部导航出现在拼接长图中段 | 改为 390x844/1366x768 精确视口截图 |
| 第二次组合补丁再次因日志上下文不匹配未应用 | 将 QA 脚本与日志拆成独立补丁处理 |
| Bootstrap 组件截图发生在过渡动画中段 | 等待 `.show` 后再等待 500ms 再截图 |

## Resources

- `docs/05-页面卡与UI规范.md`
- `docs/05-页面卡与UI规范-审计.md`
- `docs/04-页面树与业务流程.md`

## Visual/Browser Findings

- Playwright 自动检查 12 个视图全部返回 200，无控制台错误、无横向页面溢出，用户/管理点击链路均通过。
- U-P01 手机首屏层级清楚，主按钮、两项指标和下一内容区提示均可见。
- U-P04 日期横向选择和时段控件在 390px 下可用，按钮与文字无溢出。
- `fullPage` 长截图会把固定底部导航拼接在长图中段；验收截图改用精确视口模式。
- 精确 390x844 截图确认底部导航固定且不遮挡首屏操作，U-P01 信息层级和下一内容提示清楚。
- U-P04 在 390x844 下日期条呈现横向可滚动暗示，时段卡片和返回按钮无溢出。
- A-P02 在 1366x768 下筛选区、表格列、状态和操作区清楚，无拥挤或溢出。
- A-P04 数据卡片与状态分布清楚；趋势柱初次截图高度相同，原因是百分比高度缺少固定父高度，已补 120px 稳定容器。
- 首次组件截图发生在 Bootstrap 过渡动画中段，A-P03 面板仍在屏外、U-P05 弹窗尚未稳定；QA 已增加 500ms 动画等待。
- 过渡完成后的 A-P03 右侧面板字段、说明和底部操作完整可见，同页编辑边界清楚。
- U-P05 取消弹窗在 390x844 视口居中，危险按钮层级明确，文字和按钮无溢出。
- U-P02 空状态在手机视口中标题、原因和清除筛选操作完整，底部导航未遮挡。
- U-P04 冲突错误使用红色文字、浅红背景和具体原因，仍保留修改日期/时段的操作路径。
- 最终 QA 12/12 视图通过，用户/管理链路、编辑面板、取消弹窗均通过。
- 匿名交互控件为 0；首个键盘焦点正确；关键配色对比度最低 5.08:1。

## Development Preparation Findings

- 当前 Git 根目录是 `E:/Software/AI/AIweb`，当前项目位于仓库子目录 `3/`。
- `origin` 已绑定 `https://github.com/nitoufaluanleyo/Library-book.git`，本地 master 比 origin/master 领先 18 个阶段提交。
- 上级仓库包含相邻项目及既有未提交变更，本轮必须只暂存 `3/` 下的目标产物。
- 本阶段不得创建 `.sln`、`.csproj` 或运行项目；这些动作必须进入 Sprint 0 任务卡。
- 固定开发顺序：Sprint 0 骨架和数据基础；Sprint 1 用户浏览；Sprint 2 用户预约闭环；Sprint 3 管理闭环；Sprint 4 统计、联调和交付。
- Sprint 1-4 均为主 Sprint，可多轮推进，不能把一个主 Sprint 等同于一次对话或一次提交。
- 远端 main 原本只有独立的 `ec12c3c Initial commit` 和根 README，与本地历史无共同祖先。
- 通过普通 `--allow-unrelated-histories` 合并保留远端 README，未使用 force push。
- 内容提交为 `92075f0`，合并并推送后的 main 为 `9d2a6a4`。
- 本地 main 与 origin/main 已一致，四个开发准备文件均存在于远端树。

## Pre-development Consistency Audit Requirements

- 输入为阶段 01-10 的 9 份主体文档、README、开发准备文档和任务板，共 12 份。
- 必须核对范围、页面、数据、实现、验收五类一致性。
- 可在不改变题目、MVP、技术栈和阶段主线的前提下直接修正源文档。
- 每个问题必须记录编号、级别、对应源文档、是否修正和未修正原因。
- 输出 `docs/11-开发前一致性总审计.md`，并更新任务板的阻塞项、修订项和清零状态。
- 未生成 `.sln`、`.csproj`、`src/`、`Migrations/` 不构成冲突，除非文档把它们误写为已存在。
- 本轮结束必须给出基于证据的 Go / No-Go，不把可确定问题派回前序阶段。

## Pre-development Audit Findings

### Product Scope Baseline

- 技术栈始终为 ASP.NET Core MVC (.NET 8) + Razor + SQL Server LocalDB + EF Core + Bootstrap。
- 固定功能范围为：体验用户切换、用户查座/详情/预约/我的预约/取消；管理员登录、预约管理、座位管理、基础统计。
- 固定业务规则包括：未来 7 天、3 个固定时段、座位冲突、用户冲突、停用禁约、用户只能取消自己的未开始有效预约、管理员可取消有效预约。
- 固定数据范围是 ExperienceUser、Admin、Seat、Reservation 四个核心实体。
- 明确不做真实账号、支付、扫码、推送、审批/改签、复杂权限、多馆区、复杂图表/导出和生产部署。

### Candidate Issue Register

| 编号 | 初步级别 | 冲突 | 证据 | 初步处理 |
| --- | --- | --- | --- | --- |
| CONS-01 | P0 | 页面分布与编号口径漂移 | docs/01 写 10 个左右并列取消预约；docs/02 写用户 4 页面组 + 管理 5 页面组；docs/03 使用 P01-P09 的 4+5 分组；docs/04 起固定为 U-P01~U-P05 + A-P01~A-P04 | 直接联动修订 docs/01、docs/02、docs/03，统一为 5+4 页及 U/A 编号 |
| CONS-02 | P1 | 可预约日期文字有歧义 | docs/02 多处写“当天至未来 7 天”，docs/03 明确为含当天共 7 天（今天至今天+6） | 直接修订 docs/02 为无歧义口径 |
| CONS-03 | P1 | 座位管理页面操作归属漂移 | docs/03 P07/P08 拆页且写“快速启停”；docs/04 固定 A-P03 同页新增/编辑，启停仅从共享表单保存 | 直接修订 docs/03 的页面清单、流程、验收引用，不改变座位维护功能 |
| CONS-04 | P1 | 统计页视觉原型可能扩大实现范围 | docs/03、docs/04、docs/05 明确 5 个数字且不做图表；docs/06 把近 5 日趋势和状态分布写成统计页组成 | 直接修订 docs/06，标明两区仅为静态构图占位，不进入 Razor/查询/验收范围 |
| CONS-05 | P1 | 用户底部导航名称不一致 | docs/04、docs/05 固定为“首页、座位列表、我的预约”；docs/06 写“首页、座位、预约” | 直接修订 docs/06 为固定名称 |
| CONS-06 | 建议 | 图标资源口径过硬 | docs/05 强制 Bootstrap Icons；docs/06 的资源清单未包含图标库，实际原型按图标/符号按钮描述 | 修订 docs/05 为“若使用图标则统一 Bootstrap Icons；无图标资源时可用有可访问名称的熟悉符号/文字”，避免为图标扩依赖 |
| CONS-07 | P0 | U-P03 与 U-P04 工程职责混淆 | docs/04/05 固定 U-P03 只看详情、U-P04 负责日期/时段/可用性；docs/07 的 SeatDetailsViewModel、ISeatService 和主链路把时段可用性放回 U-P03 | 主修 docs/07，时段选项与可用性统一归 ReservationCreateViewModel + ReservationService + U-P04 GET |
| CONS-08 | P1 | 页面路由存在两套写法 | docs/04 使用 `/Seats/Details/{id}`、`/Reservations/My`、`/Admin/Account/Login`、`/Admin/Statistics`；docs/07、docs/09 使用 `/seats/{id}`、`/my-reservations`、`/admin/login`、`/admin/stats` | docs/09 已声明工程路由优先，直接回改 docs/04 建议路径 |
| CONS-09 | P1 | A-P02 筛选控件范围漂移 | docs/04/05 只展示日期、状态；docs/08 要求支持日期、状态、区域、体验用户查询，并写区域/用户用下拉 | 保留 Service/DataAccess 四条件能力，修订 docs/08 明确首版页面只暴露日期、状态 |
| CONS-10 | P1 | 时间抽象命名不一致 | docs/07 目录建议自建 `SystemClock.cs`；docs/08、docs/09 固定注入 .NET 8 `TimeProvider` | 直接修订 docs/07，移除自建 SystemClock 口径，统一 TimeProvider |
| CONS-11 | P0 | U-P04 页面构建契约缺少当前用户 | docs/09 的 BuildCreatePageAsync 不接收 ExperienceUserId，但页面需要同时呈现座位冲突和用户冲突可用性 | 主修 docs/09，联动 docs/07；GET 从 CurrentExperienceUserService 取用户并传入页面构建服务 |
| CONS-12 | P1 | README 阶段状态落后于本轮 | README 仍写“开发准备与 Sprint 0 规划阶段”，且当前文档树未列 docs/11 | 本轮总审计完成后直接更新 README 为“开发前一致性总审计已完成、待开发起步”并列出 docs/11 |
| CONS-13 | P1 | 远端仓库根入口仍弱 | 仓库根 README 仅有项目标题，完整入口在 `3/README.md` | 不在本轮允许回改源文档范围内；保留为不阻塞业务开工的仓库交付修订项 |
| CONS-14 | P1 | docs/10 的 Git 现状落后 | 文档仍写“目标 main、推送后确认默认分支”，实际 main 已推送且已为 GitHub 默认分支 | 直接更新 docs/10 的仓库现状和提交证据 |
| CONS-15 | P1 | T12-04 混合已完成与未完成动作 | main 推送已完成，dev 创建未完成，单卡无法表达真实状态 | 保留 T12-04 记录 main 推送并标完成；新增 T12-11 承接 dev 上游 |
| CONS-16 | P1 | 状态规则落点命名漂移 | docs/07、docs/09 由 ReservationService/TimeSlot 映射负责；docs/10、任务板突然指定未设计的 ReservationStatusRules 类 | 直接修订 docs/10 和任务板为职责描述，不强制新增类 |
| CONS-17 | P0 | 任务板缺少开发前一致性清零区 | 当前任务板没有本轮要求的阻塞项、修订项、回改文档和清零状态 | 本轮直接新增清单并在修订后标记已处理/已复核 |
| CONS-18 | P1 | 第五项统计名称不统一 | docs/03、docs/07-09 使用“今日有效预约数”，docs/04-06 使用“今日非取消预约数”；实际口径含当天动态已完成记录 | 统一展示名称为“今日非取消预约数”，计算仍为 date=today 且 StoredStatus=Reserved |
| CONS-19 | P0 | 数据库约束表使用非正式字段名 | docs/08 约束表写 SeatId+Date、UserId+Date，正式字段为 ReservationDate、ExperienceUserId | 直接修订 docs/08 为完整字段名，避免 Migration 照抄错误 |
| CONS-20 | P1 | 种子数量尚未统一冻结 | docs/02、docs/03 写 8-12 座位、2-3 预约；docs/06-10 已固定 8 座位（7 启用/1 停用）、3 预约 | 直接修订 docs/02、docs/03 为后续已冻结数量 |
| CONS-21 | P1 | 立项单出现未建模的座位“容量”字段 | docs/01 座位列表写“容量或备注”，后续 Seat 只有 SeatNumber、Area、Remark、IsEnabled | 直接修订 docs/01 为区域、状态、备注，不新增 Capacity 字段 |

### Page Baseline

- 固定页面编号与名称：U-P01 用户首页、U-P02 座位列表页、U-P03 座位详情页、U-P04 预约提交页、U-P05 我的预约页；A-P01 管理员登录页、A-P02 预约管理页、A-P03 座位管理页、A-P04 统计页。
- U-P04 成功后使用 PRG 跳转 U-P05；失败留在 U-P04；取消返回 U-P03。
- A-P03 用同一业务页面承载列表、新增和编辑状态，不增加独立新增/编辑页；不提供物理删除。
- 用户取消在 U-P05，管理员取消在 A-P02，均不增加独立确认页。
- 管理员登录成功默认进入 A-P04，未登录访问 A-P02/A-P03/A-P04 跳转 A-P01。
- A-P04 的业务验收范围固定为 5 个数据库数字指标；趋势和状态分布不是本期查询、数据对象或验收要求。
- docs/03 修订后已无 `P01-P09` 旧页面编号、8-12 座位范围或“今日有效预约数”旧名称残留。
- 第一轮全局复核只发现 docs/01 风险表残留“10 个左右”，已同步修订为固定 5+4；其余旧页面编号和旧路由无有效残留。

### Data Baseline

- 表：ExperienceUsers、Admins、Seats、Reservations；不增加 SeatArea、TimeSlot、ReservationLog。
- Reservation 存储 `Reserved/Cancelled`，展示 `Reserved/Cancelled/Completed`；Completed 由日期、时段结束时间和当前时间动态计算。
- 冲突最终约束：SeatId+ReservationDate+TimeSlot 和 ExperienceUserId+ReservationDate+TimeSlot 两个 `StoredStatus = Reserved` 过滤唯一索引。
- 取消字段：CancelledAt + CancelledBy(Student/Admin)，Reservation 使用 RowVersion 并发令牌。
- A-P02 首版 UI 只显示日期和状态；DataAccess/Service 查询对象保留区域和体验用户条件以满足数据能力要求。
- 统计固定为座位总数、启用数、停用数、预约总数、今日非取消预约数，全部实时查询。
- 第五项统计展示名称统一为“今日非取消预约数”，计算口径为 ReservationDate=today 且 StoredStatus=Reserved，包含当天动态已完成记录。
- 数据术语复核未发现旧日期范围、旧种子范围、旧统计名称、错误索引字段或旧 U-P04 构建签名残留；SystemClock/ReservationStatusRules 只作为“明确不采用”的说明出现。

### Implementation Baseline

- 最终路由以 docs/07、docs/09 为准：`/seats/{id}`、`/reservations/create`、`/my-reservations`、`/admin/login`、`/admin/reservations`、`/admin/seats`、`/admin/stats`。
- U-P04 GET 必须解析当前体验用户并构建 7 天、3 时段及座位/用户两类占用状态；U-P03 只查询 Seat 详情。
- Controller 不访问 AppDbContext；Service 直接使用 AppDbContext 编写 LINQ；DataAccess 负责 DbContext、配置、迁移和种子数据，不新增 Repository。
- 所有动态时间规则统一注入 .NET 8 TimeProvider，一次操作只读取一次当前时间。
- A-P02 初始页面只暴露日期和状态；查询条件对象与 DataAccess 保留 area、experienceUserId 能力。
- 实现复核确认 U-P03 仅有 SeatDetailsViewModel，U-P04 的 BuildCreatePageAsync 已接收 currentExperienceUserId 并查询两类占用；CONS-07、CONS-11 可升级为已复核。
- 数据复核确认过滤索引字段全名、TimeProvider、A-P02 UI/查询能力边界和第五项统计名称一致；CONS-19 可升级为已复核。

### Acceptance and Planning Baseline

- 4 个里程碑：M1 工程起步、M2 用户闭环、M3 管理闭环、M4 课程交付。
- Sprint 0 负责 sln/csproj/build/run/Migration/Seed；Sprint 1 浏览；Sprint 2 预约闭环；Sprint 3 管理闭环；Sprint 4 统计/联调/交付。
- T12-04 应只记录已完成的 main 首次推送；dev 分支建立使用新增 T12-11 独立验收。
- Sprint 2 页面构建卡必须验证 U-P04 同时反映座位占用与当前用户时段冲突。
- 总审计任务板必须增加开发前阻塞项清单和一致性修订项清单，并记录主修订文档及未处理/已处理/已复核状态。
- 任务板复核确认 Sprint 0 为 11 卡、2 卡完成、9 卡待开发、完成率 18%；T12-04/T12-11 已独立，P0/P1 清单字段齐全；CONS-17 可升级为已复核。
- static-v2 实际存在 9 个 HTML 文件，名称与 docs/06 的 U-P01~U-P05、A-P01~A-P04 映射一致。
- 种子数据冻结为 2 个体验用户、1 个管理员、8 个座位（7 启用/1 停用）、3 条预约。
- docs/11 已包含 15 个必需章节和 CONS-01 至 CONS-21 共 21 个唯一问题。
- 最终旧术语扫描返回 U-P03 正常页面行的原因是 Razor View 路径包含 `/Seats/Details`，不是旧访问路由；docs/04 的 9 个页面编号和小写最终路由均存在，未发现实际旧口径残留。
- 目标文档 `git diff --check` 通过；既有 `docs/01-项目立项单-审计.md` 修改不属于本轮，必须保持未暂存。
- 相对 Markdown 链接检查通过。
- `.sln`、`src/`、`Migrations/` 仍不存在，README 明确写为尚未创建，与阶段 11 真实状态一致。

## 11b Review Requirements

- 复核对象：docs/11、任务板，以及 docs/11 第 14 节列出的直接修订源文档。
- 11b 只判断 11a 是否成立，不修改 docs/01-11a、README、docs/10 或任务板。
- 必须验证覆盖范围、五类一致性、跨文档证据、P0/P1 分级、任务板同步和 Go 门禁。
- README 与 docs/10 按开发准备阶段判断；缺少 sln/csproj/src/Migrations 不是冲突。
- 11a 标记已修正的 20 项必须逐项查源文档；CONS-13 未修项必须判断是否确实不能由 11a 直接修正。
- 若发现直接修订仍有残留，结论必须明确退回 11a；11b 不接管修订。

## 11b Review Findings

### Coverage and Structure

- docs/11 明确列出 docs/01-09、README、docs/10 和任务板，共 12 份输入，覆盖要求成立。
- 范围、页面、数据、实现、验收五类一致性分别有独立章节、修前冲突、修后结果和通过结论。
- 问题清单共 CONS-01 至 CONS-21；任务板同步 5 个 P0 和 16 个 P1，状态与 docs/11 一致。
- README 缺少工程文件被正确识别为开发准备阶段事实，没有误判为冲突。

### Items Requiring Deeper Review

- 需要逐项验证 20 个“已直接修正”问题是否在源文档真实清零。
- CONS-17、CONS-19 的 P0 级别可能偏保守：前者是门禁台账完整性，后者是字段简写精度；即使级别偏高，因均已修正，不直接推翻 Go。
- CONS-13 已进入任务板 P1 清单，但尚无独立任务卡；需判断“在 T12-10 前处理”的关闭动作是否足够可执行。
- 11b 最终门禁结论：No-Go，退回 11a；原因是 CONS-01、CONS-07、CONS-11 的已复核状态不成立。

### Source Revision Verification

- CONS-01 至 CONS-10 的范围、页面、日期、种子、路由、图标、统计占位、U-P03/U-P04 分工、筛选和 TimeProvider 修订均能在对应源文档找到。
- CONS-12、CONS-14 至 CONS-16、CONS-18 至 CONS-21 的 README、Git、任务卡、状态规则、统计名、字段名、种子和容量修订均有源文档证据。
- **残留 REV-01：** docs/07 将 ReservationCreateViewModel 定义为包含 SeatId、座位摘要、当前体验用户、日期/时段选项和错误信息；docs/09 第 2.1 节仍写“ReservationCreateViewModel 只包含 SeatId、ReservationDate、TimeSlot”。该句把“POST 可提交字段”误写成“整个 ViewModel 字段”，与 CONS-11 修后口径冲突。
- REV-01 直接涉及 11a 标记“已复核”的 CONS-11，按 11b 规则必须退回 11a 修订，11b 不改源文档。
- **残留 REV-02：** docs/05 使用“首页、座位、我的预约”，docs/06 与 docs/11 使用“首页、座位列表、我的预约”，prototype/static-v2 五个用户页使用“首页、座位、预约”。11a 的允许回改范围不含原型目录，因此不能把 CONS-05 标为已复核；应记录为待后续原型/开发统一项。
- CONS-13 的事实成立：仓库根 README 仍只有 `# Library-book`。根 README 不在 11a 允许回改范围内，任务板已记录未处理并限定 T12-10 前关闭；未单列任务卡是可执行性优化，不构成新的开发前 P0。
- 旧页面数量、旧编号、旧日期、旧种子区间、旧统计名、错误索引字段、容量字段和旧 BuildCreatePageAsync 签名的全局扫描无残留。
- **残留 REV-03：** docs/11 验收映射写“AT01 -> T12-02 至 T12-10 / M1”，任务板 M1 实际为“T12-02、T12-03、T12-05 至 T12-11”。docs/11 的范围误含 T12-04 且漏 T12-11，与最终任务板不一致。
- **残留 REV-04（P0）：** docs/03 第 102、113、117 行仍把时段可用性、日期和时段选择放在“座位详情页”，与同文档第 221 行及 docs/04-09 的 U-P03 只看详情、U-P04 负责预约提交冲突。
- **残留 REV-05（P0）：** docs/03 第 224 行写“不生成独立的座位详情”，与已经固定存在的 U-P03 座位详情页直接矛盾。
- REV-04/REV-05 说明 CONS-01、CONS-07 的“已复核”状态不成立，会影响 Razor View 和 Controller 职责，必须退回 11a。
- **残留 REV-06：** docs/08 第 212 行仍把 `IX_Reservations_SeatId_ReservationDate` 描述为“座位详情的时段占用查询”，应归 U-P04 预约提交时段查询；这是 CONS-07 在数据设计中的联动残留。
- A-P02 实物只显示日期/状态筛选，A-P04 实物使用“今日非取消预约数”，CONS-09、CONS-18 的修订与原型一致。
- REV-02 已在 static-v2 五个用户页复现：手机底部导航均显示“预约”，不是单页遗漏。
- 复核报告已按 A-E 五个章节输出，明确列出 P0/P1、必改项和“退回 11a 继续修订”。
- Git 状态确认 11a 报告、任务板和源文档均未被 11b 修改；仅新增复核报告，另有用户既有 docs/01 审计文件修改。
- 阶段边界复核通过：sln/src/Migrations 均不存在，README 和 docs/10 明确写为 Sprint 0 待生成，没有按最终仓库形态误判。
- Git 提交 6b577ec 实际修改了 README、docs/01-10、任务板并新增 docs/11，共 13 个文件，证明 11a 确有执行直接修订。
