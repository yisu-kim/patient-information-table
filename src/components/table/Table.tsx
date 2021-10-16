import {
  Table as TableContainer,
  TableData,
  TableHeader,
  TableHeaderGroup,
  TableRow,
} from './TableStyle';

interface TableProps {
  columns: { title: string; dataIndex: string; key: string }[];
  dataSource: any[];
}

const Table: React.FC<TableProps> = ({ columns, dataSource }: TableProps) => {
  return (
    <TableContainer>
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
    </TableContainer>
  );
};

export default Table;
