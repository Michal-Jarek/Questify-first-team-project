import styled from "styled-components";

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin: 0 auto;
  margin-left: 72px;
  padding: 0;
  list-style-type: none;
  margin-bottom: 30px;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;