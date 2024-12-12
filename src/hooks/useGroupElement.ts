import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { elementsState, selectedElementIdState } from '../store/recoil';
import { ElementNode, ElementType } from '../types';

const useGroupElement = () => {
  const [elements, setElements] = useRecoilState(elementsState);
  const selectedIds = useRecoilValue(selectedElementIdState);
  const setSelectedIds = useSetRecoilState(selectedElementIdState);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMacCmd = e.metaKey && !e.ctrlKey;
      const isWinCtrl = e.ctrlKey && !e.metaKey;
      const modifierKey = isMacCmd || isWinCtrl;

      // Group: Ctrl + G
      if (modifierKey && e.key.toLowerCase() === 'g' && !e.shiftKey) {
        e.preventDefault();

        // 선택된 개별 요소가 없으면 그룹 생성 막기
        if (selectedIds.elements.length < 1) {
          console.warn('No elements selected to group');
          return;
        }

        let groupId: string | undefined = undefined;

        setElements((prev) => {
          const selectedElementIds = selectedIds.elements;
          // 선택된 요소 데이터 가져오기
          const selectedElements: ElementNode[] = prev.filter((element) => selectedElementIds.includes(element.id));

          const minOrder = Math.min(...selectedElements.map((element) => element.order || Infinity));
          groupId = crypto.randomUUID();

          const newGroup = {
            id: groupId,
            type: 'group' as ElementType,
            order: minOrder,
            children: selectedElements.map((element) => ({
              id: element.id,
              type: element.type,
              color: element.color,
              order: element.order,
            })),
            color: 'transparent',
          };

          // 그룹 삽입 위치 찾기 (가장 작은 order의 위치)
          const insertIndex = prev.findIndex((element) => element.order === minOrder);

          const updatedElements = [
            ...prev.filter((element) => !selectedElementIds.includes(element.id)), // 선택된 요소 제거
          ];

          // 그룹 삽입
          updatedElements.splice(insertIndex, 0, newGroup);

          return updatedElements;
        });

        if (groupId) {
          setSelectedIds({
            groups: [groupId],
            elements: [],
          });
        }
      }

      // Ungroup: Ctrl + Shift + G
      if (modifierKey && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();

        const groupToUngroup = elements.find(
          (element) => selectedIds.groups.includes(element.id) && element.type === 'group',
        );

        if (groupToUngroup && groupToUngroup.children) {
          const { children, id: groupId } = groupToUngroup;

          setElements((prev) => {
            // 그룹 위치 찾기
            const groupIndex = prev.findIndex((element) => element.id === groupId);

            // 그룹 내부 요소 복원
            const restoredElements = [...prev.filter((element) => element.id !== groupId)];

            // 그룹의 children을 복원하여 그룹 뒤에 삽입
            restoredElements.splice(
              groupIndex,
              0,
              ...children.map((child) => ({
                id: child.id,
                type: child.type,
                color: child.color,
                order: child.order,
                groupId: undefined, // 그룹 ID 제거
                isGrouped: false, // 그룹화 상태 해제
              })),
            );

            return restoredElements;
          });

          setSelectedIds({ groups: [], elements: [] });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [elements, selectedIds]);
};

export default useGroupElement;
