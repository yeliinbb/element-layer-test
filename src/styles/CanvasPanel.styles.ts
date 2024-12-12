import styled from 'styled-components';

interface StGroupContainerProps {
  $isSelected: boolean;
  $alignDirection: 'vertical' | 'horizontal';
}

export const StCanvasPanel = styled.div<{ $alignDirection: 'vertical' | 'horizontal' }>`
  /* background-color: antiquewhite; */
  width: fit-content;
  margin: 16px;
  height: fit-content;

  ul {
    background-color: antiquewhite;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: ${({ $alignDirection }) => ($alignDirection === 'vertical' ? 'column' : 'row')};
    justify-content: flex-start;
    align-items: flex-start;
  }

  & > div {
    // SortableElementBox에 대한 스타일
    flex-shrink: 0; // 크기가 줄어들지 않도록
  }
`;

export const StGroupContainer = styled.div<StGroupContainerProps>`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: ${({ $alignDirection }) => ($alignDirection === 'vertical' ? 'column' : 'row')};
  width: auto; // 자식 요소들의 너비에 맞춤
  min-width: fit-content;
  padding: 4px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$isSelected ? '#4c3587' : 'none')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    pointer-events: none; // 클릭 이벤트가 내부 요소들에 전달되도록
  }

  // 드래그 중일 때 스타일 유지
  &[data-dragging] {
    width: auto;
    min-width: fit-content;
  }
`;
