import { Layer } from '..';
import { buttonLabels } from '../../constants';
import { StLayerPanel } from '../../styles';

const LayerPanel = () => {
  return (
    <StLayerPanel>
      <Layer children={buttonLabels.add.div.layer} />
      <Layer children={buttonLabels.add.div.layer} />
      <Layer children={buttonLabels.add.div.layer} />
    </StLayerPanel>
  );
};

export default LayerPanel;
