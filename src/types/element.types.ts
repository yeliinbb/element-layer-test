export type ElementType = 'div' | 'span' | 'p' | 'group';

export type ElementNodeChild = { id: string; type: ElementType; color: string; order: number };

export type ElementNode = {
  id: string;
  type: ElementType;
  color: string;
  groupId?: string;
  order: number;
  children?: ElementNodeChild[];
  isGrouped?: boolean;
};
