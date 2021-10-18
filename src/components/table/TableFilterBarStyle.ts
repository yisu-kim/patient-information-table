import styled from 'styled-components';

export const FilterBar = styled.div`
  display: flex;
  padding: 4px 8px;
`;

export const FilterUl = styled.ul`
  display: flex;
  justify-content: space-between;
`;

export const FilterLi = styled.li`
  float: left;
  margin-right: 8px;
`;

interface FilterButtonProps {
  active: boolean;
}

export const FilterButton = styled.button<FilterButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.active ? '#3284fc' : '#d9d9d9')};
  color: ${(props) => (props.active ? '#3284fc' : '#000')};
  border-radius: 3px;
  padding: 5px 10px;
  min-width: 48px;
`;
