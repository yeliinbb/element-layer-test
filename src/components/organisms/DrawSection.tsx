import { DownloadButton, DrawPanel } from '..';
import { buttonLabels } from '../../constants';
import { StSection } from '../../styles';

const DrawSection = () => {
  return (
    <StSection>
      <DownloadButton children={buttonLabels.download} />
      <DrawPanel />
    </StSection>
  );
};

export default DrawSection;
