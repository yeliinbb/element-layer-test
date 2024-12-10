import { useMemo } from 'react';
import { Layer } from '..';
import { buttonLabels } from '../../constants';
import { StLayerPanel } from '../../styles';

const LayerPanel = () => {
  const layers = useMemo<React.ReactNode[]>(
    () =>
      Array.from({ length: 21 }, (_, index) => (
        <Layer key={crypto.randomUUID()} children={buttonLabels.add.div.layer} data-layer-index={index} />
      )),
    [],
  );

  return (
    <StLayerPanel>
      <div>{layers}</div>
    </StLayerPanel>
  );
};

export default LayerPanel;
