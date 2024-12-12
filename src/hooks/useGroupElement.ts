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

        let groupId: string | undefined = undefined;

        setElements((prev) => {
          const selectedElementIds = selectedIds.elements;
          const selectedElements: ElementNode[] = prev.filter((element) => selectedElementIds.includes(element.id));

          const minOrder = Math.min(...selectedElements.map((element) => element.order || Infinity));
          groupId = crypto.randomUUID();

          const newGroup = {
            id: groupId,
            type: 'group' as ElementType,
            order: minOrder,
            children: selectedElements.map((element) => element.id), // 그룹에 속한 요소들의 ID
            color: 'transparent',
          };

          const updatedElements = prev.map((element) => {
            if (selectedElementIds.includes(element.id)) {
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
            const restoredElements = prev.map((element) =>
              children.includes(element.id) ? { ...element, groupId: undefined, isGrouped: false } : element,
            );

            return restoredElements.filter((element) => element.id !== groupId);
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
