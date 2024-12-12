export const ALIGN_KEYS = {
  ALL_VERTICAL: 'allVertical',
  ALL_HORIZONTAL: 'allHorizontal',
  GROUP_VERTICAL: 'groupVertical',
  GROUP_HORIZONTAL: 'groupHorizontal',
} as const;

export const ALIGN_DIRECTIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
} as const;

export const ELEMENT_TYPES = {
  DIV: 'div',
  SPAN: 'span',
  PARAGRAPH: 'p',
} as const;

export const buttonLabels = {
  align: {
    [ALIGN_KEYS.ALL_VERTICAL]: 'All Vertically',
    [ALIGN_KEYS.ALL_HORIZONTAL]: 'All Horizontally',
    [ALIGN_KEYS.GROUP_VERTICAL]: 'Group Vertically',
    [ALIGN_KEYS.GROUP_HORIZONTAL]: 'Group Horizontally',
  },
  add: {
    [ELEMENT_TYPES.DIV]: {
      button: 'Div',
      layer: 'div',
    },
    [ELEMENT_TYPES.SPAN]: {
      button: 'Span',
      layer: 'span',
    },
    [ELEMENT_TYPES.PARAGRAPH]: {
      button: 'Paragraph',
      layer: 'p',
    },
  },
  download: 'Download as SVG',
};
