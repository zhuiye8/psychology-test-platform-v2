# AI分析服务

心理测试平台2.0重构版 - AI情绪分析服务

## 功能

- 🎥 **视频情绪分析**：DeepFace实时识别7种情绪（自动下载模型）
- 🎤 **音频情绪分析**：emotion2vec语音情绪识别（支持9种情绪）
- ❤️ **心率检测**：PPG算法非接触式心率监测
- 👁️ **注意力监测**：视线追踪与分心检测
- ⚠️ **异常检测**：多人入镜、无人检测等异常事件
- 📊 **数据持久化**：实时写入后端API（批量优化）

## 技术栈

- **框架**：Python 3.11 + FastAPI + uvicorn
- **AI模型**：
  - DeepFace 0.0.95 + YOLOv8人脸检测（高精度）
  - emotion2vec (FunASR)（音频情绪分析）
  - OpenCV 4.10.0（视频处理）
- **数据处理**：NumPy, SciPy
- **日志**：structlog（结构化JSON日志）
- **HTTP客户端**：httpx（异步）

## 快速开始

### 1. 安装依赖

**推荐使用Conda（Python 3.11）**：

```bash
# 创建conda环境
conda create -n emotion python=3.11 -y
conda activate emotion

# 安装依赖（包含DeepFace+YOLOv8+emotion2vec）
cd /home/aaron/心理测试平台/refactor/services/emotion-ai
pip install -r requirements.txt
```

**或使用venv**：

```bash
cd /home/aaron/心理测试平台/refactor/services/emotion-ai
python3.11 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

pip install -r requirements.txt
```

**依赖说明**：
- ✅ **DeepFace + YOLOv8**：视频情绪识别（YOLOv8人脸检测，准确度高）
- ✅ **emotion2vec**：音频情绪分析（音视频协同分析）
- ✅ **TensorFlow**：由DeepFace自动安装（默认CPU版本）

**可选：GPU加速（需要NVIDIA GPU + CUDA 11.8+）**：

```bash
# 安装完基础依赖后，替换TensorFlow为GPU版本：
pip install tensorflow[and-cuda]==2.16.2
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑.env文件，配置后端API地址等
```

### 3. 启动服务

```bash
python main.py
```

服务将运行在 `http://0.0.0.0:5678`

### 4. 查看文档

访问 `http://localhost:5678/docs` 查看API文档（仅开发环境）

### 5. 初始化AI模型（可选）

**首次使用时，需要下载模型**（推荐手动触发）：

```bash
# 初始化DeepFace模型（约15-30秒，下载约150MB）
curl -X POST http://localhost:5678/api/models/initialize \
  -H "Content-Type: application/json" \
  -d '{"model_name": "deepface"}'

# 初始化emotion2vec模型（约3-5分钟，下载约500MB，可选）
curl -X POST http://localhost:5678/api/models/initialize \
  -H "Content-Type: application/json" \
  -d '{"model_name": "emotion2vec"}'

# 初始化所有模型
curl -X POST http://localhost:5678/api/models/initialize \
  -H "Content-Type: application/json" \
  -d '{"model_name": "all"}'

# 查看模型加载状态
curl http://localhost:5678/api/models/status
```

**注意**：
- 模型是懒加载的，首次调用分析API时也会自动下载
- DeepFace模型存储在 `services/emotion-ai/models/deepface_models/`
- emotion2vec模型存储在 `services/emotion-ai/models/emotion2vec_models/`

## 目录结构

```
emotion-ai/
├── main.py                      # FastAPI入口
├── config.py                    # 配置管理（pydantic-settings）
├── requirements.txt             # Python依赖
├── .env.example                 # 环境变量模板
├── api/                         # REST API路由
│   ├── health.py                # 健康检查
│   └── rtsp.py                  # RTSP流控制
├── services/                    # 核心服务
│   ├── rtsp_consumer.py         # RTSP流消费器
│   ├── rtsp_manager.py          # RTSP管理器
│   └── data_writer.py           # HTTP客户端（写入后端）
├── models/                      # AI模型
│   ├── deepface_analyzer.py     # DeepFace情绪识别
│   ├── emotion2vec_analyzer.py  # emotion2vec音频分析
│   ├── ppg_detector.py          # PPG心率检测
│   └── video_processor.py       # 视频帧处理工具
└── utils/                       # 工具类
    └── logger.py                # 结构化日志
```

## API端点

### 健康检查
```bash
GET /api/health       # 服务健康状态
GET /api/ping         # 快速健康检查
```

### 模型管理
```bash
GET  /api/models/status           # 查看模型加载状态
POST /api/models/initialize       # 初始化指定模型
```

### RTSP流控制
```bash
POST /api/rtsp/start              # 启动RTSP流消费
POST /api/rtsp/stop               # 停止RTSP流消费
GET  /api/rtsp/status             # 获取所有流状态
GET  /api/rtsp/status/{session_id} # 获取指定流状态
```

**启动流示例**：
```bash
curl -X POST http://localhost:5678/api/rtsp/start \
  -H "Content-Type: application/json" \
  -d '{
    "stream_name": "exam_uuid_participant_id",
    "session_id": "ai_session_id",
    "exam_result_id": "result_id"
  }'
```

## 开发规范

- 单文件≤300行
- 类型提示全覆盖
- 结构化日志记录
- 完整错误处理
- 单元测试（pytest）

## 与后端API通信

AI服务通过HTTP API将分析结果写入后端数据库：

```
AI服务 (5678) → POST /api/ai/checkpoints → 后端API (4001) → PostgreSQL
```

需要在后端配置AI服务的访问Token。

## 核心优化点

### 1. DeepFace使用优化
**原项目**：手动管理模型路径、使用OpenCV检测器（准确度低）
**重构版**：使用YOLOv8检测器（高准确度），自动下载模型

```python
from deepface import DeepFace

result = DeepFace.analyze(
    img_path=frame,
    actions=['emotion'],
    enforce_detection=False,  # 提高容错性
    detector_backend='yolov8',  # YOLOv8高精度检测
    silent=True
)
```

**支持的检测器后端**（按准确度排序）：
1. `yolov8` - **推荐**，最准确（需安装ultralytics）
2. `retinaface` - 高准确度，速度较快
3. `mtcnn` - 中等准确度
4. `ssd` - 快速但准确度较低
5. `opencv` - 最快但准确度最低

**配置方式**：在`.env`文件中设置`DEEPFACE_BACKEND=yolov8`

### 2. emotion2vec使用优化
**原项目**：手动snapshot_download、验证文件、处理快照目录
**重构版**：使用FunASR的AutoModel（官方推荐）

```python
from funasr import AutoModel

# 自动下载并加载模型
model = AutoModel(model="iic/emotion2vec_plus_seed")
result = model.generate(audio_path)
```

### 3. 架构改进
**原项目**（emotion/app_lan.py）：
- ❌ 2300行单文件
- ❌ Flask + SocketIO
- ❌ 全局变量混乱
- ❌ 缺少类型提示

**重构版**：
- ✅ 模块化架构（单文件≤300行）
- ✅ FastAPI异步高性能
- ✅ 完整类型提示
- ✅ 结构化日志
- ✅ 配置环境变量化
- ✅ 数据批量写入优化

## License

MIT
