# AI分析exam_result_id修复 - 测试验证指南

## ✅ 已完成的修复

### 1. 核心代码修复
**文件**: `apps/web/src/hooks/useAIConnection.ts:304`
- ✅ 添加了 `exam_result_id: resultId || null` 参数

### 2. 数据清理
- ✅ 删除了所有旧的checkpoint文件
- ✅ 清空了4个AI相关数据库表：
  - ai_sessions
  - ai_analysis_aggregates
  - ai_anomalies
  - ai_checkpoints

### 3. 日志增强
**AI服务** (`services/emotion-ai/api/rtsp.py`):
- ✅ 添加了exam_result_id接收日志
- ✅ 添加了null值警告

**Checkpoint文件写入器** (`services/emotion-ai/services/checkpoint_file_writer.py`):
- ✅ 添加了初始化日志
- ✅ 添加了null值警告

---

## 🧪 完整测试流程

### 准备工作

1. **确认服务运行状态**
```bash
# 检查前端服务（应该自动热重载，无需重启）
# 端口: 4000

# 检查后端服务
# 端口: 4001

# 重启AI服务（Python代码修改需要重启）
# 1. 找到AI服务进程并杀掉
pkill -f "python.*main.py"

# 2. 重新启动AI服务
cd services/emotion-ai
conda run -n emotion python main.py
# 端口: 5678
```

2. **打开浏览器开发者工具**
- 打开Network标签，筛选XHR/Fetch请求
- 打开Console标签，查看日志

3. **打开终端查看AI服务日志**
- 观察是否有exam_result_id接收日志
- 观察是否有警告信息

---

### 测试场景1：正常考试流程（重点验证）

**目标**: 验证exam_result_id正确传递并保存到checkpoint文件

#### 步骤：

1. **创建考试**
   - 访问教师端: http://localhost:4000/dashboard/exams
   - 创建一个新考试（确保启用AI监控）

2. **学生加入考试**
   - 访问: http://localhost:4000/exam/[examId]/join
   - 输入学号（如：123456）、姓名、访问码

3. **设备检测（可选跳过）**
   - 如果有设备检测页面，允许摄像头和麦克风
   - 此阶段exam_result_id应该为null（设计期望）

4. **开始答题**
   - 进入答题页面: `/exam/[examId]/session/[resultId]`
   - **关键**：URL中的resultId就是exam_result_id

5. **验证前端请求**
   
   **查看Network标签**:
   
   a) 查找 `POST http://localhost:4001/api/ai/sessions`
   - 请求体应包含: `"exam_result_id": "cmh..."`
   - ✅ 验证点：exam_result_id不为null
   
   b) 查找 `POST http://localhost:5678/api/rtsp/start`
   - 请求体应包含: `"exam_result_id": "cmh..."`
   - ✅ 验证点：exam_result_id与上面的值相同

6. **验证AI服务日志**
   
   在AI服务终端中查找：
   ```
   api_start_rtsp_requested | exam_result_id=cmh... | has_exam_result_id=True
   ```
   
   ✅ 验证点：
   - 日志显示exam_result_id有值
   - has_exam_result_id=True
   - **没有**出现"exam_result_id_missing"警告

7. **等待1-2分钟（让AI分析产生数据）**
   - 保持在答题页面
   - 摄像头和麦克风正常工作

8. **验证checkpoint文件**
   
   ```bash
   # 找到最新的checkpoint文件
   find data/ai_analysis/checkpoints -name "*.json" -type f -exec ls -lt {} + | head -5
   
   # 查看文件内容
   cat data/ai_analysis/checkpoints/2025/11/06/[session_id]_data.json | jq
   ```
   
   ✅ 验证点：
   ```json
   {
     "session_id": "cmh...",
     "exam_result_id": "cmh...",  // ✅ 应该有值，不为null
     "video_emotions": [...],
     "stats": {
       "video_emotion_count": > 0  // ✅ 应该有数据
     }
   }
   ```

9. **提交考试**
   - 点击提交按钮

10. **验证聚合数据查询**
    
    - 访问结果详情页
    - 打开Network标签
    - 查找 `GET /api/ai/aggregates/result/[resultId]`
    
    ✅ 验证点：
    - 响应状态码应该是 **200 OK**（不再是404）
    - 响应体包含聚合数据（如果AI服务已生成）

---

### 测试场景2：设备检测流程（验证不影响）

**目标**: 验证设备检测时exam_result_id为null是正常的

#### 步骤：

1. **访问设备检测页面**
   - URL: `/exam/[examId]/device-check`
   - **注意**：URL中没有resultId参数

2. **验证AI服务日志**
   
   应该看到：
   ```
   api_start_rtsp_requested | exam_result_id=None | has_exam_result_id=False
   exam_result_id_missing | message="exam_result_id为None，这可能是设备检测流程..."
   ```
   
   ✅ 验证点：
   - 日志显示exam_result_id=None
   - 有警告但这是**正常的**（设备检测设计如此）

3. **验证checkpoint文件**
   
   ```bash
   cat data/ai_analysis/checkpoints/.../[session_id]_data.json | jq '.exam_result_id'
   ```
   
   ✅ 验证点：
   - exam_result_id应该是 `null`
   - 这是**设计期望**，不是bug

---

### 测试场景3：数据库验证

**检查AI Sessions表**

```bash
PGPASSWORD=psychology_refactor_pass psql -h localhost -p 5435 -U psychology_user -d psychology_refactor << 'EOF'
SELECT 
    id,
    "sessionId",
    "examResultId",
    status,
    "createdAt"
FROM ai_sessions 
ORDER BY "createdAt" DESC 
LIMIT 5;
