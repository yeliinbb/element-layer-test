import { atom } from 'recoil';
import { ElementNode } from '../../../types';

export interface SelectedElementIds {
  groups: string[]; // 선택된 그룹 ID 목록
  elements: string[]; // 선택된 개별 요소 ID 목록
}

export const elementsState = atom<ElementNode[]>({
  key: 'elementsState',
  default: [],
});

export const selectedElementIdState = atom<SelectedElementIds>({
  key: 'selectedElementIdState',
  default: {
    groups: [] as string[], // 선택된 그룹 ID 목록
    elements: [] as string[], // 선택된 개별 요소 ID 목록
  },
});
