import { useMemo } from 'react';
import { LayerElementBox } from '..';
import { StLayoutPanel } from '../../styles';

const DrawPanel = () => {
  const elementBoxes = useMemo<React.ReactNode[]>(
    () =>
      Array.from({ length: 21 }, (_, index) => <LayerElementBox key={crypto.randomUUID()} data-layer-index={index} />),
    [],
  );

  return (
    <StLayoutPanel>
      <div>{elementBoxes}</div>
    </StLayoutPanel>
  );
};

export default DrawPanel;
