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
import { RefObject, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { alignState } from '../../store/recoil';

interface CanvasPanelProps {
  canvasRef: RefObject<HTMLDivElement>;
}

const CanvasPanel = ({ canvasRef }: CanvasPanelProps) => {
  const { elements, selectedIds, handleElementClick } = useSelectElement();
  const { handleDragEnd: originalHandleDragEnd } = useDragDrop();
  const alignment = useRecoilValue(alignState);
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

    return sortedElements.map((sortedElement) => {
      if (sortedElement.type === 'group') {
        const groupChildren = elements.filter((element) => element.groupId === sortedElement.id);
        const groupAlignment = alignment.groups[sortedElement.id] || 'horizontal';
        const isGroupSelected = selectedIds.groups.includes(sortedElement.id);

        return (
          <SortableElementBox key={`group-${sortedElement.id}`} id={sortedElement.id}>
            <StGroupContainer key={sortedElement.id} $isSelected={isGroupSelected} $alignDirection={groupAlignment}>
              {groupChildren.map((child) => (
                <LayerElementBox
                  key={`child-${child.id}`}
                  children={child.type}
                  color={child.color}
                  onClick={(e) => {
                    e.stopPropagation(); // 그룹 클릭 우선 처리
                    handleElementClick(sortedElement.id, true, e);
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
            children={sortedElement.type}
            isSelected={selectedIds.elements.includes(sortedElement.id)}
            onClick={(e) => handleElementClick(sortedElement.id, false, e)}
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
    <StCanvasPanel $alignDirection={alignment.global} ref={canvasRef}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={sortedItems} strategy={rectSortingStrategy}>
          <ul>{renderElements()}</ul>
        </SortableContext>
      </DndContext>
    </StCanvasPanel>
  );
};

export default CanvasPanel;
