import { useRef } from 'react';
import { DownloadButton, CanvasPanel } from '..';
import { buttonLabels } from '../../constants';
import { useCanvasExport } from '../../hooks';
import { StSection } from '../../styles';

const Canvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { handleDownloadScreenshot } = useCanvasExport({ canvasRef });

  return (
    <StSection>
      <DownloadButton children={buttonLabels.download} onClick={handleDownloadScreenshot} />
      <CanvasPanel canvasRef={canvasRef} />
    </StSection>
  );
};

export default Canvas;
