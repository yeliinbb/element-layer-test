import styled from 'styled-components';

interface StCanvasPanelProps {
  $alignDirection: 'vertical' | 'horizontal';
}

interface StGroupContainerProps extends StCanvasPanelProps {
  $isSelected: boolean;
}

export const StCanvasPanel = styled.div<StCanvasPanelProps>`
  width: fit-content;
  margin: 16px;
  height: fit-content;

  ul {
    width: fit-content;
    min-width: 150px;
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
  width: fit-content;
  min-width: fit-content;
  height: fit-content;
  padding: 4px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.$isSelected ? '#4c3587' : 'none')};

  flex-shrink: 0; /* 자식 요소 크기를 변경하지 않도록 */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    pointer-events: none; /* 클릭 이벤트 방지 */
  }

  // 드래그 중일 때 스타일 유지
  &[data-dragging] {
    width: auto;
    min-width: fit-content;
  }
`;
