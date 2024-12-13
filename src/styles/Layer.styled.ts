import styled from 'styled-components';

interface StLayerListProps {
  $isSelected: boolean; // styled-components에서 DOM 속성과 충돌을 피하기 위해 $prefix 사용
}

export const StLayerList = styled.li<StLayerListProps>`
  padding: 8px;
  background-color: whitesmoke;
  border: 2px solid ${(props) => (props.$isSelected ? '#ff0000' : 'transparent')};
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
