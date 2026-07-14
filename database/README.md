# 数据库初始化与种子数据说明

## 1. 当前状态

**数据库尚未实现，当前不能执行建库、建表或种子初始化。**

仓库中不存在：

- `src/LibrarySeatReservation.Web/`；
- DbContext 和 Entity 代码；
- EF Core Migration；
- `appsettings.json` 或可用连接字符串；
- `DbSeeder` 或等价初始化器；
- SQL 建表或种子脚本；
- LocalDB 数据库文件。

本目录用于说明已确认的数据库方案和当前复现缺口，不代表数据库已经交付。

## 2. 建库方式

项目设计采用 **EF Core Code First**：

1. 先在 C# 中定义 Entity 和 EF Core Mapping。
2. 使用 Migration 生成数据库结构变化。
3. 使用 `dotnet ef database update` 更新 SQL Server LocalDB。
4. 应用启动后运行幂等种子初始化器。

本项目不采用手工逐表建库，也不采用 Database First 反向生成。

## 3. 核心数据对象

前序设计确认 4 个核心实体：

| 实体 | 目标表 | 作用 |
| --- | --- | --- |
| `ExperienceUser` | `ExperienceUsers` | 体验用户与 Session 身份 |
| `Admin` | `Admins` | 管理员账号与密码哈希 |
| `Seat` | `Seats` | 座位编号、区域、备注和启停状态 |
| `Reservation` | `Reservations` | 用户、座位、日期、时段、状态和取消信息 |

区域使用 `Seat.Area` 文本字段，时段使用 `ReservationTimeSlot` 枚举，不单独建立 SeatArea 或 TimeSlot 表。

固定时段设计：

| 枚举 | 展示 | 开始 | 结束 |
| --- | --- | --- | --- |
| `Morning` | 上午 | 08:00 | 12:00 |
| `Afternoon` | 下午 | 14:00 | 18:00 |
| `Evening` | 晚上 | 18:30 | 21:30 |

## 4. 首次建库建表

以下是工程完成后的**计划命令**，当前仓库不能执行：

```powershell
dotnet restore .\LibrarySeatReservation.sln

dotnet ef migrations add InitialCreate `
  --project .\src\LibrarySeatReservation.Web `
  --startup-project .\src\LibrarySeatReservation.Web

dotnet ef database update `
  --project .\src\LibrarySeatReservation.Web `
  --startup-project .\src\LibrarySeatReservation.Web
```

当前缺少 Solution、项目文件、EF Core 包、DbContext 和 Migration，因此不能把上述命令当作已验证运行步骤。

## 5. 种子数据目标

以下口径来自 `docs/08-数据库设计.md` 和任务板 T12-09，尚未形成实际数据：

| 数据 | 目标内容 | 当前状态 |
| --- | --- | --- |
| 体验用户 | 2 个启用用户；原型名称王同学、李同学 | 未初始化 |
| 管理员 | 1 个启用管理员 | 未初始化 |
| 座位 | 8 个，7 个启用、1 个停用 | 未初始化 |
| 预约 | 3 条：未来 Reserved、Cancelled、已结束但存储仍为 Reserved | 未初始化 |

3 条预约分别用于演示有效预约和冲突、取消历史、动态 Completed。

种子日期应由运行时初始化器按首次建库当天生成相对日期，避免固定日期过期。重复运行初始化器时，记录数量不得增加。

## 6. 演示账号

### 6.1 体验用户

王同学、李同学只存在于静态原型和设计口径中，没有数据库记录，当前不能进行真实 Session 切换。

### 6.2 管理员

当前没有可用管理员账号和密码。前序设计只确认：

- 初始化 1 个启用管理员；
- 密码只保存哈希；
- README 可记录课堂演示密码；
- 数据库和源代码不得保存明文密码。

由于实现尚未完成，本说明不擅自编造用户名、密码或哈希。

## 7. 数据一致性目标

后续实现必须至少包含：

1. 同一座位、同一日期、同一时段只能有一条有效预约。
2. 同一体验用户、同一日期、同一时段只能有一条有效预约。
3. Cancelled 记录不阻止重新预约。
4. `Reservation.RowVersion` 用于并发取消检测。
5. 停用座位不能创建新预约，但已有预约不被删除。
6. StoredStatus 使用 Reserved、Cancelled；Completed 根据时间动态计算。

具体索引、CHECK、字段和统计口径见 `docs/08-数据库设计.md`。

## 8. 数据库复位

工程完成后计划使用以下流程复位课堂演示数据：

```powershell
dotnet ef database drop --force `
  --project .\src\LibrarySeatReservation.Web `
  --startup-project .\src\LibrarySeatReservation.Web

dotnet ef database update `
  --project .\src\LibrarySeatReservation.Web `
  --startup-project .\src\LibrarySeatReservation.Web

dotnet run --project .\src\LibrarySeatReservation.Web
```

当前未验证这些命令，也没有可删除或重建的数据库。

## 9. SQL 脚本说明

本目录不提供手工建表 SQL，原因是项目固定采用 Code First。后续如需生成只读交付脚本，应从已验证 Migration 导出：

```powershell
dotnet ef migrations script --idempotent
```

在 Migration 完成前，不应手工编写一套可能与 Entity 不一致的 SQL 作为替代。

## 10. 首次数据库验收清单

- [ ] Migration 和 ModelSnapshot 已生成。
- [ ] `dotnet ef database update` 成功。
- [ ] 4 张核心表、外键、CHECK、RowVersion 和两个过滤唯一索引存在。
- [ ] 2 个用户、1 个管理员、8 个座位、3 条预约已初始化。
- [ ] 连续运行两次初始化器，数量不增加。
- [ ] 首页、体验账号切换和管理员登录能读取种子数据。
- [ ] README 已记录真实账号、命令和数据库复位步骤。
