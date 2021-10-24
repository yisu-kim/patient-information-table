import axios from 'axios';
import PatientService from 'services/patient';
import PatientInfo from 'pages/patientInfo';
import { Container } from 'AppStyle';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_PATIENT_API_BASE_URL,
});
const patientService = new PatientService(httpClient);

const App: React.FC = () => {
  return (
    <Container>
      <PatientInfo patientService={patientService} />
    </Container>
  );
};

export default App;
