import { useEffect, useRef, useState } from 'react';
import PatientService, { PatientListParams } from 'services/patient';
import { PatientList } from 'utils/types/patient';
import { generatePatientList } from 'utils/dummy/patientList';
import Table from 'components/table';
import { SortOrder } from 'components/table/Table';
import { Container } from './PatientInfoStyle';
import { generateGenderList } from 'utils/dummy/genderList';
import { generateRaceList } from 'utils/dummy/raceList';
import { generateEthnicityList } from 'utils/dummy/ethnicityList';

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
  const filters = useRef<filters>();

  const columns = [
    {
      title: '환자 id',
      dataIndex: 'personID',
      key: 'person_id',
      sortOrder: sortedInfo.columnKey === 'person_id' && sortedInfo.order,
    },
    {
      title: '성별',
      dataIndex: 'gender',
      key: 'gender',
      sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
      filters: filters.current?.gender.map((item) => ({
        text: item,
        value: item,
      })),
    },
    {
      title: '생년월일',
      dataIndex: 'birthDatetime',
      key: 'birth',
      sortOrder: sortedInfo.columnKey === 'birth' && sortedInfo.order,
    },
    {
      title: '나이',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '인종',
      dataIndex: 'race',
      key: 'race',
      sortOrder: sortedInfo.columnKey === 'race' && sortedInfo.order,
      filters: filters.current?.race.map((item) => ({
        text: item,
        value: item,
      })),
    },
    {
      title: '민족',
      dataIndex: 'ethnicity',
      key: 'ethnicity',
      sortOrder: sortedInfo.columnKey === 'ethnicity' && sortedInfo.order,
      filters: filters.current?.ethnicity.map((item) => ({
        text: item,
        value: item,
      })),
    },
    {
      title: '사망 여부',
      dataIndex: 'isDeath',
      key: 'death',
      sortOrder: sortedInfo.columnKey === 'death' && sortedInfo.order,
      filters: [
        { text: 'T', value: true },
        { text: 'F', value: false },
      ],
    },
  ];

  useEffect(() => {
    try {
      (async () => {
        const { genderList } = generateGenderList();
        const { raceList } = generateRaceList();
        const { ethnicityList } = generateEthnicityList();
        filters.current = {
          gender: genderList,
          race: raceList,
          ethnicity: ethnicityList,
        };
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const params: PatientListParams = {
          page: currentPage,
          length: rowsPerPage,
          order_column: sortedInfo.columnDataIndex,
          order_desc: sortedInfo.order === 'desc' ? true : false,
        };

        // const {
        //   data: { patient },
        // } = await patientService.getPatientList(params);
        // setData(patient);

        /**
         * API 500 오류로 더미 데이터 사용
         */
        setData(generatePatientList(params));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage, rowsPerPage, patientService, sortedInfo]);

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

  return (
    <Container>
      {data && (
        <Table
          columns={columns}
          onSort={handleColumnSort}
          dataSource={data.list.map((patient) => ({
            ...patient,
            isDeath: patient.isDeath ? 'T' : 'F',
          }))}
          pagination={{
            currentPage: data.page,
            total: data.totalLength,
            rowsPerPage,
            handlePageClick,
            handleRowsPerPageChange,
          }}
        />
      )}
    </Container>
  );
};

export default PatientInfo;

export type SortedInfo = {
  order: SortOrder;
  columnKey: string;
  columnDataIndex?: string; // for dummy data
};

type filters = {
  gender: string[];
  race: string[];
  ethnicity: string[];
};
