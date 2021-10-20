import { useState } from 'react';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  FilterFilled,
} from '@ant-design/icons';
import TableFilterBar, { Filter } from './TableFilterBar';
import TablePagination from './TablePagination';
import {
  FilterIcon,
  OrderIcon,
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
    filters?: Filter[];
  }[];
  onSort: ({ order, columnKey, columnDataIndex }: SortedInfo) => void;
  onFilter: ({ columnKey, filter }: FilteredInfo) => void;
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
  onFilter,
  dataSource = [],
  pagination,
}: TableProps) => {
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<CurrentFilters>({
    columnKey: '',
    filters: [],
  });

  const handleFilterBar = (columnKey: string, filters?: Filter[]) => {
    if (columnKey !== currentFilters.columnKey) {
      setCurrentFilters({ columnKey, filters: filters! });
      setIsFilterBarOpen(true);
      return;
    }

    setCurrentFilters({ columnKey: '', filters: [] });
    setIsFilterBarOpen(false);
  };

  const handleSelectFilter = (filter: Filter) => {
    const newFilters = [...currentFilters.filters];
    setCurrentFilters((currentFilters) => ({
      ...currentFilters,
      filters: newFilters.map((item) =>
        item.value === filter.value
          ? { ...item, selected: !filter.selected }
          : { ...item, selected: false },
      ),
    }));

    onFilter({
      columnKey: currentFilters.columnKey,
      filter: { ...filter, selected: !filter.selected },
    });
  };

  const handleRangeFilter = (filter: Filter) => {
    onFilter({
      columnKey: currentFilters.columnKey,
      filter: {
        ...filter,
        changed: filter.value.start.value || filter.value.end.value,
      },
    });
  };

  return (
    <TableContainer>
      <TableContents>
        <TableHeaderGroup>
          <TableRow>
            {columns.map((column) => (
              <TableHeader key={column.dataIndex}>
                <TableHeaderContainer>
                  <TableHeaderTitle
                    onClick={() =>
                      onSort({
                        order: column.sortOrder ? column.sortOrder : false,
                        columnKey: column.key,
                        columnDataIndex: column.dataIndex,
                      })
                    }
                  >
                    {column.title}
                    <TableHeaderIcon>
                      {column.sortOrder !== undefined && (
                        <SortIcon>
                          <OrderIcon active={column.sortOrder === 'asc'}>
                            <CaretUpOutlined />
                          </OrderIcon>
                          <OrderIcon active={column.sortOrder === 'desc'}>
                            <CaretDownOutlined />
                          </OrderIcon>
                        </SortIcon>
                      )}
                    </TableHeaderIcon>
                  </TableHeaderTitle>
                  <TableHeaderIcon
                    onClick={() => handleFilterBar(column.key, column.filters)}
                  >
                    {column.filters && (
                      <FilterIcon
                        active={column.filters.some(
                          (filter) => filter.selected || filter.changed,
                        )}
                      >
                        <FilterFilled />
                      </FilterIcon>
                    )}
                  </TableHeaderIcon>
                </TableHeaderContainer>
              </TableHeader>
            ))}
          </TableRow>
          {isFilterBarOpen && (
            <TableRow>
              <TableHeader colSpan={7}>
                <TableFilterBar
                  filters={currentFilters.filters}
                  onSelectFilter={handleSelectFilter}
                  onRangeFilter={handleRangeFilter}
                />
              </TableHeader>
            </TableRow>
          )}
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

export type SortedInfo = {
  order: SortOrder;
  columnKey: string;
  columnDataIndex?: string; // for dummy data
};

export type FilteredInfo = {
  columnKey: string;
  filter: Filter;
};

type CurrentFilters = {
  columnKey: string;
  filters: Filter[];
};
