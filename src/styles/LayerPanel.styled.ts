import styled from 'styled-components';

export const StLayerPanel = styled.div`
  width: 100%;
  height: 80vh;
  overflow: hidden;

  & > ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    min-height: 0;
  }
`;
