import styled from 'styled-components';

export const TableContainer = styled.div`
  min-width: 800px;
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
  border-bottom: 1px solid #f1f1f2;
`;

export const TableSubRow = styled(TableRow)`
  border: unset;
  background-color: #fafafa;
  box-shadow: inset 0px 10px 8px -10px rgba(0, 0, 0, 0.2),
    inset 0px -10px 8px -10px rgba(0, 0, 0, 0.2);
`;

export const TableHeader = styled.th`
  padding: 0 16px;
  vertical-align: middle;
`;

export const TableHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TableHeaderTitle = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

export const TableHeaderIcon = styled.div`
  display: flex;
  color: #bfbfbf;
  font-size: 12px;
  * {
    margin-left: 2px;
  }
`;

export const SortIcon = styled.span`
  display: flex;
  flex-direction: column;
  * {
    height: 8px;
  }
`;

interface OrderIconParams {
  active: boolean;
}

export const OrderIcon = styled.span<OrderIconParams>`
  display: flex;
  align-items: center;
  color: ${(params) => params.active && '#3284fc'};
`;

interface FilterIconParams {
  active: boolean;
}

export const FilterIcon = styled.span<FilterIconParams>`
  display: flex;
  align-items: center;
  color: ${(params) => params.active && '#3284fc'};
`;

export const TableData = styled.td`
  padding: 0 16px;
  vertical-align: middle;
`;

export const DetailShowIcon = styled.span`
  font-size: 12px;
  color: #bfbfbf;
`;
