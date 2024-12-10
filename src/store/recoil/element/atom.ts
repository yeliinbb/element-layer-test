import { atom } from 'recoil';
import { ElementNode } from '../../../types';

export const elementsState = atom<ElementNode[]>({
  key: 'elementsState',
  default: [],
});

export const selectedElementIdState = atom<string | null>({
  key: 'selectedElementIdState',
  default: null,
});
