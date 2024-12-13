import { memo } from 'react';
import { StLayerElementBox } from '../../styles';

export interface LayerElementBoxProps {
  children: React.ReactNode;
  isSelected?: boolean;
  isDragging?: boolean;
  onClick: (e: React.MouseEvent) => void;
  color: string;
}

const LayerElementBox = memo(({ children, isSelected, isDragging, onClick, color }: LayerElementBoxProps) => {
  return (
    <StLayerElementBox onClick={onClick} $isSelected={isSelected} $color={color} $isDragging={isDragging}>
      {children}
    </StLayerElementBox>
  );
});

export default LayerElementBox;
