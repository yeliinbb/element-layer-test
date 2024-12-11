export const ButtonPanelTypes = {
  Align: 'Align',
  Add: 'Add',
} as const;

type ButtonPanelType = keyof typeof ButtonPanelTypes;

export interface ButtonPanelProps {
  type: ButtonPanelType;
}
