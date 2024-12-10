import { StPanelButton } from '../../../styles';

interface PanelButtonProps {
  children: string;
}

const PanelButton = ({ children }: PanelButtonProps) => {
  return <StPanelButton>{children}</StPanelButton>;
};

export default PanelButton;
