import styled from 'styled-components';

interface StGroupContainerProps {
  $isSelected: boolean;
}

export const StGroupContainer = styled.div<StGroupContainerProps>`
  position: relative;
  display: flex;
  min-width: fit-content;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid ${(props) => (props.$isSelected ? '#ff0000' : 'transparent')};
    z-index: 50;
    pointer-events: none; // 클릭 이벤트가 내부 요소들에 전달되도록
  }
`;

export const StCanvasPanel = styled.div`
  background-color: antiquewhite;
  margin: 16px;
  height: fit-content;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
