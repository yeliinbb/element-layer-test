import { selector } from 'recoil';
import { elementsState, selectedElementIdState } from './atom';

export const selectedElementState = selector({
  key: 'selectedElementState',
  get: ({ get }) => {
    const elements = get(elementsState);
    const selectedIds = get(selectedElementIdState);
    return elements.filter((element) => selectedIds.includes(element.id));
  },
});
