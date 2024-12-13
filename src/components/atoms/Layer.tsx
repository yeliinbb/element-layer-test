import { memo } from 'react';
import { StLayerList } from '../../styles';

interface LayerProps {
  children: string;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const Layer = memo(({ children, onClick, isSelected }: LayerProps) => {
  return (
    <StLayerList onClick={onClick} $isSelected={isSelected}>
      {children}
    </StLayerList>
  );
});

export default Layer;
