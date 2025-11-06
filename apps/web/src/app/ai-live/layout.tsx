import { MediaStreamProvider } from '@/contexts/MediaStreamContext';

export const metadata = {
  title: 'AI实时大屏 - 心理测试平台',
  description: 'AI实时情绪分析与监控大屏',
};

export default function AiLiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MediaStreamProvider>
      <div style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      }}>
        {children}
      </div>
    </MediaStreamProvider>
  );
}
