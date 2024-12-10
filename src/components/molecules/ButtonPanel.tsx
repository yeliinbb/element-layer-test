import { PanelButton } from '..';
import { StButtonPanel } from '../../styles';
import { ButtonPanelProps, buttonPanelData } from '../../types';

const ButtonPanel = ({ type, onClick }: ButtonPanelProps) => {
  const buttons = buttonPanelData[type] || [];

  return (
    <StButtonPanel>
      <span>{type}</span>
      {buttons.map((button) => (
        <PanelButton key={button.key} children={button.label} onClick={onClick} />
      ))}
    </StButtonPanel>
  );
};

export default ButtonPanel;
