import { LayerElementBox } from '..';
import { StLayoutPanel } from '../../styles';
import { useSelectElement } from '../../hooks';

const CanvasPanel = () => {
  const { elements, selectedIds, handleElementClick } = useSelectElement();

  return (
    <StLayoutPanel>
      <ul>
        {elements.map((element) => (
          <LayerElementBox
            key={element.id}
            children={element.type}
            isSelected={selectedIds.includes(element.id)}
            onClick={(e) => handleElementClick(element.id, e)}
            color={element.color}
          />
        ))}
      </ul>
    </StLayoutPanel>
  );
};

export default CanvasPanel;
