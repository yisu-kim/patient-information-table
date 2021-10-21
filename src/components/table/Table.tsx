import { Fragment, useEffect, useState } from 'react';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  FilterFilled,
  RightOutlined,
} from '@ant-design/icons';
import TableFilterBar, { Filter } from './TableFilterBar';
import TablePagination from './TablePagination';
import {
  Detail,
  DetailShowIcon,
  DetailTitle,
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
  TableSubRow,
} from './TableStyle';

export type SortOrder = false | 'asc' | 'desc';

interface TableProps {
  columns: Column[];
  onSort: ({ order, columnKey, columnDataIndex }: SortedInfo) => void;
  onFilter: ({ columnKey, filter }: FilteredInfo) => void;
  dataSource?: any[];
  detailInfo?: DetailInfo[];
  onShowDetail: (rowIndex: number) => void;
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
  detailInfo,
  onShowDetail,
  pagination,
}: TableProps) => {
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<CurrentFilters>({
    columnKey: '',
    filters: [],
  });
  const [isDetailRowOpen, setIsDetailRowOpen] = useState(false);
  const [detailRowIndex, setDetailRowIndex] = useState(-1);

  const handleSort = (column: Column) => {
    initDataDetail();

    onSort({
      order: column.sortOrder ? column.sortOrder : false,
      columnKey: column.key,
      columnDataIndex: column.dataIndex,
    });
  };

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
    initDataDetail();

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
    initDataDetail();

    onFilter({
      columnKey: currentFilters.columnKey,
      filter,
    });
  };

  const initDataDetail = () => {
    setDetailRowIndex(-1);
    setIsDetailRowOpen(false);
  };

  const handleDataDetail = (index: number) => {
    if (detailRowIndex > -1 && detailRowIndex === index) {
      initDataDetail();
      return;
    }
    setDetailRowIndex(index);
    setIsDetailRowOpen(true);

    onShowDetail(index);
  };

  return (
    <TableContainer>
      <TableContents>
        <TableHeaderGroup>
          <TableRow>
            <TableHeader></TableHeader>
            {columns.map((column) => (
              <TableHeader key={column.dataIndex}>
                <TableHeaderContainer>
                  <TableHeaderTitle onClick={() => handleSort(column)}>
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
                          (filter) => filter.selected || filter.hasRange,
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
            <TableSubRow>
              <TableHeader colSpan={columns.length + 1}>
                <TableFilterBar
                  filters={currentFilters.filters}
                  onSelectFilter={handleSelectFilter}
                  onRangeFilter={handleRangeFilter}
                />
              </TableHeader>
            </TableSubRow>
          )}
        </TableHeaderGroup>
        <tbody>
          {dataSource.map((data, index) => (
            <Fragment key={index}>
              <TableRow>
                <TableData onClick={() => handleDataDetail(index)}>
                  <DetailShowIcon>
                    {isDetailRowOpen && detailRowIndex === index ? (
                      <DownOutlined />
                    ) : (
                      <RightOutlined />
                    )}
                  </DetailShowIcon>
                </TableData>
                {columns.map((column) => (
                  <TableData key={column.key}>
                    {data[column.dataIndex]}
                  </TableData>
                ))}
              </TableRow>
              {isDetailRowOpen && detailRowIndex === index && (
                <TableSubRow>
                  <TableData colSpan={columns.length + 1}>
                    {detailInfo?.map((detail) => (
                      <Detail key={detail.title}>
                        <DetailTitle>{detail.title}</DetailTitle>
                        <br />
                        <span>{detail.text}</span>
                      </Detail>
                    ))}
                  </TableData>
                </TableSubRow>
              )}
            </Fragment>
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

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  sortOrder?: SortOrder;
  filters?: Filter[];
};

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

export type DetailInfo = {
  title: string;
  text: string;
};
