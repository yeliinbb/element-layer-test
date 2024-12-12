import { atom } from 'recoil';

type AlignState = {
  global: 'horizontal' | 'vertical';
  groups: { [key: string]: 'horizontal' | 'vertical' };
};

export const alignState = atom<AlignState>({
  key: 'alignState',
  default: {
    global: 'horizontal',
    groups: {},
  },
});
