# 条件逻辑功能测试指南

## 📋 功能概述

条件逻辑功能允许题目根据用户的答案动态显示或隐藏。这是心理测试平台的核心功能之一，用于实现自适应问卷流程。

### 核心实现

- **类型定义**: `/apps/web/src/types/condition.ts`
- **判断函数**: `shouldDisplayQuestion(displayCondition, answers)`
- **集成位置**: `/apps/web/src/app/exam/[examId]/session/[resultId]/page.tsx`
- **配置界面**: `ConditionBuilder` 组件

### 支持的条件类型

1. **简单条件** (SimpleCondition)
   - 格式: `{ questionId: 'q1', selectedOption: 'optionA' }`
   - 含义: 当Q1选择了optionA时显示当前题目

2. **条件组** (ConditionGroup)
   - AND逻辑: `{ type: 'and', conditions: [...] }`
   - OR逻辑: `{ type: 'or', conditions: [...] }`
   - 支持无限嵌套

---

## 🧪 测试场景

### 场景1：简单条件（单个依赖）

**测试目的**: 验证基础条件判断功能

**测试步骤**:

1. 创建一个试卷，包含3道题目：
   - Q1: "你的性别是？" (单选题)
     - 选项A: "男"
     - 选项B: "女"
   - Q2: "你是否有胡子？" (单选题，**条件**: Q1='男')
     - 选项A: "有"
     - 选项B: "没有"
   - Q3: "你的年龄是？" (文本题，无条件)

2. 配置Q2的显示条件：
   ```json
   {
     "questionId": "Q1的UUID",
     "selectedOption": "男选项的ID"
   }
   ```

3. 发布考试，学生端进入答题

4. **测试路径A**: 选择"女"
   - 预期: 只显示Q1和Q3，Q2隐藏
   - 导航网格: 只显示2个题号
   - 必填题验证: Q2不在必填检查范围内

5. **测试路径B**: 先选"男"，再改为"女"
   - 预期: Q2先显示，然后自动隐藏
   - currentQuestionIndex自动调整
   - 如果当前在Q2，自动跳转到Q3

6. **测试路径C**: 选择"男"
   - 预期: 显示Q1、Q2、Q3全部题目
   - 导航网格: 显示3个题号
   - Q2可以正常答题

---

### 场景2：AND逻辑（多个条件都满足）

**测试目的**: 验证AND逻辑组合

**测试步骤**:

1. 创建试卷：
   - Q1: "你的年龄段？" (单选: <18, 18-25, >25)
   - Q2: "你是学生吗？" (单选: 是, 否)
   - Q3: "你的学校名称？" (**条件**: Q1='18-25' AND Q2='是')

2. 配置Q3的显示条件：
   ```json
   {
     "type": "and",
     "conditions": [
       { "questionId": "Q1_UUID", "selectedOption": "18-25选项ID" },
       { "questionId": "Q2_UUID", "selectedOption": "是选项ID" }
     ]
   }
   ```

3. **测试路径**:
   - Q1选"<18"，Q2选"是" → Q3隐藏 ❌
   - Q1选"18-25"，Q2选"否" → Q3隐藏 ❌
   - Q1选"18-25"，Q2选"是" → Q3显示 ✅

---

### 场景3：OR逻辑（任一条件满足）

**测试目的**: 验证OR逻辑组合

**测试步骤**:

1. 创建试卷：
   - Q1: "你有驾照吗？" (单选: 有, 没有)
   - Q2: "你有车吗？" (单选: 有, 没有)
   - Q3: "你的驾龄是？" (**条件**: Q1='有' OR Q2='有')

2. 配置Q3的显示条件：
   ```json
   {
     "type": "or",
     "conditions": [
       { "questionId": "Q1_UUID", "selectedOption": "有选项ID" },
       { "questionId": "Q2_UUID", "selectedOption": "有选项ID" }
     ]
   }
   ```

3. **测试路径**:
   - Q1选"没有"，Q2选"没有" → Q3隐藏 ❌
   - Q1选"有"，Q2选"没有" → Q3显示 ✅
   - Q1选"没有"，Q2选"有" → Q3显示 ✅
   - Q1选"有"，Q2选"有" → Q3显示 ✅

---

### 场景4：复杂嵌套（AND包含OR）

**测试目的**: 验证复杂嵌套逻辑

**测试步骤**:

1. 创建试卷：
   - Q1: "你的学历？" (单选: 高中, 本科, 研究生)
   - Q2: "你的工作年限？" (单选: 0-2年, 3-5年, 5年以上)
   - Q3: "你的职位？" (单选: 员工, 主管, 经理)
   - Q4: "领导力培训需求？" (**条件**: (Q1='本科' OR Q1='研究生') AND (Q3='主管' OR Q3='经理'))

2. 配置Q4的显示条件：
   ```json
   {
     "type": "and",
     "conditions": [
       {
         "type": "or",
         "conditions": [
           { "questionId": "Q1_UUID", "selectedOption": "本科ID" },
           { "questionId": "Q1_UUID", "selectedOption": "研究生ID" }
         ]
       },
       {
         "type": "or",
         "conditions": [
           { "questionId": "Q3_UUID", "selectedOption": "主管ID" },
           { "questionId": "Q3_UUID", "selectedOption": "经理ID" }
         ]
       }
     ]
   }
   ```

