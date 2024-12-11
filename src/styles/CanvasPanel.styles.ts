import styled from 'styled-components';

export const StLayoutPanel = styled.div`
  background-color: antiquewhite;
  margin: 16px;
  height: fit-content;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;

    & > li {
      flex: 0 0 130px;
      height: 150px;
    }
  }
`;
