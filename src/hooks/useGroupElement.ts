import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { elementsState, selectedElementIdState } from '../store/recoil';
import { ElementType } from '../types';

const useGroupElement = () => {
  const [elements, setElements] = useRecoilState(elementsState);
  const selectedIds = useRecoilValue(selectedElementIdState);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMacCmd = e.metaKey && !e.ctrlKey;
      const isWinCtrl = e.ctrlKey && !e.metaKey;
      const modifierKey = isMacCmd || isWinCtrl;

      // Group: Ctrl + G
      if (modifierKey && e.key.toLowerCase() === 'g' && !e.shiftKey) {
        e.preventDefault();
        if (selectedIds.length >= 2) {
          const groupId = crypto.randomUUID();

          setElements((prev) => {
            const selectedElements = prev.filter((el) => selectedIds.includes(el.id));
            const minOrder = Math.min(...selectedElements.map((el) => el.order || Infinity));

            const newGroup = {
              id: groupId,
              type: 'group' as ElementType,
              order: minOrder,
              children: selectedElements.map((element) => element.id),
              color: 'transparent',
            };

            const updatedElements = prev.map((element) => {
              if (selectedIds.includes(element.id)) {
                return {
                  ...element,
                  groupId,
                  isGrouped: true,
                };
              }
              return element;
            });

            return [...updatedElements, newGroup];
          });
        }
      }

      // Ungroup: Ctrl + Shift + G
      if (modifierKey && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        const selectedGroup = elements.find((element) => selectedIds.includes(element.id) && element.type === 'group');

        if (selectedGroup?.type === 'group' && selectedGroup.children) {
          const groupIdToRemove = selectedGroup.id;

          setElements((prev) => {
            // 그룹 자식 요소 복구
            const restoredChildren = prev
              .filter((element) => selectedGroup.children?.includes(element.id) && element.groupId === groupIdToRemove)
              .map((element) => ({
                ...element,
                groupId: undefined, // 그룹 ID 제거
                isGrouped: false, // 그룹화 상태 해제
              }));

            // 그룹 컨테이너 제거
            const updatedElements = prev.filter(
              (element) => element.id !== groupIdToRemove && !selectedGroup.children?.includes(element.id),
            );

            return [...updatedElements, ...restoredChildren];
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [elements, selectedIds]);
};

export default useGroupElement;
