import { useEffect, useState } from 'react';
import PatientService from 'services/patient';
import { PatientList } from 'utils/types/patient';
import { generatePatientList } from 'utils/dummy/patientList';
import Table from 'components/table';
import { SortOrder } from 'components/table/Table';
import { Container } from './PatientInfoStyle';

interface PatientProps {
  patientService: PatientService;
}

type SortedInfo = {
  order: SortOrder;
  columnKey: string;
};

const PatientInfo: React.FC<PatientProps> = ({
  patientService,
}: PatientProps) => {
  const [data, setData] = useState<PatientList['patient']>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortedInfo, setSortedInfo] = useState<SortedInfo>({
    order: false,
    columnKey: '',
  });
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
    },
    {
      title: '민족',
      dataIndex: 'ethnicity',
      key: 'ethnicity',
      sortOrder: sortedInfo.columnKey === 'ethnicity' && sortedInfo.order,
    },
    {
      title: '사망 여부',
      dataIndex: 'isDeath',
      key: 'death',
      sortOrder: sortedInfo.columnKey === 'death' && sortedInfo.order,
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        // const {
        //   data: { patient },
        // } = await patientService.getPatientList(
        //   currentPage,
        //   rowsPerPage,
        //   sortedInfo.order === 'desc' ? true : false,
        //   sortedInfo.columnKey,
        // );
        // setData(patient);

        /**
         * API 500 오류로 더미 데이터 사용
         */
        setData(generatePatientList(currentPage, rowsPerPage));
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

  const handleColumnSort = (columnKey: string) => {
    setSortedInfo((sortedInfo) => ({
      order:
        sortedInfo?.order === 'asc'
          ? 'desc'
          : sortedInfo?.order === 'desc'
          ? false
          : 'asc',
      columnKey,
    }));
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
