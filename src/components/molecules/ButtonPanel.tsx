import { useCallback } from 'react';
import { PanelButton } from '..';
import { ALIGN_KEYS, ELEMENT_TYPES, buttonLabels } from '../../constants';
import { useAddElement, useSelectElement } from '../../hooks';
import useAlignElement from '../../hooks/useAlignElement';
import { StButtonPanel } from '../../styles';
import { ButtonPanelProps, ElementType } from '../../types';

interface ButtonData {
  Align: { label: string; key: string }[];
  Add: { label: string; key: ElementType }[];
}

export const buttonPanelData: ButtonData = {
  Align: [
    { label: buttonLabels.align[ALIGN_KEYS.ALL_VERTICAL], key: ALIGN_KEYS.ALL_VERTICAL },
    { label: buttonLabels.align[ALIGN_KEYS.ALL_HORIZONTAL], key: ALIGN_KEYS.ALL_HORIZONTAL },
    { label: buttonLabels.align[ALIGN_KEYS.GROUP_VERTICAL], key: ALIGN_KEYS.GROUP_VERTICAL },
    { label: buttonLabels.align[ALIGN_KEYS.GROUP_HORIZONTAL], key: ALIGN_KEYS.GROUP_HORIZONTAL },
  ],
  Add: [
    { label: buttonLabels.add[ELEMENT_TYPES.DIV].button, key: ELEMENT_TYPES.DIV },
    { label: buttonLabels.add[ELEMENT_TYPES.SPAN].button, key: ELEMENT_TYPES.SPAN },
    { label: buttonLabels.add[ELEMENT_TYPES.PARAGRAPH].button, key: ELEMENT_TYPES.PARAGRAPH },
  ],
};

const ButtonPanel = ({ type }: ButtonPanelProps) => {
  const buttons = buttonPanelData[type] || [];

  const { handleAddElement } = useAddElement();
  const { handleAlignElement } = useAlignElement();
  const { selectedGroupId } = useSelectElement();

  const handleButtonClick = useCallback(
    (key: string) => {
      if (type === 'Add') {
        handleAddElement(key as ElementType);
      } else if (type === 'Align') {
        handleAlignElement(key as ElementType, selectedGroupId);
      }
    },
    [handleAddElement, handleAlignElement, selectedGroupId],
  );

  return (
    <StButtonPanel>
      <span>{type}</span>
      {buttons.map((button) => (
        <PanelButton key={button.key} children={button.label} onClick={() => handleButtonClick(button.key)} />
      ))}
    </StButtonPanel>
  );
};

export default ButtonPanel;
