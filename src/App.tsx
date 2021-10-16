import axios from 'axios';
import PatientService from 'services/patient';
import PatientInfo from 'pages/patientInfo';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_PATIENT_API_BASE_URL,
});
const patientService = new PatientService(httpClient);

const App: React.FC = () => {
  return <PatientInfo patientService={patientService} />;
};

export default App;
