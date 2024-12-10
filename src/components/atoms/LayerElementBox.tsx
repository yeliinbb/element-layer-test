import { StLayerElementBox } from '../../styles';

interface LayerElementBoxProps {
  children: string;
  isSelected: boolean;
  onClick: () => void;
  color: string;
}

const LayerElementBox = ({ children, isSelected, onClick, color }: LayerElementBoxProps) => {
  return (
    <StLayerElementBox onClick={onClick} $isSelected={isSelected} $color={color}>
      {children}
    </StLayerElementBox>
  );
};

export default LayerElementBox;
