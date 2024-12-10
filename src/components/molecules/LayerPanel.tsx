import { Layer } from '..';
import { StLayerPanel } from '../../styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { elementsState, selectedElementIdState } from '../../store/recoil/element/atom';

const LayerPanel = () => {
  const elements = useRecoilValue(elementsState);
  const [selectedId, setSelectedId] = useRecoilState(selectedElementIdState);

  return (
    <StLayerPanel>
      <ul>
        {elements.map((element) => (
          <Layer
            key={element.id}
            children={element.type}
            isSelected={selectedId === element.id}
            onClick={() => setSelectedId(element.id)}
          />
        ))}
      </ul>
    </StLayerPanel>
  );
};

export default LayerPanel;
