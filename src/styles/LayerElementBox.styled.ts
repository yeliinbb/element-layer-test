import styled from 'styled-components';

interface StLayerElementBoxProps {
  $isSelected?: boolean;
  $isDragging?: boolean;
  $color?: string;
}

export const StLayerElementBox = styled.li<StLayerElementBoxProps>`
  position: relative;
  width: 150px;
  height: 150px;
  background-color: ${(props) => props.$color || 'transparent'};
  border: 2px solid ${(props) => (props.$isSelected ? '#ff0000' : 'transparent')};
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  z-index: 10;
  cursor: pointer;
`;
