'use client';
import VideoLoading from '../../components/VideoLoading';

export default function LoadingTestPage() {
  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <VideoLoading videoUrl={'/images/bg1.mp4'} />
    </div>
  );
}
