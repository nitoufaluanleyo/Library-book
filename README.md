# 图书馆座位预约系统

> **最终交付状态：未达到可运行系统验收标准。**
>
> 当前仓库实际交付内容是完整的课程过程文档、9 页静态原型和原型评审材料。ASP.NET Core 工程、EF Core Migration、LocalDB 数据库、业务代码、演示账号和系统级自动化测试均未完成。

项目目录入口：[GitHub / Library-book / 3](https://github.com/nitoufaluanleyo/Library-book/tree/main/3)

## 1. 项目简介

本项目规划实现一个单馆区图书馆座位预约系统。学生通过体验账号查看座位、提交预约、查看和取消自己的预约；管理员通过独立登录入口管理预约、维护座位并查看基础统计。

本期固定范围不包含支付、扫码、消息推送、复杂账号体系、多馆区联动、审批流、改签、批量处理和报表导出。

## 2. 当前交付结论

| 交付项 | 当前状态 | 可验收内容 |
| --- | --- | --- |
| 需求与设计文档 | 已完成 | docs/01 至 docs/11 及阶段审计 |
| 静态页面原型 | 已完成 | 用户端 5 页、管理端 4 页、空状态和异常状态 |
| 原型评审材料 | 已完成 | 截图、QA 结果和评审清单 |
| ASP.NET Core 工程 | 未完成 | 无 `.sln`、`.csproj`、`src/` |
| EF Core / LocalDB | 未完成 | 无 DbContext、Migration、数据库或种子初始化器 |
| 用户端业务 | 未完成 | 无 Session、真实查库、预约写入、回看或取消 |
| 管理端业务 | 未完成 | 无登录、Cookie、预约处理、座位管理或统计 |
| 系统测试 | 未完成 | 无 package、Playwright 配置、e2e 或 smoke 脚本 |

因此，本仓库不能作为“可运行的图书馆座位预约系统”提交，只能作为“课程设计文档与静态原型阶段成果”提交。

## 3. 技术栈

### 3.1 设计目标

| 分类 | 规划技术 |
| --- | --- |
| 后端 | ASP.NET Core MVC（.NET 8） |
| 页面 | Razor |
| 数据访问 | EF Core 8，Code First |
| 数据库 | SQL Server LocalDB |
| 前端 | Bootstrap + 自定义 CSS |
| 用户身份 | 体验用户 Session |
| 管理身份 | 轻量 Cookie Authentication |

### 3.2 当前实际使用

静态原型使用 HTML、Bootstrap、本地 CSS 和 JavaScript 假数据。规划技术栈尚未落成 Web 工程。

## 4. 功能清单

| 模块 | 规划功能 | 当前实际状态 |
| --- | --- | --- |
| 用户首页 | 体验账号切换、座位概览、入口导航 | 仅静态原型 |
| 座位浏览 | 区域筛选、座位列表、座位详情 | 仅静态原型 |
| 用户预约 | 日期/时段选择、冲突校验、预约写入 | 未实现 |
| 我的预约 | 数据隔离、状态显示、用户取消 | 未实现 |
| 管理员登录 | 哈希校验、AdminCookie、访问保护、退出 | 未实现 |
| 预约管理 | 日期/状态筛选、管理员取消、状态回流 | 未实现 |
| 座位管理 | 新增、编辑、启用、停用 | 未实现 |
| 统计 | 5 项数据库实时统计 | 未实现 |
| 异常与体验 | 冲突、非法取消、空状态、响应式 | 原型有展示，业务逻辑未实现 |

## 5. 页面清单

### 5.1 用户端 5 页

| 编号 | 页面 | 静态原型 |
| --- | --- | --- |
| U-P01 | 用户首页 | `prototype/static-v2/index.html` |
| U-P02 | 座位列表页 | `prototype/static-v2/seats.html` |
| U-P03 | 座位详情页 | `prototype/static-v2/seat-detail.html` |
| U-P04 | 预约提交页 | `prototype/static-v2/reserve.html` |
| U-P05 | 我的预约页 | `prototype/static-v2/my-reservations.html` |

### 5.2 管理端 4 页

| 编号 | 页面 | 静态原型 |
| --- | --- | --- |
| A-P01 | 管理员登录页 | `prototype/static-v2/admin-login.html` |
| A-P02 | 预约管理页 | `prototype/static-v2/admin-reservations.html` |
| A-P03 | 座位管理页 | `prototype/static-v2/admin-seats.html` |
| A-P04 | 统计页 | `prototype/static-v2/admin-stats.html` |

页面数量和名称与页面树、页面卡和 static-v2 一致。静态页面中的提交、登录、取消和状态变化是前端演示效果，不会写入数据库。

## 6. 如何查看当前成果

当前唯一可直接查看的成果是静态原型：

1. 打开 `prototype/static-v2/index.html`。
2. 按页面内相对链接浏览用户端 5 页。
3. 从用户首页进入管理员入口，浏览管理端 4 页。
4. 可通过原型查询参数查看部分空状态和异常状态。

静态 HTML 可直接打开，不需要启动开发服务器。

## 7. ASP.NET Core 运行步骤

**当前无法运行。** 仓库中不存在以下必需文件：

- `LibrarySeatReservation.sln`
- `src/LibrarySeatReservation.Web/LibrarySeatReservation.Web.csproj`
- `Program.cs`
- `appsettings.json`
- EF Core Migration

前序文档中的 `dotnet restore`、`dotnet build`、`dotnet ef database update` 和 `dotnet run` 均是后续计划命令，不是本仓库当前可执行步骤。

## 8. 数据库初始化

数据库设计选择 Code First，不采用手工逐表建库，也不采用 Database First。

当前没有 Migration、SQL 建表脚本、LocalDB 数据库或 `DbSeeder`，所以无法执行首次建库、建表和种子初始化。详细状态、目标数据和后续命令见 [database/README.md](database/README.md)。

## 9. 种子数据说明

以下是前序设计确认的**目标口径**，不是当前已存在数据：

| 数据 | 目标数量或内容 | 当前是否可用 |
| --- | --- | --- |
| 体验用户 | 2 个启用用户，原型名称为王同学、李同学 | 否 |
| 管理员 | 1 个启用管理员 | 否，未确定可用账号密码 |
| 座位 | 8 个，7 个启用、1 个停用 | 否 |
| 预约 | 3 条相对日期记录：未来 Reserved、Cancelled、动态 Completed 示例 | 否 |
| 固定时段 | 上午 08:00-12:00、下午 14:00-18:00、晚上 18:30-21:30 | 仅设计枚举 |

设计要求种子初始化幂等，并按首次建库当天生成相对日期；该初始化器尚未实现。

## 10. 演示账号

**当前没有可登录的演示账号。**

| 类型 | 设计目标 | 当前状态 |
| --- | --- | --- |
| 体验用户 | 王同学、李同学，用于 Session 切换 | 仅原型假数据 |
| 管理员 | 1 个预置管理员，密码以哈希保存 | 未创建，用户名和密码不可用 |

静态管理员登录页不校验真实账号，不能作为登录功能验收。

## 11. 测试状态

阶段 16 只完成环境和阻塞盘点：

- Node.js、npm、Edge、Chrome 已安装。
- `package.json`、`@playwright/test`、`playwright.config.*`、e2e 和 smoke 脚本不存在。
- Playwright msedge、应用级 smoke、兼容性和回归测试均未执行。
- 当前记录 5 个 P0、2 个 P1，关闭数为 0。

静态原型历史 QA 结果位于 `prototype/review-1/`，不能替代 ASP.NET Core 系统测试。

## 12. 项目目录

```text
3/
├─ .gitignore
├─ README.md
├─ database/
│  └─ README.md
├─ docs/
│  ├─ 01-项目立项单.md
│  ├─ ...
│  ├─ 16-联调测试与缺陷闭环.md
│  └─ 17-交付说明与项目复盘.md
└─ prototype/
   ├─ static-v1/
   ├─ static-v2/
   └─ review-1/
```

`docs/01` 至 `docs/16` 是按课程阶段形成的历史记录，包含当时的计划和判断。最终状态以本 README、`database/README.md` 和 `docs/17-交付说明与项目复盘.md` 为准。

## 13. 已知限制与遗留问题

1. 没有可运行的 ASP.NET Core MVC 工程。
2. 没有数据库、Migration、种子数据或真实演示账号。
3. 用户端和管理端均未实现，不能演示状态回流。
4. 所有业务按钮只在静态原型中模拟。
5. 没有系统级 Playwright、smoke、兼容性或回归测试。
6. 开发前 `CONS-01`、`CONS-07`、`CONS-11` 尚未复核清零。
7. 阶段 16 剩余 5 个 P0、2 个 P1，不能进入最终功能交付。
8. `prototype/review-1/qa.js` 包含 Windows Edge 默认绝对路径，但可以使用 `EDGE_PATH` 环境变量覆盖；该脚本只服务静态原型。
9. LocalDB 是 Windows 本地依赖，后续实现时必须补充可复现的 Migration 和复位步骤。
10. 远端仓库包含多个课程目录，本项目应从 `3/` 子目录进入。

## 14. 仓库清理检查

- `.vs/`、`bin/`、`obj/`、LocalDB 文件和本地环境文件已由 `.gitignore` 排除。
- `task_plan.md`、`findings.md`、`progress.md` 是本地代理过程文件，已忽略且未提交。
- 未发现业务代码中的硬编码绝对路径，因为当前没有业务代码。
- 唯一发现的机器路径位于历史静态 QA 脚本，已在已知限制中说明。

## 15. 提交信息

远端仓库：[nitoufaluanleyo/Library-book](https://github.com/nitoufaluanleyo/Library-book)

查看当前提交：

```powershell
git log -1 --format=%H
```

由于 P0 未清零且没有可运行系统，本轮不创建 `v1.0-final` 标签。功能、数据库和测试全部通过后再创建最终版本标签。
