# Unity编辑器操作步骤指南

## 📋 作业完成情况概览

### ✅ 已完成的内容
1. **C#脚本** (位于 `Assets/Scripts/` 文件夹)
   - `SceneLoader.cs` - 场景切换管理器
   - `PlayerController.cs` - 玩家移动控制
   - `InteractableObject.cs` - 可交互对象
   - `InteractionSystem.cs` - 交互系统

2. **设计文档**
   - `Design_Documentation.docx` - 包含设计规范、故事板、情绪板、项目链接、团队协作证据

### 📝 需要在Unity编辑器中完成的操作步骤

---

## 第一部分：设置场景

### 步骤1：创建菜单场景 (MenuScene)

1. **打开Unity编辑器**，加载你的项目

2. **创建新场景**：
   - 点击顶部菜单 `File` → `New Scene`
   - 选择 `Basic (Built-in)` 模板
   - 点击 `Create`

3. **保存场景**：
   - 点击 `File` → `Save Scene As...`
   - 导航到 `Assets/Scenes/` 文件夹
   - 命名为 `MenuScene`
   - 点击 `Save`

4. **设置场景背景**：
   - 在 `Hierarchy` 窗口中点击 `Main Camera`
   - 在右侧 `Inspector` 窗口中找到 `Camera` 组件
   - 找到 `Background` 属性，点击颜色框
   - 选择深灰色 (R:45, G:45, B:45 或十六进制 #2D2D2D)

---

### 步骤2：创建菜单UI

1. **创建Canvas**（画布）：
   - 在 `Hierarchy` 窗口空白处**右键点击**
   - 选择 `UI` → `Canvas`
   - 这会创建一个Canvas和一个EventSystem

2. **设置Canvas**：
   - 在 `Hierarchy` 中点击选中 `Canvas`
   - 在 `Inspector` 中找到 `Canvas` 组件
   - 找到 `Render Mode`，确保是 `Screen Space - Overlay`

3. **添加游戏标题**：
   - 在 `Hierarchy` 中**右键点击 Canvas**
   - 选择 `UI` → `Text - TextMeshPro`
   - 如果弹出导入窗口，点击 `Import TMP Essentials`
   - 选中创建的 `Text (TMP)` 对象
   - 在 `Inspector` 中修改：
     - **Text Input**: 输入 `EXPLORATION GAME`
     - **Font Size**: 72
     - **Color**: 白色 (White)
     - **Alignment**: 居中 (Center)
   - 在 `Rect Transform` 组件中：
     - 点击左上角的锚点图标，选择顶部居中 (Top Center)
     - 设置 `Pos Y` 为 `-100`

4. **创建START GAME按钮**：
   - **右键点击 Canvas** → `UI` → `Button - TextMeshPro`
   - 选中创建的 `Button` 对象，按 `F2` 重命名为 `StartButton`
   - 在 `Inspector` 中修改按钮大小：
     - `Rect Transform` → `Width`: 300, `Height`: 60
     - 点击锚点图标选择中间居中 (Middle Center)
     - 设置 `Pos Y` 为 `20`
   - 展开 `StartButton`，点击 `Text (TMP)` 子对象
     - 修改文本为 `START GAME`
     - 字体大小改为 28
     - 颜色改为白色
   - 点击 `StartButton`（父对象）
     - 找到 `Image` 组件
     - 修改 `Color` 为灰色 (R:74, G:74, B:74 或 #4A4A4A)

5. **创建INSTRUCTIONS按钮**：
   - **右键点击 Canvas** → `UI` → `Button - TextMeshPro`
   - 重命名为 `InstructionsButton`
   - 设置 `Width`: 300, `Height`: 60
   - 设置 `Pos Y` 为 `-60` (在StartButton下方40像素)
   - 修改按钮文本为 `INSTRUCTIONS`
   - 设置相同的灰色背景和白色文字

6. **创建QUIT按钮**：
   - **右键点击 Canvas** → `UI` → `Button - TextMeshPro`
   - 重命名为 `QuitButton`
   - 设置 `Width`: 300, `Height`: 60
   - 设置 `Pos Y` 为 `-140`
   - 修改按钮文本为 `QUIT`
   - 设置相同的灰色背景和白色文字

---

### 步骤3：添加场景切换脚本

1. **创建空物体存放脚本**：
   - 在 `Hierarchy` 中**右键点击空白处** → `Create Empty`
   - 按 `F2` 重命名为 `SceneManager`

2. **附加SceneLoader脚本**：
   - 选中 `SceneManager` 对象
   - 在 `Inspector` 底部点击 `Add Component`
   - 输入 `SceneLoader`，点击出现的 `SceneLoader` 脚本

3. **设置按钮点击事件**（START GAME按钮）：
   - 在 `Hierarchy` 中选中 `StartButton`
   - 在 `Inspector` 中找到 `Button` 组件
   - 向下滚动找到 `On Click ()` 区域
   - 点击 `+` 号添加事件
   - 将 `Hierarchy` 中的 `SceneManager` 拖到槽中
   - 点击 `No Function` 下拉菜单
   - 选择 `SceneLoader` → `LoadGameScene ()`

4. **设置QUIT按钮**：
   - 选中 `QuitButton`
   - 在 `On Click ()` 中点击 `+`
   - 拖动 `SceneManager` 到槽中
   - 选择 `SceneLoader` → `QuitGame ()`

---

### 步骤4：设置Build Settings（重要！）

1. **打开Build Settings**：
   - 点击 `File` → `Build Settings...`

2. **添加场景**：
   - 点击 `Add Open Scenes` 添加当前菜单场景
   - 你会看到 `Scenes/MenuScene` 出现在列表中

---

## 第二部分：创建游戏场景

### 步骤5：创建游戏场景 (GameScene)

1. **创建新场景**：
   - `File` → `New Scene` → `Basic (Built-in)`

2. **保存场景**：
   - `File` → `Save Scene As...`
   - 命名为 `GameScene`
   - 保存到 `Assets/Scenes/`

3. **添加场景到Build Settings**：
   - `File` → `Build Settings...`
   - 点击 `Add Open Scenes`
   - 确保有两个场景：`MenuScene` 和 `GameScene`

---

### 步骤6：创建玩家

1. **创建玩家物体**：
   - `Hierarchy` 右键 → `3D Object` → `Capsule`
   - 重命名为 `Player`

2. **设置玩家位置**：
   - 在 `Transform` 组件中设置 `Position` 为 (0, 1, 0)

3. **添加刚体组件**：
   - 选中 `Player`
   - `Inspector` 中点击 `Add Component`
   - 搜索 `Rigidbody`，点击添加
   - 在 `Rigidbody` 组件中：
     - **取消勾选** `Use Gravity`（如果使用自定义重力）
     - 或者保持勾选，根据你的需求

4. **添加PlayerController脚本**：
   - 点击 `Add Component`
   - 搜索 `PlayerController`，点击添加

5. **设置相机**：
   - 在 `Hierarchy` 中点击 `Main Camera`
   - 将它拖到 `Player` 物体上（使其成为Player的子物体）
   - 选中 `Main Camera`
   - 设置 `Position` 为 (0, 0.8, 0)（眼睛高度）
   - 在 `PlayerController` 脚本组件中：
     - 找到 `Camera Transform` 属性
     - 将 `Main Camera` 拖到槽中

---

### 步骤7：创建游戏环境

1. **创建地面**：
   - `Hierarchy` 右键 → `3D Object` → `Plane`
   - 重命名为 `Ground`
   - 设置 `Scale` 为 (10, 1, 10)

2. **创建墙壁**（使用Cube）：
   - `Hierarchy` 右键 → `3D Object` → `Cube`
   - 重命名为 `Wall1`
   - 设置 `Position` 为 (0, 2.5, -25)
   - 设置 `Scale` 为 (50, 5, 1)
   - 复制粘贴创建其他三面墙：
     - `Wall2`: Position (0, 2.5, 25), Scale (50, 5, 1)
     - `Wall3`: Position (-25, 2.5, 0), Scale (1, 5, 50)
     - `Wall4`: Position (25, 2.5, 0), Scale (1, 5, 50)

3. **设置墙壁颜色**（可选）：
   - 创建一个材质：
     - 在 `Project` 窗口中**右键** → `Create` → `Material`
     - 命名为 `WallMat`
     - 点击材质，在 `Inspector` 中选择灰色
   - 将材质拖到每个墙壁上

---

### 步骤8：创建可交互对象

1. **创建交互对象**（使用Cube）：
   - `Hierarchy` 右键 → `3D Object` → `Cube`
   - 重命名为 `InteractableCube`
   - 设置 `Position` 为 (5, 1, 5)

2. **添加InteractableObject脚本**：
   - 选中 `InteractableCube`
   - `Add Component` → `InteractableObject`
   - 在 `Inspector` 中设置：
     - **Interaction Prompt**: `按 E 交互`
     - **Can Interact Multiple Times**: 勾选（可选）
     - **Highlight Color**: 黄色

3. **更改对象颜色**：
   - 创建一个新材质 `InteractableMat`
   - 设置为醒目的颜色（如红色 #FF6B6B）
   - 拖到 `InteractableCube` 上

4. **添加更多交互对象**（可选）：
   - 复制 `InteractableCube`
   - 修改位置和颜色
   - 建议创建2-3个不同颜色的交互对象

---

### 步骤9：设置交互系统

1. **创建空物体**：
   - `Hierarchy` 右键 → `Create Empty`
   - 重命名为 `GameManager`

2. **添加InteractionSystem脚本**：
   - 选中 `GameManager`
   - `Add Component` → `InteractionSystem`

3. **设置交互系统参数**：
   - **Camera Transform**: 将 `Main Camera` 拖到槽中
   - **Interaction Range**: 3
   - **Interactable Layer**: 点击选择 `Default`（或创建新的Layer）

4. **创建UI提示文本**：
   - `Hierarchy` 中右键 `Canvas` → `UI` → `Text - TextMeshPro`
   - 重命名为 `InteractionText`
   - 设置位置在屏幕底部中央
   - 字体大小 24，颜色白色
   - 在 `InteractionSystem` 脚本中将此文本拖到 `Interaction Text` 槽中

---

### 步骤10：添加返回菜单功能

1. **创建返回按钮**：
   - `Hierarchy` 右键 `Canvas` → `UI` → `Button - TextMeshPro`
   - 重命名为 `BackToMenuButton`
   - 设置 `Width`: 200, `Height`: 50
   - 设置锚点为左上角 (Top Left)
   - 设置 `Pos X`: 120, `Pos Y`: -40
   - 修改文本为 `返回菜单`

2. **设置按钮事件**：
   - 选中 `BackToMenuButton`
   - 在 `Button` 组件的 `On Click ()` 中点击 `+`
   - 创建一个空物体 `SceneLoader`（如果没有）
   - 附加 `SceneLoader` 脚本
   - 将 `SceneLoader` 拖到按钮事件的槽中
   - 选择 `SceneLoader` → `LoadMenuScene ()`

---

### 步骤11：添加光照

1. **添加环境光**：
   - 在 `Hierarchy` 中点击 `Directional Light`
   - 在 `Inspector` 中调整：
     - **Intensity**: 1
     - **Color**: 白色
   - 旋转灯光以获得好看的阴影（例如 Rotation: X:50, Y:30, Z:0）

2. **添加更多光源**（可选）：
   - `Hierarchy` 右键 → `Light` → `Point Light`
   - 放在交互对象附近增加视觉效果

---

## 第三部分：使用ProBuilder创建自定义形状（可选但推荐）

### 步骤12：安装和配置ProBuilder

1. **安装ProBuilder**（如果尚未安装）：
   - `Window` → `Package Manager`
   - 点击 `Packages:` 下拉，选择 `Unity Registry`
   - 搜索 `ProBuilder`
   - 点击 `Install`

2. **打开ProBuilder窗口**：
   - `Tools` → `ProBuilder` → `ProBuilder Window`
   - 可以拖动窗口到侧边栏方便使用

---

### 步骤13：创建ProBuilder对象

1. **创建自定义形状**：
   - 在 `ProBuilder` 窗口中点击 `New Shape`
   - 选择 `Cube` 或其他形状
   - 点击场景放置

2. **编辑形状**：
   - 选中ProBuilder对象
   - 点击 `ProBuilder` 窗口中的 `Face Selection`（面选择）
   - 点击对象的面进行选择和操作
   - 使用 `Extrude` 工具拉伸面
   - 使用 `Move`, `Rotate`, `Scale` 工具调整

3. **将ProBuilder对象设为可交互**：
   - 选中ProBuilder对象
   - `Add Component` → `InteractableObject`
   - 设置交互属性

---

## 第四部分：构建设置与WebGL上传

### 步骤14：配置WebGL构建设置

1. **打开构建设置**：
   - `File` → `Build Settings...`

2. **选择平台**：
   - 在 `Platform` 列表中选择 `WebGL`
   - 点击 `Switch Platform`（可能需要一些时间）

3. **调整WebGL设置**：
   - 点击 `Player Settings...` 按钮
   - 在 `Inspector` 中设置：
     - **Product Name**: Exploration Game
     - **Company Name**: 你的名字
     - **Resolution**: 1280x720

4. **构建项目**：
   - 在 `Build Settings` 窗口中
   - 点击 `Build` 或 `Build And Run`
   - 选择一个空文件夹保存构建文件（如 `Builds/WebGL`）
   - 等待构建完成

---

### 步骤15：上传到itch.io

1. **注册/登录itch.io**：
   - 访问 https://itch.io
   - 注册账号或登录

2. **创建新项目**：
   - 点击右上角 `Create new project`
   - **Title**: Exploration Game - Grey Box Prototype
   - **Kind of project**: HTML
   - **Classification**: Game

3. **上传文件**：
   - 找到构建文件夹（`Builds/WebGL`）
   - 压缩文件夹中的所有文件为ZIP
   - 在itch.io页面中点击 `Upload`
   - 上传ZIP文件
   - **勾选** `This file will be played in the browser`

4. **设置游戏页面**：
   - 添加描述：
     ```
     A grey box prototype demonstrating UX principles and basic interactions.
     
     Controls:
     - WASD: Move
     - Mouse: Look around
     - E: Interact with objects
     - ESC: Unlock mouse / Menu
     ```
   - 上传截图作为封面图片
   - 设置标签：`unity`, `webgl`, `prototype`, `greybox`

5. **发布项目**：
   - 点击 `Save` 保存
   - 点击 `View page` 查看页面
   - 复制URL链接用于提交

---

## 第五部分：GitHub仓库设置

### 步骤16：创建GitHub仓库

1. **注册/登录GitHub**：
   - 访问 https://github.com

2. **创建新仓库**：
   - 点击 `New` 或 `+` → `New repository`
   - **Repository name**: PROG2001-A1-GreyBox
   - **Description**: Unity Grey Box prototype for Assessment 1
   - 选择 `Public` 或 `Private`
   - **不要**勾选 `Initialize this repository with a README`
   - 点击 `Create repository`

3. **上传Unity项目**：
   - 安装GitHub Desktop（推荐新手使用）
   - 或按照GitHub页面上的命令行指示

4. **使用GitHub Desktop**：
   - 打开GitHub Desktop
   - `File` → `Add local repository`
   - 选择你的项目文件夹
   - 点击 `Publish repository`
   - 确保 **不要**勾选 `Keep this code private`（如果是Public仓库）

---

## 第六部分：最终检查清单

### ✅ 提交前检查

- [ ] MenuScene 场景存在且功能正常
- [ ] GameScene 场景存在且可玩
- [ ] 场景切换功能正常（Menu ↔ Game）
- [ ] 玩家可以移动和查看
- [ ] 至少有一个可交互对象
- [ ] 交互有视觉反馈（高亮、颜色变化）
- [ ] 使用了ProBuilder创建的对象（可选但加分）
- [ ] WebGL构建成功
- [ ] itch.io项目上传成功并可以运行
- [ ] GitHub仓库已创建并上传
- [ ] Design_Documentation.docx 已完成并包含所有必要内容

---

## 🎯 作业评分标准对应

| 评分标准 | 完成情况 |
|---------|---------|
| **菜单场景** | ✅ 已创建UI和脚本 |
| **3D场景** | ✅ 已创建环境和玩家 |
| **可交互对象** | ✅ InteractableObject脚本 |
| **ProBuilder使用** | ⚠️ 需要在Unity中创建 |
| **场景导航** | ✅ SceneLoader脚本 |
| **设计文档** | ✅ Design_Documentation.docx |
| **WebGL上传到itch.io** | ⚠️ 需要手动上传 |
| **GitHub链接** | ⚠️ 需要创建仓库 |

---

## 📞 常见问题解决

### 问题1：场景切换不工作
**解决**：检查 `File` → `Build Settings` → `Scenes In Build` 中是否添加了两个场景

### 问题2：玩家无法移动
**解决**：
- 确保Player有Rigidbody组件
- 检查PlayerController脚本的Camera Transform是否设置正确
- 确保游戏窗口有焦点（点击游戏画面）

### 问题3：交互不工作
**解决**：
- 检查交互对象是否有Collider组件
- 确保交互对象在正确的Layer上
- 检查InteractionSystem的Camera Transform设置

### 问题4：WebGL构建失败
**解决**：
- 确保没有编译错误（查看Console窗口）
- 尝试切换平台为WebGL后重启Unity
- 检查Player Settings中的Company Name和Product Name是否填写

---

## 📝 提交说明

1. **不要上传Unity文件到Blackboard**！
2. **只提交** `Design_Documentation.docx` 文档
3. 确保文档中包含：
   - ✅ itch.io项目链接
   - ✅ GitHub仓库链接
   - ✅ 设计规范
   - ✅ 故事板
   - ✅ 情绪板
   - ✅ 团队协作证据

祝你好运！🎮
