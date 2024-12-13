import { useSetRecoilState } from 'recoil';
import { elementsState } from '../store/recoil';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback } from 'react';

const useDragDrop = () => {
  const setItems = useSetRecoilState(elementsState);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const {
        active, // 드래그되는 아이템
        over, // 드롭되는 위치의 아이템
      } = event;

      if (!over || active.id === over.id) return;

      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // 이동할 요소들의 새 order 계산
        const overOrder = items[newIndex].order || 0;
        const prevOrder = newIndex > 0 ? items[newIndex - 1].order || 0 : 0;
        const newOrder = (overOrder + prevOrder) / 2;

        // 그룹요소일 경우
        if (items[oldIndex].groupId) {
          const groupId = items[oldIndex].groupId;
          return items.map((item) => {
            if (item.id === groupId || item.groupId === groupId) {
              return {
                ...item,
                order: newOrder,
              };
            }
            return item;
          });
        }

        // 개별요소일 경우
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        return reorderedItems.map((item, index) => ({
          ...item,
          order: index,
        }));
      });
    },
    [setItems],
  );

  return { handleDragEnd };
};

export default useDragDrop;
