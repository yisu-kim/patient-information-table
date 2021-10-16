import { ModifiedPatient } from 'utils/types/patient';
import Table from 'components/table';

interface PatientProps {
  patients: ModifiedPatient[];
}

const PatientInfo: React.FC<PatientProps> = ({ patients }: PatientProps) => {
  const columns = [
    { title: '환자 id', dataIndex: 'personID', key: 'personID' },
    { title: '성별', dataIndex: 'gender', key: 'gender' },
    { title: '생년월일', dataIndex: 'birthDatetime', key: 'birthDatetime' },
    { title: '나이', dataIndex: 'age', key: 'age' },
    { title: '인종', dataIndex: 'race', key: 'race' },
    { title: '민족', dataIndex: 'ethnicity', key: 'ethnicity' },
    { title: '사망 여부', dataIndex: 'isDeath', key: 'isDeath' },
  ];

  return <Table columns={columns} dataSource={patients} />;
};

export default PatientInfo;
