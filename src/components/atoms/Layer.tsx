import { StLayerDiv } from '../../styles';

interface LayerProps {
  children: string;
}

const Layer = ({ children }: LayerProps) => {
  return <StLayerDiv>{children}</StLayerDiv>;
};

export default Layer;
