import { useRecoilState, useRecoilValue } from 'recoil';
import { elementsState, selectedElementIdState } from '../store/recoil/element/atom';
import { useEffect } from 'react';

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

          setElements((prev) =>
            prev.map((element) => {
              if (selectedIds.includes(element.id)) {
                return {
                  ...element,
                  groupId,
                };
              }
              return element;
            }),
          );
        }
      }

      // Ungroup: Ctrl + Shift + G
      if (modifierKey && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        const selectedElement = elements.find((element) => selectedIds.includes(element.id));
        const groupIdToRemove = selectedElement?.groupId;

        if (groupIdToRemove) {
          setElements((prev) =>
            prev.map((element) => {
              if (element.groupId === groupIdToRemove) {
                const { groupId, ...rest } = element;
                return rest;
              }
              return element;
            }),
          );
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [elements, selectedIds]);
};

export default useGroupElement;
