import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const TableContents = styled.table``;

export const TableHeaderGroup = styled.thead`
  height: 40px;
  background-color: #fafafa;
`;

export const TableRow = styled.tr`
  height: 40px;
  text-align: center;
  border-bottom: 1px solid #f1f1f2;
`;

export const TableHeader = styled.th`
  vertical-align: middle;
`;

export const TableHeaderIcon = styled.span`
  float: right;
  color: #bfbfbf;
`;

export const TableData = styled.td`
  vertical-align: middle;
`;
