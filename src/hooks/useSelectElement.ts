import { useRecoilState, useRecoilValue } from 'recoil';
import { elementsState, selectedElementIdState } from '../store/recoil';
import { useCallback } from 'react';

const useSelectElement = () => {
  const elements = useRecoilValue(elementsState);
  const [selectedIds, setSelectedIds] = useRecoilState(selectedElementIdState);

  const selectedGroupId = selectedIds.groups.length === 1 ? selectedIds.groups[0] : undefined;

  const handleElementClick = useCallback(
    (elementID: string, isGroup: boolean, event: React.MouseEvent) => {
      event.stopPropagation();

      if (event.shiftKey) {
        setSelectedIds((prev) => {
          if (isGroup) {
            return {
              ...prev,
              groups: prev.groups.includes(elementID)
                ? prev.groups.filter((id) => id !== elementID) // 이미 선택된 그룹이면 해제
                : [...prev.groups, elementID], // 그룹 추가
            };
          } else {
            return {
              ...prev,
              elements: prev.elements.includes(elementID)
                ? prev.elements.filter((id) => id !== elementID) // 이미 선택된 요소이면 해제
                : [...prev.elements, elementID], // 요소 추가
            };
          }
        });
      } else {
        setSelectedIds((prev) => {
          if (isGroup) {
            return {
              groups: prev.groups.includes(elementID) ? [] : [elementID], // 그룹만 선택 또는 해제
              elements: [], // 요소 선택 해제
            };
          } else {
            return {
              groups: [], // 그룹 선택 해제
              elements: prev.elements.includes(elementID) ? [] : [elementID], // 요소 선택 또는 해제
            };
          }
        });
      }
    },
    [setSelectedIds],
  );

  return { elements, selectedIds, selectedGroupId, handleElementClick };
};

export default useSelectElement;
