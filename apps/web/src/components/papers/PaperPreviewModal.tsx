'use client';

/**
 * PaperPreviewModal - 试卷预览Modal组件
 *
 * 显示试卷的完整结构，包括所有题目、选项和正确答案
 */

import { Modal, Typography, Divider, Tag, Space, Empty, Spin } from 'antd';
import { useEffect, useState } from 'react';
import papersApi, { type Paper } from '@/services/papers';
import questionsApi, { type Question } from '@/services/questions';

const { Title, Text, Paragraph } = Typography;

// ============================================================================
// 类型定义
// ============================================================================

interface PaperPreviewModalProps {
  paperId: string | null;
  open: boolean;
  onCancel: () => void;
}

// ============================================================================
// 组件实现
// ============================================================================

export function PaperPreviewModal({ paperId, open, onCancel }: PaperPreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState<Paper | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  // 加载试卷数据
  useEffect(() => {
    if (!open || !paperId) return;

    const loadPaperData = async () => {
      try {
        setLoading(true);
        const [paperData, questionsData] = await Promise.all([
          papersApi.getById(paperId),
          questionsApi.findAllByPaper(paperId),
        ]);
        setPaper(paperData);
        setQuestions(questionsData);
      } catch (error) {
        console.error('加载试卷数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPaperData();
  }, [open, paperId]);

  // 渲染题型标签
  const renderQuestionType = (type: string) => {
    const typeMap: Record<string, { text: string; color: string }> = {
      SINGLE_CHOICE: { text: '单选题', color: 'blue' },
      MULTIPLE_CHOICE: { text: '多选题', color: 'purple' },
      TEXT: { text: '文本题', color: 'green' },
      ESSAY: { text: '问答题', color: 'orange' },
    };

    const config = typeMap[type] || { text: type, color: 'default' };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  // 渲染选择题选项
  const renderOptions = (question: Question) => {
    if (question.type === 'TEXT' || question.type === 'ESSAY') {
      return <Text type="secondary">（学生自由输入答案）</Text>;
    }

    if (!question.options || question.options.length === 0) {
      return <Text type="secondary">（暂无选项）</Text>;
    }

    return (
      <div className="ml-6 mt-2 space-y-2">
        {question.options.map((option, index) => (
          <div key={option.id || index} className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <Text strong className="mr-2">{String.fromCharCode(65 + index)}.</Text>
              <Text>{option.text}</Text>
            </div>
            {/* ✨ 显示选项分数 */}
            <Tag color="purple">{option.score || 0}分</Tag>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal
      title={
        <div>
          <Title level={4} className="mb-0">试卷预览</Title>
          {paper && questions.length > 0 && (
            <Text type="secondary" className="text-sm">
              共 {questions.length} 道题 · 总分 {questions.reduce((sum, q) => sum + q.points, 0)} 分
            </Text>
          )}
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={800}
      styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
    >
      <Spin spinning={loading}>
        {paper && (
          <div className="space-y-4">
            {/* 试卷信息 */}
            <div className="bg-gray-50 p-4 rounded">
              <Title level={5} className="mb-2">{paper.title}</Title>
              {paper.description && (
                <Paragraph className="mb-2 text-gray-600">
                  {paper.description}
                </Paragraph>
              )}
              <Space wrap>
                {paper.category && <Tag>{paper.category}</Tag>}
                {paper.timeLimit && <Tag color="orange">{paper.timeLimit}分钟</Tag>}
              </Space>
            </div>

            <Divider />

            {/* 题目列表 */}
            {questions.length > 0 ? (
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                    {/* 题目标题 */}
                    <div className="flex items-start mb-2">
                      <Text strong className="mr-2">{index + 1}.</Text>
                      <div className="flex-1">
                        <Space className="mb-2">
                          {renderQuestionType(question.type)}
                          <Tag>{question.points}分</Tag>
                        </Space>
                        <Paragraph className="mb-2">
                          {question.title}
                        </Paragraph>

                        {/* 选项 */}
                        {renderOptions(question)}

                        {/* 解析（如果有） */}
                        {question.explanation && (
                          <div className="mt-2 p-2 bg-blue-50 rounded">
                            <Text type="secondary" className="text-sm">
                              <strong>解析：</strong>{question.explanation}
                            </Text>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty description="暂无题目" />
            )}
          </div>
        )}
      </Spin>
    </Modal>
  );
}

export default PaperPreviewModal;
