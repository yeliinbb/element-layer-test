import { LayerElementBox } from '..';
import { StGroupContainer, StCanvasPanel } from '../../styles';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useDndContext,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSelectElement, useGroupElement, useDragDrop } from '../../hooks';
import { ElementNode } from '../../types';
import { SortableElementBox } from '../common';

const CanvasPanel = () => {
  const { elements, selectedIds, handleElementClick } = useSelectElement();
  const { handleDragEnd } = useDragDrop();
  useGroupElement();

  const { active } = useDndContext();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px 이상 마우스가 움직여야 드래그 시작
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250, // 250ms 동안 눌러야 드래그 시작
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const renderElements = () => {
    const sortedElements = [...elements].sort((a, b) => a.order! - b.order!);

    const groupElements = new Map<string | undefined, ElementNode[]>();

    sortedElements.forEach((element) => {
      const key = element.groupId || 'ungrouped';
      if (!groupElements.has(key)) {
        groupElements.set(key, []);
      }
      groupElements.get(key)?.push(element);
    });

    return Array.from(groupElements.entries()).map(([groupId, groupElements]) => {
      if (groupId === 'ungrouped') {
        return groupElements.map((element) => (
          <SortableElementBox key={element.id} id={element.id}>
            <LayerElementBox
              isSelected={selectedIds.includes(element.id)}
              onClick={(e) => handleElementClick(element.id, e)}
              color={element.color}
              isDragging={active?.id === element.id}
            >
              {element.type}
            </LayerElementBox>
          </SortableElementBox>
        ));
      }

      const isGroupSelected = groupElements.some((el) => selectedIds.includes(el.id));

      if (groupId && groupId !== 'ungrouped') {
        return (
          <SortableElementBox key={groupId} id={groupId}>
            <StGroupContainer $isSelected={isGroupSelected}>
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
          </SortableElementBox>
        );
      }
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext
        items={[
          ...elements.filter((el) => !el.groupId).map((el) => el.id),
          ...new Set(
            elements
              .filter((el) => el.groupId) // undefined가 아닌 것만 필터링
              .map((el) => el.groupId)
              .filter((groupId): groupId is string => groupId !== undefined),
          ),
        ]}
        strategy={verticalListSortingStrategy}
      >
        <StCanvasPanel>
          <ul>{renderElements()}</ul>
        </StCanvasPanel>
      </SortableContext>
    </DndContext>
  );
};

export default CanvasPanel;
