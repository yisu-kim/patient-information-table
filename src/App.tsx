import { useEffect, useState } from 'react';
import axios from 'axios';
import PatientService from 'services/patient';
import { ModifiedPatient } from 'utils/types/patient';
import PatientInfo from 'pages/patientInfo';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_PATIENT_API_BASE_URL,
});
const patientService = new PatientService(httpClient);

const App: React.FC = () => {
  const [data, setData] = useState<ModifiedPatient[]>([]);

  useEffect(() => {
    (async () => {
      const {
        data: {
          patient: { list },
        },
      } = await patientService.getPatientList();
      setData(
        list.map((patient) => ({
          ...patient,
          isDeath: patient.isDeath ? 'T' : 'F',
        })),
      );
    })();
  }, []);

  return <PatientInfo patients={data} />;
};

export default App;
