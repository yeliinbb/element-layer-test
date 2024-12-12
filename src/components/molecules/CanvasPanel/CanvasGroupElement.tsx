import { LayerElementBox } from '../..';
import { StGroupContainer } from '../../../styles';
import { ElementNode, ElementNodeChild } from '../../../types';
import { SortableElementBox } from '../../common';

interface CanvasGroupElementProps {
  element: ElementNode;
  groupChildren: ElementNodeChild[];
  alignment: 'horizontal' | 'vertical';
  handleElementClick: (id: string, isGroup: boolean, event: React.MouseEvent) => void;
  isGroupSelected: boolean;
}

const CanvasGroupElement = ({
  element,
  groupChildren,
  alignment,
  handleElementClick,
  isGroupSelected,
}: CanvasGroupElementProps) => {
  return (
    <SortableElementBox key={`group-${element.id}`} id={element.id}>
      <StGroupContainer $isSelected={isGroupSelected} $alignDirection={alignment}>
        {groupChildren.map((child) => (
          <LayerElementBox
            key={`child-${child.id}`}
            children={child.type}
            color={child.color}
            onClick={(e) => {
              e.stopPropagation(); // 그룹 클릭 우선 처리
              handleElementClick(element.id, true, e);
            }}
          />
        ))}
      </StGroupContainer>
    </SortableElementBox>
  );
};
export default CanvasGroupElement;
