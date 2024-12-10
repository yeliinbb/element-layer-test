import { selector } from 'recoil';
import { elementsState, selectedElementIdState } from './atom';

export const selectedElementState = selector({
  key: 'selectedElementState',
  get: ({ get }) => {
    const elements = get(elementsState);
    const selectedId = get(selectedElementIdState);
    return elements.filter((element) => element.id === selectedId);
  },
});
