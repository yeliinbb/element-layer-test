import { buttonLabels } from '../constants';

const ButtonPanelTypes = {
  Align: 'Align',
  Add: 'Add',
} as const;

type ButtonPanelType = keyof typeof ButtonPanelTypes;

export interface ButtonPanelProps {
  type: ButtonPanelType;
  onClick: () => void;
}

export const buttonPanelData = {
  Align: [
    { label: buttonLabels.align.allVertical, key: 'allVertical' },
    { label: buttonLabels.align.allHorizontal, key: 'allHorizontal' },
    { label: buttonLabels.align.groupVertical, key: 'groupVertical' },
    { label: buttonLabels.align.groupHorizontal, key: 'groupHorizontal' },
  ],
  Add: [
    { label: buttonLabels.add.div.button, key: 'div' },
    { label: buttonLabels.add.span.button, key: 'span' },
    { label: buttonLabels.add.paragraph.button, key: 'paragraph' },
  ],
};
