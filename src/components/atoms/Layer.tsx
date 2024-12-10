import { StLayerList } from '../../styles';

interface LayerProps {
  children: string;
  isSelected: boolean;
  onClick: () => void;
}

const Layer = ({ children, onClick, isSelected }: LayerProps) => {
  return (
    <StLayerList onClick={onClick} $isSelected={isSelected}>
      {children}
    </StLayerList>
  );
};

export default Layer;
