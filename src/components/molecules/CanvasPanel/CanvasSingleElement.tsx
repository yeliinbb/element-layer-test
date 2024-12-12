import { LayerElementBox } from '../..';
import { ElementNode } from '../../../types';
import { SortableElementBox } from '../../common';

interface CanvasSingleElementProps {
  element: ElementNode;
  isDragging: boolean;
  handleElementClick: (id: string, isGroup: boolean, event: React.MouseEvent) => void;
  isSelected: boolean;
}

const CanvasSingleElement = ({ element, isDragging, handleElementClick, isSelected }: CanvasSingleElementProps) => {
  return (
    <SortableElementBox key={`element-${element.id}`} id={element.id}>
      <LayerElementBox
        children={element.type}
        isSelected={isSelected}
        onClick={(e) => handleElementClick(element.id, false, e)}
        color={element.color}
        isDragging={isDragging}
      />
    </SortableElementBox>
  );
};

export default CanvasSingleElement;
