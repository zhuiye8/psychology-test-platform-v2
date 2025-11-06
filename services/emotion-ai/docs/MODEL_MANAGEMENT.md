# AI模型管理系统 - 使用文档

## 概述

本文档说明AI模型管理系统的架构、功能和使用方法。

### 已完成功能

✅ **Phase 1**: 配置环境变量强制使用项目目录
✅ **Phase 2**: 创建Web模型管理页面和API
✅ **Phase 2.5**: 修正模型配置和API设计（基于DeepFace架构研究）

---

## 目录结构

所有AI模型都存储在项目目录下，方便统一管理和备份：

```
refactor/services/emotion-ai/
└── models/
    ├── deepface_models/              # DeepFace相关模型
    │   └── .deepface/                # DeepFace固定子目录
    │       └── weights/
    │           ├── facial_expression_model_weights.h5  # 情绪分类模型 (5.7MB)
    │           └── yolov8n-face.pt          # YOLOv8人脸检测器 (6.8MB, 可选)
    └── emotion2vec_models/           # emotion2vec模型
        └── hub/iic/emotion2vec_plus_seed/   # 音频情绪模型 (500MB)
```

### 重要说明

1. **DeepFace模型路径**：DeepFace会在`DEEPFACE_HOME`下自动创建`.deepface/weights/`子目录
2. **YOLOv8存储位置**：YOLOv8检测器由DeepFace管理，存储在`deepface_models/.deepface/weights/`下
3. **emotion2vec路径**：ModelScope会在`MODELSCOPE_CACHE`下创建`hub/`子目录

### DeepFace架构说明（重要！）

DeepFace采用**三层架构**，不同层负责不同任务：

```
DeepFace.analyze(actions=['emotion'])
├── Layer 1: 人脸检测器 (Detector Backend)
│   ├── opencv (内置，无需下载，准确度中等)
│   ├── yolov8 (6.8MB, Google Drive, 准确度最高) ← 可选增强
│   └── 其他检测器 (retinaface, mtcnn等)
├── Layer 2: 情绪分类模型 (Emotion Model)
│   └── facial_expression_model_weights.h5 (5.7MB) ← 核心模型
└── Layer 3: 人脸识别模型 (Face Recognition, 可选)
    └── vgg_face_weights.h5 (580MB) ← 我们不使用
```

**关键理解**：
- **情绪分析只需Layer 1 + Layer 2**：检测器（opencv或yolov8）+ 情绪模型（5.7MB）
- **VGG-Face (580MB)是用于人脸识别的**，不是情绪识别，我们不需要它
- **YOLOv8是检测器增强包**：提供更好的人脸检测准确度，但非必需
- **总下载量约12MB**：情绪模型(5.7MB) + YOLOv8检测器(6.8MB, 可选)

---

## 配置说明

### 环境变量 (.env)

```bash
# 模型存储路径（项目目录）
DEEPFACE_HOME=./models/deepface_models
MODELSCOPE_CACHE=./models/emotion2vec_models

# DeepFace配置
DEEPFACE_BACKEND=yolov8              # 推荐yolov8，准确度最高
DEEPFACE_ENFORCE_DETECTION=false     # 提高容错性
```

### 自动Fallback机制

- 如果YOLOv8下载失败（Google Drive被墙），自动切换到opencv检测器
- 配置会在`config.py`的`model_post_init()`中自动应用

---

## API端点

### 1. 获取所有模型信息

```bash
GET http://localhost:5678/api/models/info
```

**响应示例**：
```json
{
  "success": true,
  "models": [
    {
      "model_id": "deepface",
      "display_name": "DeepFace 情绪分析引擎",
      "description": "情绪分类模型（5.7MB）- 识别7种情绪：angry, disgust, fear, happy, sad, surprise, neutral。自动使用当前配置的人脸检测器（opencv或yolov8）。",
      "status": "not_downloaded",
      "files": [
        {
          "name": "facial_expression_model_weights.h5",
          "path": "/path/to/facial_expression_model_weights.h5",
          "expected_size_mb": 5.7,
          "actual_size_mb": 0.0,
          "exists": false,
          "is_valid": false
        }
      ],
      "total_size_mb": 0.0,
      "initialized": false
    }
  ]
}
```

