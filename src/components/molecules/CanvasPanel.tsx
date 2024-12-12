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
import { ElementNodeChild } from '../../types';

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
    return elements.map((element) => {
      if (element.type === 'group') {
        const groupChildren = element.children as ElementNodeChild[];

        const groupAlignment = alignment.groups[element.id] || 'horizontal';
        const isGroupSelected = selectedIds.groups.includes(element.id);

        return (
          <SortableElementBox key={`group-${element.id}`} id={element.id}>
            <StGroupContainer key={element.id} $isSelected={isGroupSelected} $alignDirection={groupAlignment}>
              {groupChildren?.map((child) => (
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
      }

      return (
        <SortableElementBox key={`element-${element.id}`} id={element.id}>
          <LayerElementBox
            children={element.type}
            isSelected={selectedIds.elements.includes(element.id)}
            onClick={(e) => handleElementClick(element.id, false, e)}
            color={element.color}
            isDragging={active?.id === element.id}
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
