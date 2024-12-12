import { LayerElementBox } from '..';
import { StGroupContainer, StCanvasPanel } from '../../styles';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useDndContext,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useSelectElement, useGroupElement, useDragDrop } from '../../hooks';
import { SortableElementBox } from '../common';
import { useCallback, useMemo } from 'react';

const CanvasPanel = () => {
  const { elements, selectedIds, handleElementClick } = useSelectElement();
  console.log('elements', elements);
  const { handleDragEnd: originalHandleDragEnd } = useDragDrop();
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

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      originalHandleDragEnd(event);
    },
    [originalHandleDragEnd],
  );

  const renderElements = () => {
    const sortedElements = useMemo(() => {
      return [...elements]
        .filter((element) => !element.groupId || element.type === 'group')
        .sort((a, b) => a.order - b.order);
    }, [elements]);

    const isGroupSelected = sortedElements.some((element) => selectedIds.includes(element.id));

    return sortedElements.map((sortedElement) => {
      if (sortedElement.type === 'group') {
        const groupChildren = elements.filter((element) => element.groupId === sortedElement.id);

        return (
          <SortableElementBox key={`group-${sortedElement.id}`} id={sortedElement.id}>
            <StGroupContainer $isSelected={isGroupSelected}>
              {groupChildren.map((child) => (
                <LayerElementBox
                  key={`child-${child.id}`}
                  children={`${child.type} (${child.order})`}
                  color={child.color}
                  isSelected={selectedIds.includes(child.id)}
                  onClick={(e) => {
                    e.stopPropagation(); // 그룹 클릭 우선 처리
                    handleElementClick(sortedElement.id, e);
                  }}
                />
              ))}
            </StGroupContainer>
          </SortableElementBox>
        );
      }

      return (
        <SortableElementBox key={`element-${sortedElement.id}`} id={sortedElement.id}>
          <LayerElementBox
            children={`${sortedElement.type} (${sortedElement.order})`}
            isSelected={selectedIds.includes(sortedElement.id)}
            onClick={(e) => handleElementClick(sortedElement.id, e)}
            color={sortedElement.color}
            isDragging={active?.id === sortedElement.id}
          />
        </SortableElementBox>
      );
    });
  };

  const sortedItems = useMemo(() => {
    const sortedElements = [...elements].sort((a, b) => a.order - b.order);

    return sortedElements.map((element) => element.id);
  }, [elements]);

  return (
    <StCanvasPanel>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={sortedItems} strategy={rectSortingStrategy}>
          <ul>{renderElements()}</ul>
        </SortableContext>
      </DndContext>
    </StCanvasPanel>
  );
};

export default CanvasPanel;