3. **测试路径** (真值表验证):
   - 高中 + 员工 → Q4隐藏 ❌
   - 本科 + 员工 → Q4隐藏 ❌ (学历满足，职位不满足)
   - 高中 + 主管 → Q4隐藏 ❌ (职位满足，学历不满足)
   - 本科 + 主管 → Q4显示 ✅ (两者都满足)
   - 研究生 + 经理 → Q4显示 ✅ (两者都满足)

---

## 🔍 验证检查点

### 前端UI检查

- [ ] 题目数量显示正确（ExamHeader中的"题目X/Y"）
- [ ] 导航网格只显示可见题目
- [ ] 导航网格题号连续（不跳号）
- [ ] 当前题目指示器正确
- [ ] 题目切换动画正常

### 逻辑功能检查

- [ ] 改变答案后，依赖题目立即显示/隐藏
- [ ] currentQuestionIndex自动调整（当当前题目隐藏时）
- [ ] 隐藏题目的答案仍然保存（再次显示时恢复）
- [ ] 必填题验证只检查可见题目
- [ ] 提交时所有答案都提交（包括隐藏题目的答案）

### 边界情况检查

- [ ] 所有题目都隐藏时的处理（理论上不应该发生）
- [ ] 循环依赖的处理（Q2依赖Q1，Q1依赖Q2）
- [ ] 未作答题目的条件判断（应该隐藏依赖它的题目）
- [ ] 多选题作为条件（selectedOptions数组匹配）
- [ ] 文本题不能作为条件（displayCondition不支持textAnswer）

---

## 🐛 常见问题排查

### 问题1: 题目没有自动隐藏

**可能原因**:
1. displayCondition配置错误（questionId或selectedOption ID不匹配）
2. 答案未正确保存到state
3. useMemo依赖项缺失

**排查步骤**:
```javascript
// 在浏览器控制台执行
console.log('当前答案:', answers);
console.log('可见题目:', visibleQuestions);
console.log('题目条件:', examData.questions.map(q => ({
  id: q.id,
  title: q.title,
  displayCondition: q.displayCondition
})));
```

### 问题2: 切换题目时出现空白

**可能原因**:
- currentQuestionIndex超出visibleQuestions范围
- useEffect调整索引的逻辑未触发

**排查步骤**:
```javascript
console.log('当前索引:', currentQuestionIndex);
console.log('可见题目数量:', visibleQuestions.length);
console.log('当前题目:', currentQuestion);
```

### 问题3: 必填题验证错误

**可能原因**:
- validateRequired使用了examData.questions而不是visibleQuestions

**排查步骤**:
- 检查validateRequired函数的实现
- 确认使用的是visibleQuestions.filter()

---

## 📝 手动测试清单

### 基础功能
- [ ] 创建包含条件逻辑的试卷
- [ ] 配置简单条件
- [ ] 配置AND条件
- [ ] 配置OR条件
- [ ] 配置嵌套条件

### 学生端测试
- [ ] 进入考试，验证初始可见题目
- [ ] 答题后，验证题目动态显示/隐藏
- [ ] 修改答案，验证题目可见性变化
- [ ] 跳转题目，验证导航正常
- [ ] 提交考试，验证必填题检查

### 教师端验证
- [ ] 查看学生答案，验证所有答案都已保存
- [ ] 统计分析，验证隐藏题目不影响统计

---

## 🎯 性能测试

### 题目数量测试
- [ ] 10道题目 + 5个条件
- [ ] 50道题目 + 20个条件
- [ ] 100道题目 + 50个条件

**关注指标**:
- 切换题目的响应时间 (应该 < 100ms)
- 答案变化触发重新计算的时间 (应该 < 50ms)
- 内存占用情况

---

## 📚 相关代码位置

### 核心文件
- `apps/web/src/types/condition.ts` - 类型定义和判断逻辑
- `apps/web/src/app/exam/[examId]/session/[resultId]/page.tsx` - Session页面集成
- `apps/web/src/components/questions/ConditionBuilder.tsx` - 可视化配置组件
- `apps/web/src/components/questions/QuestionEditor.tsx` - 题目编辑器集成

### 相关API
- `POST /api/questions/paper/:paperId` - 创建题目（包含displayCondition）
- `PUT /api/questions/:id` - 更新题目
- `POST /api/results/:id/submit-answer` - 提交单个答案

---

## ✅ 验收标准

条件逻辑功能完成的标准：

1. ✅ 简单条件（SimpleCondition）正常工作
2. ✅ AND逻辑正常工作
3. ✅ OR逻辑正常工作
4. ✅ 嵌套条件正常工作
5. ✅ 题目动态显示/隐藏无闪烁
6. ✅ 导航网格正确更新
7. ✅ 必填题验证只检查可见题目
8. ✅ 所有答案都正确保存和提交
9. ✅ 无控制台错误或警告
10. ✅ 性能表现良好（100道题目内无卡顿）

---

**文档版本**: v1.0.0
**最后更新**: 2025-10-23
**作者**: AI Assistant (Claude Code)