### 2. 获取单个模型信息

```bash
GET http://localhost:5678/api/models/info/{model_id}
```

支持的`model_id`：
- `deepface`
- `yolov8`
- `emotion2vec`

### 3. 初始化模型（触发下载）

```bash
POST http://localhost:5678/api/models/initialize
Content-Type: application/json

{
  "model_name": "deepface"  # 或 "yolov8", "emotion2vec", "ppg", "all"
}
```

**支持的模型名称**：
- `deepface`: DeepFace情绪分类模型（5.7MB）+ 当前配置的检测器
- `yolov8`: YOLOv8人脸检测器（6.8MB, 可选增强）
- `emotion2vec`: emotion2vec音频情绪分析（约500MB）
- `ppg`: PPG心率检测（无需下载）
- `all`: 初始化所有模型
```

**响应示例**：
```json
{
  "success": true,
  "message": "DeepFace model initialized successfully",
  "model_name": "deepface",
  "initialized": true
}
```

### 4. 验证模型完整性

```bash
POST http://localhost:5678/api/models/validate/{model_id}
```

**响应示例**：
```json
{
  "success": true,
  "model_id": "deepface",
  "is_valid": true,
  "message": "Model validation passed"
}
```

### 5. 删除模型

```bash
DELETE http://localhost:5678/api/models/{model_id}
```

⚠️ **警告**：此操作不可逆！删除后需要重新初始化才能下载。

---

## Web管理页面

访问地址：`http://localhost:4000/dashboard/ai-models`

### 功能特性

1. **模型卡片展示**
   - 模型名称、描述
   - 状态徽章（未下载、下载中、已下载、就绪、错误）
   - 文件列表和大小
   - 下载进度条

2. **操作按钮**
   - 🔽 **下载并初始化**：触发模型下载和初始化
   - 🛡️ **验证完整性**：检查文件大小和完整性
   - 🗑️ **删除模型**：删除模型文件（需确认）

3. **批量操作**
   - **初始化所有模型**：一键下载所有未初始化的模型
   - **刷新**：重新加载模型信息

4. **统计信息**
   - 已下载模型数量
   - 就绪模型数量
   - 总存储大小

---

## 使用流程

### 方案1：使用Web界面（推荐）

1. 启动AI服务：
```bash
cd refactor/services/emotion-ai
conda activate emotion
python main.py
```

2. 启动Web应用：
```bash
cd refactor/apps/web
pnpm dev
```

3. 打开浏览器访问：`http://localhost:4000/dashboard/ai-models`

4. 点击"初始化所有模型"或单独初始化每个模型

5. 等待下载完成（首次下载约3-10分钟，取决于网络速度）

6. 验证模型完整性

### 方案2：使用API直接初始化

```bash
# 初始化所有模型
curl -X POST http://localhost:5678/api/models/initialize \
  -H "Content-Type: application/json" \
  -d '{"model_name": "all"}'

# 或单独初始化
curl -X POST http://localhost:5678/api/models/initialize \
  -H "Content-Type: application/json" \
  -d '{"model_name": "deepface"}'
```

---

## 模型状态说明

| 状态 | 描述 | 操作建议 |
|------|------|----------|
| `not_downloaded` | 未下载 | 点击"下载并初始化" |
| `downloading` | 下载中 | 等待完成 |
| `downloaded` | 已下载但未初始化 | 点击"重新初始化" |
| `initializing` | 初始化中 | 等待完成 |
| `ready` | 就绪可用 | 验证完整性 |
| `error` | 错误 | 检查日志，可能需要删除重新下载 |

---

## 常见问题

### 1. YOLOv8下载失败

**现象**：日志显示Google Drive下载失败

