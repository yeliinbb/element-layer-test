import { PanelButton } from '..';
import { buttonLabels } from '../../constants';
import { useAddElement } from '../../hooks';
import { StButtonPanel } from '../../styles';
import { ButtonPanelProps, ElementType } from '../../types';

export const buttonPanelData = {
  Align: [
    { label: buttonLabels.align.allVertical, key: 'allVertical' },
    { label: buttonLabels.align.allHorizontal, key: 'allHorizontal' },
    { label: buttonLabels.align.groupVertical, key: 'groupVertical' },
    { label: buttonLabels.align.groupHorizontal, key: 'groupHorizontal' },
  ],
  Add: [
    { label: buttonLabels.add.div.button, key: 'div' as ElementType },
    { label: buttonLabels.add.span.button, key: 'span' as ElementType },
    { label: buttonLabels.add.paragraph.button, key: 'p' as ElementType },
  ],
};

const ButtonPanel = ({ type }: ButtonPanelProps) => {
  const buttons = buttonPanelData[type] || [];

  const { handleAddElement } = useAddElement();

  const handleClick = (key: string) => {
    if (type === 'Add') {
      handleAddElement(key as ElementType);
    }
    // else if (type === "Align") {
    //   handleAlignElement()
    // }
  };

  return (
    <StButtonPanel>
      <span>{type}</span>
      {buttons.map((button) => (
        <PanelButton key={button.key} children={button.label} onClick={() => handleClick(button.key)} />
      ))}
    </StButtonPanel>
  );
};

export default ButtonPanel;
