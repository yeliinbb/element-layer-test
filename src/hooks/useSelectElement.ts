import { useRecoilState, useRecoilValue } from 'recoil';
import { elementsState, selectedElementIdState } from '../store/recoil';

const useSelectElement = () => {
  const elements = useRecoilValue(elementsState);
  const [selectedIds, setSelectedIds] = useRecoilState(selectedElementIdState);

  const selectedGroupId = selectedIds.groups.length === 1 ? selectedIds.groups[0] : undefined;

  const handleElementClick = (elementID: string, isGroup: boolean, event: React.MouseEvent) => {
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
      setSelectedIds(() => ({
        groups: isGroup ? [elementID] : [], // 그룹만 선택
        elements: isGroup ? [] : [elementID], // 요소만 선택
      }));
    }
  };

  return { elements, selectedIds, selectedGroupId, handleElementClick };
};

export default useSelectElement;
