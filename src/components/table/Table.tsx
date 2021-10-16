interface TableProps {
  columns: { title: string; dataIndex: string; key: string }[];
  dataSource: any[];
}

const Table: React.FC<TableProps> = ({ columns, dataSource }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.dataIndex}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key}>{data[column.dataIndex]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
