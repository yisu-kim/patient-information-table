import { useEffect, useState } from 'react';
import PatientService, { PatientListParams } from 'services/patient';
import { PatientList } from 'utils/types/patient';
import Table from 'components/table';
import {
  Column,
  DetailInfo,
  FilteredInfo,
  SortedInfo,
} from 'components/table/Table';
import { Container } from './PatientInfoStyle';
import { Filter, Range } from 'components/table/TableFilterBar';

interface PatientProps {
  patientService: PatientService;
}

const PatientInfo: React.FC<PatientProps> = ({
  patientService,
}: PatientProps) => {
  const [data, setData] = useState<PatientList['patient']>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortedInfo, setSortedInfo] = useState<SortedInfo>({
    order: false,
    columnKey: '',
    columnDataIndex: '',
  });
  const [filteredInfo, setFilteredInfo] = useState<FilteredInfo[]>([]);
  const [filters, setFilters] = useState<Filters>();
  const [columns, setColumns] = useState<Column[]>([]);
  const [brief, setBrief] = useState<DetailInfo[]>([]);

  useEffect(() => {
    try {
      (async () => {
        const {
          data: { genderList },
        } = await patientService.getGenderList();
        const {
          data: { raceList },
        } = await patientService.getRaceList();
        const {
          data: { ethnicityList },
        } = await patientService.getEthnicityList();

        const filteredGender = findByColumnKey(filteredInfo, 'gender');
        const genderFilters = makeFilters(genderList);
        const gender = !filteredGender
          ? genderFilters
          : addSelectedInfo(genderFilters, filteredGender);

        const filteredAge = findByColumnKey(filteredInfo, 'age');
        const ageFilters: Filter[] = [
          {
            text: 'Range',
            value: {
              start: { placeholder: 'min', value: '' },
              end: { placeholder: 'max', value: '' },
            },
          },
        ];
        const age = !filteredAge
          ? ageFilters
          : addRangeInfo(ageFilters, filteredAge);

        const filteredRace = findByColumnKey(filteredInfo, 'race');
        const raceFilters = makeFilters(raceList);
        const race = !filteredRace
          ? raceFilters
          : addSelectedInfo(raceFilters, filteredRace);

        const filteredEthnicity = findByColumnKey(filteredInfo, 'ethnicity');
        const ethnicityFilters = makeFilters(ethnicityList);
        const ethnicity = !filteredEthnicity
          ? ethnicityFilters
          : addSelectedInfo(ethnicityFilters, filteredEthnicity);

        const filteredDeath = findByColumnKey(filteredInfo, 'death');
        const deathFilters: Filter[] = [
          { text: 'T', value: true },
          { text: 'F', value: false },
        ];
        const death = !filteredDeath
          ? deathFilters
          : addSelectedInfo(deathFilters, filteredDeath);

        setFilters({
          gender,
          age,
          race,
          ethnicity,
          death,
        });

        setCurrentPage(1);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [patientService, filteredInfo]);

  useEffect(() => {
    (async () => {
      try {
        const ageValue = filters?.age.find((item) => item.hasRange)?.value as
          | Range
          | undefined;

        const params: PatientListParams = {
          page: currentPage,
          length: rowsPerPage,
          order_column: sortedInfo.columnKey,
          order_desc: sortedInfo.order === 'desc' ? true : false,
          gender: filters?.gender.find((item) => item.selected)
            ?.value as string,
          age_min: ageValue?.start.value
            ? (ageValue.start.value as number)
            : undefined,
          age_max: ageValue?.end.value
            ? (ageValue.end.value as number)
            : undefined,
          race: filters?.race.find((item) => item.selected)?.value as string,
          ethnicity: filters?.ethnicity.find((item) => item.selected)
            ?.value as string,
          death: filters?.death.find((item) => item.selected)?.value as boolean,
        };

        const {
          data: { patient },
        } = await patientService.getPatientList(params);
        setData(patient);

        setColumns([
          {
            title: '?????? id',
            dataIndex: 'personID',
            key: 'person_id',
            sortOrder: sortedInfo.columnKey === 'person_id' && sortedInfo.order,
          },
          {
            title: '??????',
            dataIndex: 'gender',
            key: 'gender',
            sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
            filters: filters?.gender,
          },
          {
            title: '????????????',
            dataIndex: 'birthDatetime',
            key: 'birth',
            sortOrder: sortedInfo.columnKey === 'birth' && sortedInfo.order,
            align: 'left',
          },
          {
            title: '??????',
            dataIndex: 'age',
            key: 'age',
            filters: filters?.age,
            align: 'right',
          },
          {
            title: '??????',
            dataIndex: 'race',
            key: 'race',
            sortOrder: sortedInfo.columnKey === 'race' && sortedInfo.order,
            filters: filters?.race,
          },
          {
            title: '??????',
            dataIndex: 'ethnicity',
            key: 'ethnicity',
            sortOrder: sortedInfo.columnKey === 'ethnicity' && sortedInfo.order,
            filters: filters?.ethnicity,
          },
          {
            title: '?????? ??????',
            dataIndex: 'isDeath',
            key: 'death',
            sortOrder: sortedInfo.columnKey === 'death' && sortedInfo.order,
            filters: filters?.death,
            align: 'center',
          },
        ]);

        setBrief([]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage, rowsPerPage, patientService, sortedInfo, filters]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rowsPerPageStr: string) => {
    const newRowsPerPage = parseInt(rowsPerPageStr);
    setCurrentPage((currentPage) =>
      Math.ceil(currentPage / (newRowsPerPage / rowsPerPage)),
    );
    setRowsPerPage(newRowsPerPage);
  };

  const handleColumnSort = ({
    order,
    columnKey,
    columnDataIndex,
  }: SortedInfo) => {
    setSortedInfo({
      order: order === 'asc' ? 'desc' : order === 'desc' ? false : 'asc',
      columnKey,
      columnDataIndex,
    });
  };

  const handleColumnFilter = ({ columnKey, filter }: FilteredInfo) => {
    setFilteredInfo((filteredInfo) => {
      const newFilteredInfo = [...filteredInfo];

      const index = newFilteredInfo.findIndex(
        (item) => item.columnKey === columnKey,
      );
      if (index > -1) {
        newFilteredInfo[index] = {
          ...filteredInfo[index],
          filter,
        };
      } else {
        newFilteredInfo.push({ columnKey, filter });
      }

      return newFilteredInfo;
    });
  };

  const handleDetailRow = (index: number) => {
    (async () => {
      try {
        const {
          data: { conditionList, visitCount },
        } = await patientService.getPatientBrief(
          (data as PatientList['patient']).list[index].personID,
        );

        const brief = [
          { title: '?????? ?????? ???', text: visitCount.toString() },
          { title: '?????? ??????', text: conditionList.join(', ') },
        ];
        setBrief(brief);
      } catch (error) {
        console.log(error);
      }
    })();
  };

  return (
    <Container>
      <section>
        {data && (
          <Table
            columns={columns}
            onFilter={handleColumnFilter}
            onSort={handleColumnSort}
            dataSource={data.list.map((patient) => ({
              ...patient,
              birthDatetime: fromStringToDate(patient.birthDatetime),
              isDeath: patient.isDeath ? 'T' : 'F',
            }))}
            detailInfo={brief}
            onShowDetail={handleDetailRow}
            pagination={{
              currentPage: data.page,
              total: data.totalLength,
              rowsPerPage,
              handlePageClick,
              handleRowsPerPageChange,
            }}
          />
        )}
      </section>
    </Container>
  );
};

export default PatientInfo;

type Filters = {
  [key: string]: Filter[];
};

const findByColumnKey = (filteredInfo: FilteredInfo[], columnKey: string) => {
  return filteredInfo.find((item) => item.columnKey === columnKey);
};

const makeFilters = (filterKeys: string[]): Filter[] => {
  return filterKeys.map((filterKey) => ({
    text: filterKey,
    value: filterKey,
  }));
};

const addSelectedInfo = (filters: Filter[], filtered: FilteredInfo) => {
  return filters.map((filter: Filter) => ({
    ...filter,
    selected:
      filtered?.filter.value === filter.value && filtered?.filter.selected,
  }));
};

const addRangeInfo = (filters: Filter[], filtered: FilteredInfo) => {
  return filters.map((filter) => ({
    ...filter,
    hasRange: filtered.filter.hasRange,
    value: filtered.filter.value,
  }));
};

const fromStringToDate = (dateStr: string) => {
  return new Date(dateStr).toISOString().slice(0, 10);
};
