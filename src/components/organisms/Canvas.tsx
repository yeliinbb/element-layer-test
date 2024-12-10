import { DownloadButton, CanvasPanel } from '..';
import { buttonLabels } from '../../constants';
import { StSection } from '../../styles';

const Canvas = () => {
  const handleDownloadScreenshot = () => {};

  return (
    <StSection>
      <DownloadButton children={buttonLabels.download} onClick={handleDownloadScreenshot} />
      <CanvasPanel />
    </StSection>
  );
};

export default Canvas;
