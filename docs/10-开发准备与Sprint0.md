# 图书馆座位预约系统开发准备与 Sprint 0

## 文档信息

| 项目 | 内容 |
| --- | --- |
| 当前阶段 | 正式写业务代码前的开发准备 |
| 远端仓库 | [nitoufaluanleyo/Library-book](https://github.com/nitoufaluanleyo/Library-book) |
| 技术栈 | ASP.NET Core MVC (.NET 8) + Razor + EF Core + SQL Server LocalDB + Bootstrap |
| 页面范围 | 用户端 5 页 + 管理端 4 页 |
| 数据范围 | ExperienceUser、Admin、Seat、Reservation 四个实体 |
| 下一步 | 开发前一致性总审计，然后进入开发起步与项目骨架 |

## 0. 前序范围提取

### 0.1 固定功能范围

| 端 | 页面/模块 | 本期职责 |
| --- | --- | --- |
| 用户端 | U-P01 用户首页 | 体验账号、座位总数、启用座位数、主入口 |
| 用户端 | U-P02 座位列表页 | 区域筛选、座位卡片、启停状态 |
| 用户端 | U-P03 座位详情页 | 座位信息和启停状态 |
| 用户端 | U-P04 预约提交页 | 7 天日期、3 个时段、预约提交和冲突提示 |
| 用户端 | U-P05 我的预约页 | 当前用户数据、动态状态和用户取消 |
| 管理端 | A-P01 管理员登录页 | 预置账号登录、退出和访问保护 |
| 管理端 | A-P02 预约管理页 | 日期/状态筛选和管理员取消 |
| 管理端 | A-P03 座位管理页 | 同页列表、新增、编辑和启停 |
| 管理端 | A-P04 统计页 | 5 个固定数字指标 |

### 0.2 固定主链路顺序

用户主链路：

```text
U-P01 -> U-P02 -> U-P03 -> U-P04 -> U-P05 -> 取消/继续选座
```

管理主链路：

```text
A-P01 -> A-P04 -> A-P02/A-P03 -> A-P04 -> A-P01
```

### 0.3 固定业务边界

1. 数据库只存 Reserved、Cancelled，Completed 动态计算。
2. 同座位同日期同时段、同用户同日期同时段都不能存在两条 Reserved。
3. 用户开始前可取消，管理员结束前可取消。
4. 座位停用阻止新预约，不自动取消已有预约。
5. 用户身份来自 Session，管理员身份来自 AdminCookie。
6. 不扩展支付、扫码、消息、注册、多馆区、审批、改签、批量和导出。

### 0.4 开发优先级

| 优先级 | 内容 | 原因 |
| --- | --- | --- |
| P0 | 工程可构建运行、数据库可初始化 | 所有业务开发前提 |
| P0 | 用户预约与取消闭环 | 项目核心价值和主要验收链路 |
| P0 | 管理员登录、预约管理、座位管理 | 管理闭环和权限验收 |
| P1 | 5 项统计、统一状态和反馈 | 支撑数据变化验收 |
| P1 | 响应式、异常状态、README | 支撑课堂演示和仓库交付 |
| 暂缓 | 趋势图、导出和超出 MVP 的功能 | 控制单人项目工作量 |

## 1. 仓库结构

### 1.1 当前仓库现状

当前项目位于本地 Git 仓库的 `3/` 子目录，远端已绑定：

```text
https://github.com/nitoufaluanleyo/Library-book.git
```

本阶段当前项目中实际存在：

```text
3/
├─ .gitignore
├─ README.md
├─ docs/
└─ prototype/
```

上级 Git 仓库还包含相邻项目。本项目提交必须精确暂存 `3/` 下目标文件，不得把相邻目录的删除或修改带入提交。

### 1.2 后续计划结构

Sprint 0 才创建以下内容：

```text
3/
├─ LibrarySeatReservation.sln
├─ src/LibrarySeatReservation.Web/
│  ├─ Areas/Admin/
│  ├─ Controllers/
│  ├─ Services/
│  ├─ DataAccess/
│  ├─ Models/
│  ├─ ViewModels/
│  ├─ Views/
│  ├─ wwwroot/
│  ├─ Program.cs
│  └─ LibrarySeatReservation.Web.csproj
└─ tests/LibrarySeatReservation.Tests/
```

本阶段不生成 `.sln`、`.csproj`，不执行首次 build/run。工程创建、依赖、首次 build/run、Migration、种子和冒烟验收由 T12-02、T12-03、T12-05 至 T12-10 承接；dev 分支由 T12-11 单独承接。

## 2. 本地与远端仓库建议

### 2.1 当前仓库处理

1. 当前仓库已经初始化，不重复执行 `git init`。
2. 当前 `origin` 已指向用户提供的 GitHub 地址，不重复添加远端。
3. `main` 已推送并已设置为 GitHub 默认分支；开发准备内容提交为 `92075f0`，保留远端初始历史后的合并提交为 `9d2a6a4`。
4. `dev` 尚未创建，由任务卡 T12-11 从当前 `main` 创建并设置远端上游。
5. 上级仓库其他未提交变更保持原样，后续仍只精确暂存 `3/` 下当前任务文件。
6. GitHub 仓库根 README 入口仍需补充指向 `3/README.md` 的链接，该项不改变项目目录，按一致性修订项跟踪。

### 2.2 新电脑建议

```powershell
git clone https://github.com/nitoufaluanleyo/Library-book.git
Set-Location .\Library-book\3
git switch main
```

GitHub 默认分支当前为 `main`。克隆后如本地未自动建立跟踪分支，执行 `git fetch origin` 后再运行 `git switch main`。

### 2.3 每轮开发前后

开发前：

```powershell
git status
git switch dev
git pull --ff-only origin dev
git switch -c feat/<模块名>
```

开发后：

```powershell
git add <本任务卡相关文件>
git diff --cached --check
git commit -m "feat: 完成具体可验收动作"
git push -u origin feat/<模块名>
```

## 3. 分支策略

| 分支 | 用途 | 进入条件 | 合并条件 |
| --- | --- | --- | --- |
| `main` | 可运行、可演示、可验收版本 | 仅接受 dev 的阶段合并 | 关键验收通过、README 已更新 |
| `dev` | 当前主 Sprint 集成 | 从 main 建立并持续维护 | 当前轮次任务已验证，允许进入阶段评审 |
| `feat/<模块名>` | 单功能或相关任务卡 | 从 dev 创建 | build 通过、任务卡验收通过 |

推荐功能分支：

```text
feat/project-skeleton
feat/user-seat-browsing
feat/reservation-flow
feat/admin-management
feat/statistics-and-release
```

单人项目也保留 feat 分支，目的是练习真实工作流和控制每次提交范围，不要求制造复杂审批流程。

## 4. 提交规范

### 4.1 提交前缀

| 前缀 | 用途 | 示例 |
| --- | --- | --- |
| `feat:` | 新功能 | `feat: 完成用户预约提交` |
| `fix:` | 缺陷修复 | `fix: 修复重复预约未拦截` |
| `docs:` | 文档 | `docs: 更新数据库初始化步骤` |
| `test:` | 测试 | `test: 增加预约冲突测试` |
| `refactor:` | 不改变行为的重构 | `refactor: 提取预约状态规则` |
| `build:` | 工程和依赖 | `build: 创建MVC项目并配置EF Core` |
| `chore:` | 其他维护 | `chore: 更新忽略规则` |

### 4.2 提交要求

1. 一次提交围绕一个可验收动作，不混入无关格式化。
2. 提交前执行 `git diff --cached --check`。
3. 有代码时至少执行对应的 build 或测试。
4. 每完成一个重要节点自动提交。
5. 不提交 `.mdf`、`.ldf`、`bin/`、`obj/`、本地密钥和个人 IDE 文件。

## 5. Sprint 0 目标

### 5.1 目标

建立一个可以拉取、还原、构建、运行、建库和看到最小演示数据的项目骨架，为后续业务开发提供稳定起点。

### 5.2 阶段最低完成线

1. `LibrarySeatReservation.sln` 和 Web `.csproj` 已创建。
2. ASP.NET Core MVC 首页能启动并返回 200。
3. `dotnet build` 无错误。
4. LocalDB 连接有效，首个 Migration 能建 4 张核心表。
5. 两个过滤唯一索引、CHECK 和 RowVersion 已进入 Migration。
6. 幂等种子数据初始化为 2 用户、1 管理员、8 座位、3 预约。
7. README 写入经过验证的运行、迁移和复位命令。

### 5.3 Sprint 0 不做

1. 不实现 9 个正式业务页面。
2. 不实现完整预约和管理逻辑。
3. 不为了“看起来完整”写死假业务数据到 Razor。
4. 不扩展新实体和新页面。

Sprint 0 详细任务卡见任务板 T12-01 至 T12-11。

## 6. Sprint 1-4 主 Sprint 粗计划

**Sprint 1-4 均为主 Sprint，可多轮推进。** 每个主 Sprint 可以包含若干开发轮、修复轮和验证轮，只有达到阶段最低完成线后才能进入下一个主 Sprint。

### Sprint 1：体验用户与座位浏览主 Sprint

目标：完成 U-P01、U-P02、U-P03 和体验账号 Session，使用户能够切换账号、查看座位并进入详情。

最低完成线：

1. 两个体验用户可切换并保持 Session。
2. 首页显示真实数据库统计。
3. 座位列表支持区域筛选。
4. 启用、停用座位详情表现正确。
5. 用户浏览链路通过手工验收。

### Sprint 2：用户预约闭环主 Sprint

目标：完成 U-P04、U-P05、两类预约冲突、动态状态和用户取消。

最低完成线：

1. 合法预约只新增一条 Reserved。
2. 座位冲突和用户冲突均被拦截。
3. 当前用户只能看到和取消自己的预约。
4. 用户开始后不能取消，取消后时段释放。
5. Reserved、Cancelled、Completed 展示一致。

### Sprint 3：管理端闭环主 Sprint

目标：完成 A-P01、A-P02、A-P03 的管理员登录、预约处理和座位维护。

最低完成线：

1. AdminCookie 登录、退出和未登录拦截有效。
2. A-P02 按日期、状态筛选并可管理员取消。
3. A-P03 同页新增、编辑和启停可用。
4. 座位编号唯一，停用不删除已有预约。
5. 管理链路通过手工验收。

### Sprint 4：统计、联调与交付主 Sprint

目标：完成 A-P04 五项统计、9 页视觉整合、全链路测试和仓库交付。

最低完成线：

1. 五项统计按数据库口径变化。
2. 9 页使用统一布局和 static-v2 视觉基线。
3. 核心冲突、取消、权限和统计测试通过。
4. 空状态、错误状态和响应式完成验收。
5. README、演示账号、运行命令和已知限制更新为真实结果。

## 7. 里程碑节点

里程碑控制为 4 个：

| 里程碑 | 对应阶段 | 可演示结果 | 通过条件 |
| --- | --- | --- | --- |
| M1 工程起步 | Sprint 0 | 项目可 build/run，LocalDB 可初始化 | Sprint 0 最低完成线全部通过 |
| M2 用户闭环 | Sprint 1-2 | 切账号、查座、预约、查看、取消 | 用户主链路和两类冲突通过 |
| M3 管理闭环 | Sprint 3 | 登录、预约管理、座位维护 | 管理主链路和权限保护通过 |
| M4 课程交付 | Sprint 4 | 统计、9 页、README、仓库链接 | 最终验收清单通过并推送远端 |

## 8. 开发就绪与完成定义

### 8.1 Definition of Ready

任务卡进入“进行中”前必须具备：

1. 明确页面或模块。
2. 明确输入、输出和验收动作。
3. 明确依赖任务已经完成。
4. 不超出 9 页和 4 实体范围。

### 8.2 Definition of Done

任务卡进入“已完成”前必须满足：

1. 代码或文档已落盘。
2. 对应 build、测试或手工验收通过。
3. 异常和空状态按任务范围处理。
4. 任务板状态和本轮验证结果已更新。
5. 重要节点已 Git commit。

## 9. 默认补足项 / 当前假设

1. **A-P02 筛选范围：** 页面首版只显示日期、状态；区域和体验用户条件保留在 Service/DataAccess，暂不增加原型控件。
2. **动态状态规则：** 由 `ReservationService` 统一负责展示状态与取消边界，时段起止常量由 `ReservationTimeSlot` 映射集中提供；不强制新增前序设计中不存在的 `ReservationStatusRules` 类。
3. **管理员密码：** 使用框架 `PasswordHasher<Admin>` 或同等级标准哈希器，不引入完整 Identity 系统。
4. **U-P04 失败去向：** 座位不存在回 U-P02，座位停用回 U-P03；字段和冲突错误留在 U-P04。
5. **远端分支：** `main` 已推送并设为默认分支；`dev` 和后续 `feat/*` 尚未建立，分别按 T12-11 和对应功能任务创建。
6. **测试项目：** Sprint 0 可先创建；如果课堂时间不足，先保证 ReservationService 关键规则测试，不追求全页面自动化。
7. **时间口径：** 单机课堂环境统一使用注入的 TimeProvider 和服务器本地时间。

## 10. 进入下一步的确认结论

开发范围、仓库策略、提交规范、Sprint 0、四个主 Sprint、四个里程碑和任务卡编号已经明确。本轮不创建工程代码；开发前一致性总审计完成且 P0 清零后，可以进入“开发起步与项目骨架”，先执行 T12-11 建立 dev，再按 T12-02 开始创建工程。
