# 音频情绪分析诊断指南

## 问题现象

学生开始考试后，AI监控页面显示：
- ✅ 面部情绪分析正常（DeepFace数据）
- ❌ 音频情绪分析无数据（emotion2vec）
- ❓ 心率数据异常（PPG）

## 代码验证结果

### 代码实现正确 ✅

经过深度调研，音频情绪分析的代码实现完全正确：

**1. AudioExtractor初始化**（`services/emotion-ai/services/rtsp_consumer.py:53-54`）
```python
self.emotion2vec = get_emotion2vec_analyzer()
```

**2. 音频提取器启动**（`services/emotion-ai/services/rtsp_consumer.py:156-158`）
```python
self.audio_extractor.set_audio_callback(self._on_audio_ready)
await self.audio_extractor.start()
logger.info("audio_extractor_started", session_id=self.session_id)
```

**3. emotion2vec分析调用**（`services/emotion-ai/services/rtsp_consumer.py:548-555`）
```python
# 使用emotion2vec分析音频情绪
result = self.emotion2vec.analyze_audio_array(audio_data)
if result is None:
    logger.debug("no_audio_emotion_detected", session_id=self.session_id)
    return
self.audio_emotions_detected += 1
```

### 代码逻辑完整 ✅

- ✅ AudioExtractor依赖ffmpeg从RTSP流提取音频
- ✅ 回调函数`_on_audio_ready`正确设置
- ✅ emotion2vec analyzer正确初始化
- ✅ 音频数据正确传递给emotion2vec

## 可能的问题原因

### 原因1：ffmpeg未安装或配置错误 ⚠️

**诊断方法**：
```bash
# 检查ffmpeg是否安装
which ffmpeg
ffmpeg -version

# 如果未安装，安装ffmpeg
sudo apt-get update
sudo apt-get install ffmpeg -y
```

**验证**：检查AI服务日志中是否有ffmpeg相关错误

---

### 原因2：MediaMTX RTSP流无音频轨道 ⚠️

**诊断方法**：
```bash
# 使用ffprobe检查RTSP流
ffprobe rtsp://192.168.0.95:8554/exam_uuid_participant_id
```

**期望输出**：
```
Stream #0:0: Video: h264 ...
Stream #0:1: Audio: opus ...  # ← 应该有这一行
```

**如果没有音频轨道**：
1. 检查浏览器WHIP推流是否包含音频
2. 检查MediaMTX配置是否禁用了音频

---

### 原因3：浏览器WHIP推流未发送音频 ⚠️

**诊断方法**：
1. 打开浏览器开发者工具 → Network
2. 找到 `/api/webrtc/whip` 请求
3. 查看Request Payload（SDP内容）
4. 搜索 `m=audio` 字段

**期望内容**：
```sdp
m=video 9 UDP/TLS/RTP/SAVPF 96 97
a=rtpmap:96 VP8/90000
...
m=audio 9 UDP/TLS/RTP/SAVPF 111  # ← 应该有audio部分
a=rtpmap:111 opus/48000/2
```

**如果没有audio部分**：
- 检查`useDeviceManager`是否正确获取音频流
- 检查`mediaStream.audioStream`是否有效
- 检查WebRTC Publisher是否正确添加音频轨道

---

### 原因4：emotion2vec模型初始化失败 ⚠️

**诊断方法**：
```bash
# 检查AI服务启动日志
grep "emotion2vec" /path/to/emotion-ai.log

# 期望看到
# [INFO] emotion2vec_initialized
```

**如果初始化失败**：
1. 检查模型文件是否存在：`models/emotion2vec/`
2. 检查Python依赖是否完整：`pip list | grep emotion`
3. 手动测试emotion2vec：
```python
from services.emotion2vec_analyzer import get_emotion2vec_analyzer
analyzer = get_emotion2vec_analyzer()
# 应该不报错
```

---

### 原因5：AudioExtractor启动失败 ⚠️

**诊断方法**：
```bash
# 检查AI服务日志
grep "audio_extractor" /path/to/emotion-ai.log

# 期望看到
# [INFO] audio_extractor_started session_id=xxx
```

**如果未启动**：
1. 检查RTSP连接是否成功
2. 检查ffmpeg进程是否启动：`ps aux | grep ffmpeg`
3. 检查音频回调是否设置：`set_audio_callback`调用日志

---

## 诊断步骤（推荐顺序）

### 步骤1：检查AI服务日志 🔍
```bash
# 进入AI服务目录
cd /home/aaron/心理测试平台/emotion/

# 查看最新日志
tail -f emotion-ai.log | grep -i "audio\|emotion2vec\|ffmpeg"
```

**关键信息**：
- `audio_extractor_started` - 音频提取器启动成功
- `no_audio_emotion_detected` - 音频分析失败（但尝试了）
- `audio_emotions_detected` - 音频情绪检测成功计数
- `ffmpeg` - ffmpeg相关错误

---

