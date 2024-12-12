export type ElementType = 'div' | 'span' | 'p' | 'group';

export type ElementNode = {
  id: string;
  type: ElementType;
  color: string;
  groupId?: string;
  order: number;
  children?: string[];
  isGrouped?: boolean;
};
