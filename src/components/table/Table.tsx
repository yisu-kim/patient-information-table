import {
  CaretDownOutlined,
  CaretUpOutlined,
  FilterFilled,
} from '@ant-design/icons';
import TablePagination from './TablePagination';
import {
  FilterIcon,
  OrderSortIcon,
  SortIcon,
  TableContainer,
  TableContents,
  TableData,
  TableHeader,
  TableHeaderContainer,
  TableHeaderGroup,
  TableHeaderIcon,
  TableHeaderTitle,
  TableRow,
} from './TableStyle';

export type SortOrder = false | 'asc' | 'desc';

interface TableProps {
  columns: {
    title: string;
    dataIndex: string;
    key: string;
    sortOrder?: SortOrder;
    filters?: { text: string; value: any }[];
  }[];
  onSort: (columnKey: string, columnDataIndex?: string) => void;
  dataSource?: any[];
  pagination: {
    currentPage: number;
    total: number;
    rowsPerPage: number;
    handlePageClick: (page: number) => void;
    handleRowsPerPageChange: (rowsPerPage: string) => void;
  };
}

const Table: React.FC<TableProps> = ({
  columns,
  onSort,
  dataSource = [],
  pagination,
}: TableProps) => {
  return (
    <TableContainer>
      <TableContents>
        <TableHeaderGroup>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column.dataIndex}>
                <TableHeaderContainer>
                  <TableHeaderTitle
                    onClick={() => onSort(column.key, column.dataIndex)}
                  >
                    {column.title}
                    <TableHeaderIcon>
                      {column.sortOrder !== undefined && (
                        <SortIcon>
                          <OrderSortIcon active={column.sortOrder === 'asc'}>
                            <CaretUpOutlined />
                          </OrderSortIcon>
                          <OrderSortIcon active={column.sortOrder === 'desc'}>
                            <CaretDownOutlined />
                          </OrderSortIcon>
                        </SortIcon>
                      )}
                    </TableHeaderIcon>
                  </TableHeaderTitle>
                  <TableHeaderIcon>
                    {column.filters && (
                      <FilterIcon>
                        <FilterFilled />
                      </FilterIcon>
                    )}
                  </TableHeaderIcon>
                </TableHeaderContainer>
              </TableHeader>
            ))}
          </TableRow>
        </TableHeaderGroup>
        <tbody>
          {dataSource.map((data, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableData key={column.key}>{data[column.dataIndex]}</TableData>
              ))}
            </TableRow>
          ))}
        </tbody>
      </TableContents>
      <TablePagination
        defaultCurrent={pagination.currentPage}
        total={pagination.total}
        rowsPerPage={pagination.rowsPerPage}
        onPageClick={pagination.handlePageClick}
        onRowsPerPageChange={pagination.handleRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default Table;
