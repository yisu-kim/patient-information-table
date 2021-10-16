import styled from 'styled-components';

export const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

export const RowsPerPage = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;

export const PageUl = styled.ul``;

interface PageLiProps {
  active?: boolean;
  disabled?: boolean;
}

export const PageLi = styled.li<PageLiProps>`
  float: left;
  margin-left: 5px;
  border: 1px solid ${(props) => (props.active ? '#3284fc' : '#d9d9d9')};
  border-radius: 3px;
  padding: 5px 0;
  min-width: 28px;
  text-align: center;
  & > * {
    color: ${(props) => props.disabled && '#d9d9d9'};
  }
`;

export const PageArrow = styled.button`
  font-size: 11px;
`;

export const PageNumber = styled.button``;
