import { useRecoilState, useRecoilValue } from 'recoil';
import { elementsState, selectedElementIdState } from '../store/recoil';

const useSelectElement = () => {
  const elements = useRecoilValue(elementsState);
  const [selectedIds, setSelectedIds] = useRecoilState(selectedElementIdState);

  const handleElementClick = (elementID: string, event: React.MouseEvent) => {
    event.stopPropagation();

    if (event.shiftKey) {
      setSelectedIds((prev) => {
        if (prev.includes(elementID)) {
          return prev.filter((id) => id === elementID);
        } else {
          return [...prev, elementID];
        }
      });
    } else {
      setSelectedIds((prev) => {
        if (prev.length === 1 && prev[0] === elementID) {
          return [];
        }
        return [elementID];
      });
    }
  };

  return { elements, selectedIds, handleElementClick };
};

export default useSelectElement;
