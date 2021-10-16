import TablePagination from './TablePagination';
import {
  TableContainer,
  TableContents,
  TableData,
  TableHeader,
  TableHeaderGroup,
  TableRow,
} from './TableStyle';

interface TableProps {
  columns: { title: string; dataIndex: string; key: string }[];
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
  dataSource = [],
  pagination,
}: TableProps) => {
  return (
    <TableContainer>
      <TableContents>
        <TableHeaderGroup>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column.dataIndex}>{column.title}</TableHeader>
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
