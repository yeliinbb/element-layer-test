import { LayerElementBox } from '..';
import { StLayoutPanel } from '../../styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { elementsState, selectedElementIdState } from '../../store/recoil/element/atom';

const CanvasPanel = () => {
  const elements = useRecoilValue(elementsState);
  const [selectedId, setSelectedId] = useRecoilState(selectedElementIdState);

  return (
    <StLayoutPanel>
      <ul>
        {elements.map((element) => (
          <LayerElementBox
            key={element.id}
            children={element.type}
            isSelected={selectedId === element.id}
            onClick={() => setSelectedId(element.id)}
            color={element.color}
          />
        ))}
      </ul>
    </StLayoutPanel>
  );
};

export default CanvasPanel;
