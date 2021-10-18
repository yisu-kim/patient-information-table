import {
  FilterBar,
  FilterButton,
  FilterLi,
  FilterUl,
} from './TableFilterBarStyle';

interface TableFilterBarProps {
  filters: Filter[];
  onSelectFilter: (filter: Filter) => void;
}

const TableFilterBar: React.FC<TableFilterBarProps> = ({
  filters = [],
  onSelectFilter,
}: TableFilterBarProps) => {
  return (
    <FilterBar>
      <FilterUl>
        {filters.map((filter) => (
          <FilterLi key={filter.value}>
            <FilterButton
              value={filter.value}
              active={filter.selected ? true : false}
              onClick={() => onSelectFilter(filter)}
            >
              {filter.text}
              {console.log('filterBar', filter)}
            </FilterButton>
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
};
