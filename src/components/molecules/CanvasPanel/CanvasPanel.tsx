import { StCanvasPanel } from '../../../styles';
import { MouseSensor, TouchSensor, closestCenter, useDndContext, useSensor, useSensors } from '@dnd-kit/core';
import { rectSortingStrategy } from '@dnd-kit/sortable';
import { useSelectElement, useGroupElement, useDragDrop } from '../../../hooks';
import React, { RefObject, Suspense, lazy, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { alignState } from '../../../store/recoil';
import { ElementNodeChild } from '../../../types';

const DndContext = lazy(() => import('@dnd-kit/core').then((mod) => ({ default: mod.DndContext })));
const SortableContext = lazy(() => import('@dnd-kit/sortable').then((mod) => ({ default: mod.SortableContext })));

const CanvasGroupElement = React.lazy(() => import('./CanvasGroupElement'));
const CanvasSingleElement = React.lazy(() => import('./CanvasSingleElement'));

interface CanvasPanelProps {
  canvasRef: RefObject<HTMLDivElement>;
}

const CanvasPanel = ({ canvasRef }: CanvasPanelProps) => {
  const { elements, selectedIds, handleElementClick } = useSelectElement();
  const { handleDragEnd } = useDragDrop();
  useGroupElement();

  const alignment = useRecoilValue(alignState);

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

  const renderedElements = useMemo(() => {
    return elements.map((element) => {
      if (element.type === 'group') {
        const groupChildren = element.children as ElementNodeChild[];
        const groupAlignment = alignment.groups[element.id] || 'horizontal';
        const isGroupSelected = selectedIds.groups.includes(element.id);

        return (
          <Suspense fallback={null} key={element.id}>
            <CanvasGroupElement
              element={element}
              groupChildren={groupChildren}
              alignment={groupAlignment}
              handleElementClick={handleElementClick}
              isGroupSelected={isGroupSelected}
            />
          </Suspense>
        );
      }

      return (
        <Suspense fallback={null} key={element.id}>
          <CanvasSingleElement
            element={element}
            isDragging={active?.id === element.id}
            handleElementClick={handleElementClick}
            isSelected={selectedIds.elements.includes(element.id)}
          />
        </Suspense>
      );
    });
  }, [elements, alignment, selectedIds, active?.id, handleElementClick]);

  const sortedItems = useMemo(() => {
    const sortedElements = [...elements].sort((a, b) => a.order - b.order);

    return sortedElements.map((element) => element.id);
  }, [elements]);

  return (
    <StCanvasPanel $alignDirection={alignment.global} ref={canvasRef}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <SortableContext items={sortedItems} strategy={rectSortingStrategy}>
          <ul>{renderedElements}</ul>
        </SortableContext>
      </DndContext>
    </StCanvasPanel>
  );
};

export default CanvasPanel;
