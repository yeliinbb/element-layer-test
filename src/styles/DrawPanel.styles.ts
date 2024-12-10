import styled from 'styled-components';

export const StLayoutPanel = styled.div`
  background-color: antiquewhite;
  margin: 16px;
  height: fit-content;

  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;

    & > div {
      flex: 0 0 130px;
      height: 150px;
    }
  }
`;
