import { DownloadButton, DrawPanel } from '..';
import { buttonLabels } from '../../constants';
import { StSection } from '../../styles';

const DrawSection = () => {
  const handleDownloadScreenshot = () => {};

  return (
    <StSection>
      <DownloadButton children={buttonLabels.download} onClick={handleDownloadScreenshot} />
      <DrawPanel />
    </StSection>
  );
};

export default DrawSection;
