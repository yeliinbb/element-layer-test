import { StPanelButton } from '../../../styles';

interface PanelButtonProps {
  children: string;
  onClick: () => void;
}

const PanelButton = ({ children, onClick }: PanelButtonProps) => {
  return <StPanelButton onClick={onClick}>{children}</StPanelButton>;
};

export default PanelButton;
