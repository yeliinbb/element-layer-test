import styled from 'styled-components';

interface StLayerElementBoxProps {
  $isSelected: boolean;
  $color: string;
}

export const StLayerElementBox = styled.li<StLayerElementBoxProps>`
  width: 150px;
  height: 150px;
  background-color: ${(props) => props.$color};
  border: 2px solid ${(props) => (props.$isSelected ? '#ff0000' : 'transparent')};
`;
