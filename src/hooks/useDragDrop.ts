import { useSetRecoilState } from 'recoil';
import { elementsState } from '../store/recoil';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ElementNode } from '../types';

const useDragDrop = () => {
  const setItems = useSetRecoilState(elementsState);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      // 모든 아이템의 order 재계산
      const updateOrder = (items: ElementNode[]) => {
        return items.map((item, index) => ({
          ...item,
          order: index,
        }));
      };

      // 그룹 아이템들 함께 이동
      if (items[oldIndex].type === 'group' || items[oldIndex].groupId) {
        const groupId = items[oldIndex].type === 'group' ? items[oldIndex].id : items[oldIndex].groupId;

        // 그룹 관련 아이템들
        const groupItems = items.filter((item) => item.id === groupId || item.groupId === groupId);

        // 나머지 아이템들
        const otherItems = items.filter((item) => !groupItems.some((groupItem) => groupItem.id === item.id));

        // 새로운 배열에 순서대로 삽입
        let result = [...otherItems];
        result.splice(newIndex, 0, ...groupItems);

        // order 업데이트
        return updateOrder(result);
      }

      // 일반 아이템 이동
      const reorderedItems = arrayMove(items, oldIndex, newIndex);
      return updateOrder(reorderedItems);
    });
  };

  return { handleDragEnd };
};

export default useDragDrop;
