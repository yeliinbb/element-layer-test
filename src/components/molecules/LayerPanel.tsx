import { Layer } from '..';
import { StLayerPanel } from '../../styles';
import { useGroupElement, useSelectElement } from '../../hooks';

const LayerPanel = () => {
  const { elements, selectedIds, handleElementClick } = useSelectElement();
  useGroupElement();

  return (
    <StLayerPanel>
      <ul>
        {elements.map((element) => (
          <Layer
            key={element.id}
            children={element.type}
            isSelected={selectedIds.includes(element.id)}
            onClick={(e) => handleElementClick(element.id, e)}
          />
        ))}
      </ul>
    </StLayerPanel>
  );
};

export default LayerPanel;
