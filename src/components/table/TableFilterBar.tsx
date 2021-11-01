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
    start: { value: undefined },
    end: { value: undefined },
  });

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRange({ ...range, [e.target.name]: { value: e.target.value } });
  };

  const handleRangeSubmit = (e: SyntheticEvent, filter: Filter) => {
    e.preventDefault();

    const start = {
      ...(filter.value as Range).start,
      value:
        range.start.value !== undefined
          ? range.start.value
          : (filter.value as Range).start.value,
    };
    const end = {
      ...(filter.value as Range).end,
      value:
        range.end.value !== undefined
          ? range.end.value
          : (filter.value as Range).end.value,
    };

    onRangeFilter({
      ...filter,
      value: { start, end } as Range,
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
                    (filter.value as Range).start.value
                      ? (filter.value as Range).start.value
                      : range.start.value
                  }
                  onChange={(e) => handleRangeChange(e)}
                />
                {' ~ '}
                <input
                  name="end"
                  placeholder={filter.value.end.placeholder}
                  defaultValue={
                    (filter.value as Range).end.value
                      ? (filter.value as Range).end.value
                      : range.end.value
                  }
                  onChange={(e) => handleRangeChange(e)}
                />
                <FilterSubmitButton type="submit">OK</FilterSubmitButton>
              </form>
            ) : (
              <FilterButton
                value={
                  typeof filter.value === 'boolean'
                    ? filter.value.toString()
                    : filter.value
                }
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
  value: string | boolean | Range;
  selected?: boolean;
  hasRange?: boolean;
};

export type Range = {
  start: { value: string | number | undefined; placeholder?: string };
  end: { value: string | number | undefined; placeholder?: string };
};
