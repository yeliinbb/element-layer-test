import { StLayerElementBox } from '../../styles';

export interface LayerElementBoxProps {
  children: React.ReactNode;
  isSelected: boolean;
  isDragging?: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseDown?: () => void;
  color: string;
}

const LayerElementBox = ({ children, isSelected, isDragging, onClick, onMouseDown, color }: LayerElementBoxProps) => {
  return (
    <StLayerElementBox
      onClick={onClick}
      $isSelected={isSelected}
      $color={color}
      $isDragging={isDragging}
      onMouseDown={onMouseDown}
    >
      {children}
    </StLayerElementBox>
  );
};

export default LayerElementBox;
