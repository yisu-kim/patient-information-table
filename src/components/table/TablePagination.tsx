import { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import {
  PageArrow,
  PageLi,
  PageNumber,
  PageUl,
  PaginationContainer,
  RowsPerPage,
} from './TablePaginationStyle';

interface TablePaginationProps {
  defaultCurrent: number;
  total: number;
  rowsPerPage: number;
  onPageClick: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: string) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  defaultCurrent,
  total,
  rowsPerPage,
  onPageClick,
  onRowsPerPageChange,
}: TablePaginationProps) => {
  const [showingPages, setShowingPages] = useState<(string | number)[]>([1]);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(10);

  useEffect(() => {
    setShowingPages(
      generatePageRangeWithDots(defaultCurrent, Math.ceil(total / rowsPerPage)),
    );
    setStartIndex((defaultCurrent - 1) * rowsPerPage + 1);
    setEndIndex(defaultCurrent * rowsPerPage);
  }, [defaultCurrent, rowsPerPage, total]);

  return (
    <PaginationContainer>
      <div>
        <PageUl>
          <PageLi
            key="prev"
            onClick={() =>
              defaultCurrent !== 1 && onPageClick(defaultCurrent - 1)
            }
            disabled={defaultCurrent === 1}
          >
            <PageArrow>
              <LeftOutlined />
            </PageArrow>
          </PageLi>
          {showingPages.map((page, index) => (
            <PageLi
              key={index}
              onClick={() => typeof page === 'number' && onPageClick(page)}
              active={page === defaultCurrent}
            >
              <PageNumber>{page}</PageNumber>
            </PageLi>
          ))}
          <PageLi
            key="next"
            onClick={() =>
              defaultCurrent !== Math.ceil(total / rowsPerPage) &&
              onPageClick(defaultCurrent + 1)
            }
            active={false}
            disabled={defaultCurrent === Math.ceil(total / rowsPerPage)}
          >
            <PageArrow>
              <RightOutlined />
            </PageArrow>
          </PageLi>
        </PageUl>
      </div>
      <RowsPerPage>
        <select onChange={(e) => onRowsPerPageChange(e.target.value)}>
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
          <option value="50">50 / page</option>
          <option value="100">100 / page</option>
        </select>
      </RowsPerPage>
      <div>
        <span>
          {startIndex} - {endIndex} of {total}
        </span>
      </div>
    </PaginationContainer>
  );
};

export default TablePagination;

/**
 * Generate page range with '...'
 * @param currentPage
 * @param pageCount
 * @returns [1, '...', 3, 4, 5, 6, 7, '...', 100]
 *
 * {@link https://gist.github.com/kottenator/9d936eb3e4e3c3e02598}
 */
export const generatePageRangeWithDots = (
  currentPage: number,
  lastPage: number,
): (string | number)[] => {
  const delta = 2;
  const range = [];

  if (lastPage <= 1) {
    range.push(1);
    return range;
  }

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(lastPage - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    range.unshift('...');
  }
  if (currentPage + delta < lastPage - 1) {
    range.push('...');
  }

  range.unshift(1);
  range.push(lastPage);

  return range;
};
