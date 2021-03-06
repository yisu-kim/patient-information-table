import { Fragment, MouseEvent, useEffect, useState } from 'react';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  FilterFilled,
  InboxOutlined,
  RightOutlined,
} from '@ant-design/icons';
import TableFilterBar, { Filter } from './TableFilterBar';
import TablePagination from './TablePagination';
import {
  Detail,
  DetailShowIcon,
  DetailTitle,
  FilterIcon,
  NoData,
  NoDataIcon,
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

interface TableProps {
  columns: Column[];
  onSort: ({ order, columnKey, columnDataIndex }: SortedInfo) => void;
  onFilter: ({ columnKey, filter }: FilteredInfo) => void;
  dataSource?: DataSource[];
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
    onSort({
      order: column.sortOrder ? column.sortOrder : false,
      columnKey: column.key,
      columnDataIndex: column.dataIndex,
    });
  };

  const handleFilterBar = (
    e: MouseEvent<HTMLDivElement>,
    columnKey: string,
    filters?: Filter[],
  ) => {
    e.stopPropagation();

    if (columnKey !== currentFilters.columnKey && filters) {
      setCurrentFilters({ columnKey, filters });
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
      filter,
    });
  };

  const handleDataDetail = (index: number) => {
    if (detailRowIndex > -1 && detailRowIndex === index) {
      setDetailRowIndex(-1);
      setIsDetailRowOpen(false);
      return;
    }
    setDetailRowIndex(index);
    setIsDetailRowOpen(true);

    onShowDetail(index);
  };

  useEffect(() => {
    if (detailInfo && detailInfo.length > 0) {
      return;
    }
    setDetailRowIndex(-1);
    setIsDetailRowOpen(false);
  }, [dataSource, detailInfo]);

  return (
    <TableContainer>
      <TableContents>
        <TableHeaderGroup>
          <TableRow>
            <TableHeader></TableHeader>
            {columns.map((column) => (
              <TableHeader
                key={column.dataIndex}
                hasSortOrder={'sortOrder' in column}
                onClick={() => handleSort(column)}
              >
                <TableHeaderContainer>
                  <TableHeaderTitle>
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
                    onClick={(e) =>
                      handleFilterBar(e, column.key, column.filters)
                    }
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
          {dataSource.length > 0 ? (
            dataSource.map((data, index) => (
              <Fragment key={index}>
                <TableRow>
                  <TableData
                    hasAction={true}
                    onClick={() => handleDataDetail(index)}
                  >
                    <DetailShowIcon>
                      {isDetailRowOpen && detailRowIndex === index ? (
                        <DownOutlined />
                      ) : (
                        <RightOutlined />
                      )}
                    </DetailShowIcon>
                  </TableData>
                  {columns.map((column) => (
                    <TableData key={column.key} align={column.align}>
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
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>
                <NoData>
                  <NoDataIcon>
                    <InboxOutlined />
                  </NoDataIcon>
                  <p>No Data</p>
                </NoData>
              </td>
            </tr>
          )}
        </tbody>
      </TableContents>
      {dataSource.length > 0 && (
        <TablePagination
          defaultCurrent={pagination.currentPage}
          total={pagination.total}
          rowsPerPage={pagination.rowsPerPage}
          onPageClick={pagination.handlePageClick}
          onRowsPerPageChange={pagination.handleRowsPerPageChange}
        />
      )}
    </TableContainer>
  );
};

export default Table;

export type SortOrder = false | 'asc' | 'desc';

export type Column = {
  title: string;
  dataIndex: string;
  key: string;
  sortOrder?: SortOrder;
  filters?: Filter[];
  align?: 'left' | 'center' | 'right';
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

type DataSource = {
  [key: string]: string | number;
};