### 步骤2：测试RTSP流音频 🔍
```bash
# 等学生开始考试后，获取streamName
# 例如：exam_uuid_participant_id

# 测试RTSP流
ffprobe rtsp://192.168.0.95:8554/exam_uuid_participant_id

# 如果有音频轨道，尝试提取音频
ffmpeg -i rtsp://192.168.0.95:8554/exam_uuid_participant_id \
  -vn -acodec pcm_s16le -ar 16000 -ac 1 -f wav \
  test_audio.wav -t 10
```

---

### 步骤3：检查浏览器推流 🔍
1. 打开考试页面
2. F12 → Network → 过滤 `whip`
3. 找到 `POST /api/webrtc/whip` 请求
4. 查看Request Payload
5. 确认有 `m=audio` 字段

---

### 步骤4：检查MediaMTX日志 🔍
```bash
# MediaMTX运行在Windows，需要查看Windows日志
# 或通过API检查
curl http://192.168.0.95:8889/v3/paths/list
```

**期望输出**：
```json
{
  "items": [
    {
      "name": "exam_uuid_participant_id",
      "ready": true,
      "tracks": ["H264", "Opus"]  // ← 应该有Opus音频
    }
  ]
}
```

---

### 步骤5：验证emotion2vec模型 🔍
```bash
# 进入AI服务环境
cd /home/aaron/心理测试平台/emotion/
source venv/bin/activate  # 如果使用虚拟环境

# 测试emotion2vec
python -c "
from services.emotion2vec_analyzer import get_emotion2vec_analyzer
import numpy as np

analyzer = get_emotion2vec_analyzer()
print('✅ emotion2vec初始化成功')

# 测试分析（16kHz 3秒音频）
fake_audio = np.random.randn(48000).astype(np.float32)
result = analyzer.analyze_audio_array(fake_audio)
print('✅ emotion2vec分析成功:', result)
"
```

---

## 修复方案

### 修复方案1：安装ffmpeg
```bash
sudo apt-get update
sudo apt-get install ffmpeg -y
```

### 修复方案2：配置MediaMTX音频支持
编辑 `mediamtx.yml`：
```yaml
paths:
  all:
    # 确保音频未被禁用
    disablePublisherOverride: no
    overridePublisher: no
```

### 修复方案3：修复浏览器推流
检查 `useDeviceManager.ts`：
```typescript
// 确保音频流正确获取
const audioStream = await navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    channelCount: 1,
    sampleRate: 16000,  // emotion2vec需要16kHz
  },
});
```

### 修复方案4：重装emotion2vec依赖
```bash
cd /home/aaron/心理测试平台/emotion/
pip uninstall funasr -y
pip install funasr modelscope
```

---

## 验证修复

### 验证步骤1：启动AI服务
```bash
cd /home/aaron/心理测试平台/emotion/
python app_lan.py
```

### 验证步骤2：启动考试
1. 学生加入考试
2. 确保摄像头和麦克风权限已授予
3. 开始考试

### 验证步骤3：检查日志
```bash
# 实时监控日志
tail -f emotion-ai.log | grep "audio_emotions_detected"

# 期望看到计数增加
# [INFO] audio_emotions_detected=1 session_id=xxx
# [INFO] audio_emotions_detected=2 session_id=xxx
```

### 验证步骤4：检查数据库
```sql
-- 检查AI分析聚合数据
SELECT
  id,
  session_id,
  dominant_emotion,
  emotion_distribution
FROM ai_analysis_aggregates
ORDER BY created_at DESC
LIMIT 5;
```

**期望结果**：
- `emotion_distribution` 字段应该包含音频情绪数据
- 格式：`{"video": {...}, "audio": {...}}`

---

## 常见问题 FAQ

### Q1: 为什么面部情绪正常但音频没数据？
A: DeepFace和emotion2vec是独立模块。可能原因：
- ffmpeg未安装
- RTSP流无音频轨道
- 浏览器未发送音频

### Q2: 如何确认浏览器成功发送音频？
A: 查看浏览器Network → whip请求的SDP，应该有`m=audio`字段

### Q3: 如何测试emotion2vec是否正常？
A: 运行上述"验证emotion2vec模型"步骤

### Q4: MediaMTX是否需要特殊音频配置？
A: 默认配置支持音频，无需特殊配置

---

## 相关文件

### 前端
- `apps/web/src/hooks/useDeviceManager.ts` - 设备管理
- `apps/web/src/services/webrtcPublisher.ts` - WHIP推流

### 后端
- `apps/api/src/webrtc/webrtc.controller.ts` - WHIP代理

### AI服务
- `services/emotion-ai/services/rtsp_consumer.py` - RTSP消费
- `services/emotion-ai/services/audio_extractor.py` - 音频提取
- `services/emotion-ai/services/emotion2vec_analyzer.py` - 音频情绪分析

### 配置
- `mediamtx.yml` - MediaMTX配置
- `services/emotion-ai/config.py` - AI服务配置

---

## 联系支持

如果以上步骤均无法解决问题，请提供：
1. AI服务完整日志
2. MediaMTX日志
3. 浏览器Network的WHIP请求详情
4. ffprobe输出结果