**原因**：Google Drive在中国被墙

**解决方案**：
- **自动**：AI服务会自动fallback到opencv检测器
- **手动**：使用浏览器下载 https://drive.google.com/uc?id=1qcr9DbgsX3ryrz2uU8w4Xm3cOrRywXqb（6.8MB），手动放置到 `models/deepface_models/.deepface/weights/yolov8n-face.pt`

### 2. emotion2vec下载缓慢

**现象**：下载卡在某个百分比

**原因**：ModelScope服务器在国外

**解决方案**：
- 耐心等待（约5-10分钟）
- 或使用国内镜像源（需配置ModelScope环境变量）

### 3. 模型验证失败

**现象**：文件存在但验证不通过

**可能原因**：
- 下载未完成
- 网络中断导致文件损坏

**解决方案**：
1. 删除模型
2. 重新初始化
3. 如果仍然失败，检查磁盘空间

### 4. Web页面无法连接AI服务

**现象**：Web页面显示"无法连接到AI服务"

**检查**：
```bash
# 1. 检查AI服务是否运行
curl http://localhost:5678/health

# 2. 检查环境变量配置
cat refactor/apps/web/.env.local

# 3. 确认NEXT_PUBLIC_AI_SERVICE_URL正确
```

---

## 技术实现

### 后端服务

- **框架**：FastAPI
- **配置管理**：Pydantic Settings
- **日志**：Structlog（JSON格式）
- **模型管理器**：`services/model_manager.py`（单例模式）

### API路由

- `api/models.py`：模型管理API端点
- `api/health.py`：健康检查
- `api/rtsp.py`：RTSP流管理

### 前端页面

- **框架**：Next.js 15 + React 19
- **UI组件**：Ant Design
- **服务模块**：`services/aiModels.ts`
- **页面**：`app/dashboard/ai-models/page.tsx`
- **组件**：`components/ModelCard.tsx`

---

## 下一步计划

⏳ **Phase 3**: Docker预装模型方案
⏳ **Phase 4**: 启动脚本自动检查

---

## 更新日志

### 2025-10-20

- ✅ Phase 1: 配置环境变量强制使用项目目录
  - 添加`model_post_init()`到`config.py`
  - 设置`DEEPFACE_HOME`和`MODELSCOPE_CACHE`
  - 删除冗余的`ULTRALYTICS_CONFIG_DIR`
  - 添加YOLOv8下载失败自动fallback

- ✅ Phase 2: 创建Web模型管理页面和API
  - 新增`services/model_manager.py`（模型信息查询、验证、删除）
  - 扩展`api/models.py`（5个新端点）
  - 创建`apps/web/src/services/aiModels.ts`
  - 创建`apps/web/src/app/dashboard/ai-models/page.tsx`
  - 创建`ModelCard`组件
  - 添加导航菜单项
  - 配置环境变量`NEXT_PUBLIC_AI_SERVICE_URL`

- ✅ Phase 2.5: 修正模型配置和API设计（基于DeepFace架构研究）
  - **关键发现**：DeepFace三层架构 - 检测器 + 情绪模型 + 识别模型（可选）
  - 修正`DEEPFACE_MODELS`配置：从VGG-Face (580MB, 人脸识别) 改为 facial_expression_model_weights.h5 (5.7MB, 情绪分类)
  - 添加`_initialize_yolov8()`函数：独立初始化YOLOv8检测器
  - 更新模型描述：明确说明模型大小、用途和下载来源
  - 总下载量从错误的560MB降至正确的12MB（情绪模型5.7MB + YOLOv8检测器6.8MB）
  - 更新文档：添加DeepFace架构说明，澄清各模型作用

---

## 参考资料

- [DeepFace GitHub](https://github.com/serengil/deepface)
- [emotion2vec ModelScope](https://modelscope.cn/models/iic/emotion2vec_plus_seed)
- [FastAPI文档](https://fastapi.tiangolo.com/)
- [Next.js文档](https://nextjs.org/docs)
