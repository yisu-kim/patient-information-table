import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import TablePagination from './TablePagination';
import {
  TableContainer,
  TableContents,
  TableData,
  TableHeader,
  TableHeaderGroup,
  TableHeaderIcon,
  TableRow,
} from './TableStyle';

export type SortOrder = false | 'asc' | 'desc';

interface TableProps {
  columns: {
    title: string;
    dataIndex: string;
    key: string;
    sortOrder?: SortOrder;
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
              <TableHeader
                key={column.dataIndex}
                onClick={() => onSort(column.key, column.dataIndex)}
              >
                <span>{column.title}</span>
                {column.sortOrder &&
                  (column.sortOrder === 'asc' ? (
                    <TableHeaderIcon>
                      <SortAscendingOutlined />
                    </TableHeaderIcon>
                  ) : (
                    <TableHeaderIcon>
                      <SortDescendingOutlined />
                    </TableHeaderIcon>
                  ))}
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
