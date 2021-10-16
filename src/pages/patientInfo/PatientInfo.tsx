import { useEffect, useState } from 'react';
import { PatientList } from 'utils/types/patient';
import Table from 'components/table';
import { Container } from './PatientInfoStyle';
import PatientService from 'services/patient';
import { generatePatientList } from 'utils/dummy/patientList';

interface PatientProps {
  patientService: PatientService;
}

const PatientInfo: React.FC<PatientProps> = ({
  patientService,
}: PatientProps) => {
  const [data, setData] = useState<PatientList['patient']>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const columns = [
    { title: '환자 id', dataIndex: 'personID', key: 'personID' },
    { title: '성별', dataIndex: 'gender', key: 'gender' },
    { title: '생년월일', dataIndex: 'birthDatetime', key: 'birthDatetime' },
    { title: '나이', dataIndex: 'age', key: 'age' },
    { title: '인종', dataIndex: 'race', key: 'race' },
    { title: '민족', dataIndex: 'ethnicity', key: 'ethnicity' },
    { title: '사망 여부', dataIndex: 'isDeath', key: 'isDeath' },
  ];

  useEffect(() => {
    (async () => {
      try {
        // const {
        //   data: { patient },
        // } = await patientService.getPatientList(currentPage, rowsPerPage);
        // setData(patient);

        /**
         * API 500 오류로 더미 데이터 사용
         */
        setData(generatePatientList(currentPage, rowsPerPage));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage, rowsPerPage, patientService]);

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

  return (
    <Container>
      {data && (
        <Table
          columns={columns}
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
