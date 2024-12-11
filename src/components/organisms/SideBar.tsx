import { LayerPanel, ButtonPanel } from '..';
import { StNav } from '../../styles';

const SideBar = () => {
  return (
    <StNav>
      <ButtonPanel type="Align" />
      <ButtonPanel type="Add" />
      <LayerPanel />
    </StNav>
  );
};

export default SideBar;
