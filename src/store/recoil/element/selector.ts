import { selector } from 'recoil';
import { elementsState, selectedElementIdState } from './atom';

export const selectedElementState = selector({
  key: 'selectedElementState',
  get: ({ get }) => {
    const elements = get(elementsState);
    const selectedIds = get(selectedElementIdState);

    const selectedGroups = elements.filter((element) => selectedIds.groups.includes(element.id));
    const selectedElements = elements.filter((element) => selectedIds.elements.includes(element.id));

    return [...selectedGroups, ...selectedElements];
  },
});
