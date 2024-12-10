import { LayerPanel, ButtonPanel } from '..';
import { StNav } from '../../styles';

const SideBar = () => {
  const handleAlign = () => {};

  const handleAddElement = () => {};

  return (
    <StNav>
      <ButtonPanel type="Align" onClick={handleAlign} />
      <ButtonPanel type="Add" onClick={handleAddElement} />
      <LayerPanel />
    </StNav>
  );
};

export default SideBar;
