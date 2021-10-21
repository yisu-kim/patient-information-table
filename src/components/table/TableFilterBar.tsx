import { ChangeEvent, SyntheticEvent, useState } from 'react';
import {
  FilterBar,
  FilterButton,
  FilterInputPrepend,
  FilterLi,
  FilterSubmitButton,
  FilterUl,
} from './TableFilterBarStyle';

interface TableFilterBarProps {
  filters: Filter[];
  onSelectFilter: (filter: Filter) => void;
  onRangeFilter: (filter: Filter) => void;
}

const TableFilterBar: React.FC<TableFilterBarProps> = ({
  filters = [],
  onSelectFilter,
  onRangeFilter,
}: TableFilterBarProps) => {
  const [range, setRange] = useState<Range>({
    start: undefined,
    end: undefined,
  });

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange({ ...range, [e.target.name]: e.target.value });
  };

  const handleRangeSubmit = (e: SyntheticEvent, filter: Filter) => {
    e.preventDefault();

    const start = {
      ...filter.value.start,
      value: range.start !== undefined ? range.start : filter.value.start.value,
    };
    const end = {
      ...filter.value.end,
      value: range.end !== undefined ? range.end : filter.value.end.value,
    };

    onRangeFilter({
      ...filter,
      value: { start, end },
      hasRange: start.value || end.value ? true : false,
    });
  };

  return (
    <FilterBar>
      <FilterUl>
        {filters.map((filter, index) => (
          <FilterLi key={index}>
            {typeof filter.value === 'object' ? (
              <form onSubmit={(e) => handleRangeSubmit(e, filter)}>
                <FilterInputPrepend>{filter.text}</FilterInputPrepend>
                <input
                  name="start"
                  placeholder={filter.value.start.placeholder}
                  defaultValue={
                    filter.value.start.value
                      ? filter.value.start.value
                      : range.start
                  }
                  onChange={(e) => handleRangeChange(e)}
                />
                {' ~ '}
                <input
                  name="end"
                  placeholder={filter.value.end.placeholder}
                  defaultValue={
                    filter.value.end.value ? filter.value.end.value : range.end
                  }
                  onChange={(e) => handleRangeChange(e)}
                />
                <FilterSubmitButton type="submit">OK</FilterSubmitButton>
              </form>
            ) : (
              <FilterButton
                value={filter.value}
                active={filter.selected ? true : false}
                onClick={() => onSelectFilter(filter)}
              >
                {filter.text}
              </FilterButton>
            )}
          </FilterLi>
        ))}
      </FilterUl>
    </FilterBar>
  );
};

export default TableFilterBar;

export type Filter = {
  text: string;
  value: any;
  selected?: boolean;
  hasRange?: boolean;
};

type Range = {
  [key: string]: string | undefined;
};
