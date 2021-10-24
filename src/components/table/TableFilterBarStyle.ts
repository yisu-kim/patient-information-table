import styled from 'styled-components';

export const FilterBar = styled.div`
  display: flex;
  padding: 8px 4px;
`;

export const FilterUl = styled.ul`
  display: flex;
  justify-content: space-between;
`;

export const FilterLi = styled.li`
  float: left;
  margin-right: 8px;
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 5px 10px;
  min-with: 48px;
`;

interface FilterButtonProps {
  active: boolean;
}

export const FilterButton = styled(Button)<FilterButtonProps>`
  background-color: #fff;
  border: 1px solid ${(props) => (props.active ? '#3284fc' : '#d9d9d9')};
  color: ${(props) => (props.active ? '#3284fc' : '#000')};
  cursor: pointer;
`;

export const FilterInputPrepend = styled.span`
  margin-right: 8px;
`;

export const FilterSubmitButton = styled(Button)`
  background-color: #3284fc;
  color: #fff;
  margin-left: 8px;
`;
