import { useSetRecoilState } from 'recoil';
import { elementsState } from '../store/recoil/element/atom';
import { ElementNode } from '../types';

const useAddElement = () => {
  const setElements = useSetRecoilState(elementsState);

  const getRandomColor = () => {
    const randomValue = () => Math.floor(Math.random() * 256);
    return `rgb(${randomValue()}, ${randomValue()}, ${randomValue()})`;
  };

  const handleAddElement = (type: ElementNode['type']) => {
    const newElement = {
      id: crypto.randomUUID(),
      type,
      color: getRandomColor(),
    };
    setElements((prev) => [...prev, newElement]);
  };

  return { handleAddElement };
};

export default useAddElement;
