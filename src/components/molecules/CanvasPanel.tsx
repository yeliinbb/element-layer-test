import { LayerElementBox } from '..';
import { StGroupContainer, StCanvasPanel } from '../../styles';
import { useSelectElement, useGroupElement } from '../../hooks';
import { ElementNode } from '../../types';

const CanvasPanel = () => {
  const { elements, selectedIds, handleElementClick } = useSelectElement();
  useGroupElement();

  const renderElements = () => {
    const groupElements = new Map<string | undefined, ElementNode[]>();

    elements.forEach((element) => {
      const key = element.groupId || 'ungrouped';
      if (!groupElements.has(key)) {
        groupElements.set(key, []);
      }
      groupElements.get(key)?.push(element);
    });

    return Array.from(groupElements.entries()).map(([groupId, groupElements]) => {
      if (groupId === 'ungrouped') {
        return groupElements.map((element) => (
          <LayerElementBox
            key={element.id}
            children={element.type}
            isSelected={selectedIds.includes(element.id)}
            onClick={(e) => handleElementClick(element.id, e)}
            color={element.color}
          />
        ));
      }

      const isGroupSelected = groupElements.some((el) => selectedIds.includes(el.id));

      return (
        <StGroupContainer key={groupId} $isSelected={groupElements.some((el) => selectedIds.includes(el.id))}>
          {groupElements.map((element) => (
            <LayerElementBox
              key={element.id}
              children={element.type}
              isSelected={!isGroupSelected && selectedIds.includes(element.id)}
              onClick={(e) => handleElementClick(element.id, e)}
              color={element.color}
            />
          ))}
        </StGroupContainer>
      );
    });
  };

  return (
    <StCanvasPanel>
      <ul>{renderElements()}</ul>
    </StCanvasPanel>
  );
};

export default CanvasPanel;
