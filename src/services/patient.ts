import { AxiosInstance, AxiosResponse } from 'axios';
import {
  EthnicityList,
  GenderList,
  PatientBrief,
  PatientList,
  PatientStats,
  RaceList,
} from 'utils/types/patient';

class PatientService {
  constructor(private httpClient: AxiosInstance) {}

  getPatientList = ({
    page = 1,
    length = 10,
    order_desc = false,
    ...rest
  }: PatientListParams): Promise<AxiosResponse<PatientList>> => {
    return this.httpClient.get<PatientList>(PATIENT_LIST_URL, {
      params: {
        page,
        length,
        order_desc,
        ...rest,
      },
    });
  };

  getGenderList = (): Promise<AxiosResponse<GenderList>> => {
    return this.httpClient.get<GenderList>(GENDER_LIST_URL);
  };

  getRaceList = (): Promise<AxiosResponse<RaceList>> => {
    return this.httpClient.get<RaceList>(RACE_LIST_URL);
  };

  getEthnicityList = (): Promise<AxiosResponse<EthnicityList>> => {
    return this.httpClient.get<EthnicityList>(ETHNICITY_LIST_URL);
  };

  getPatientBrief = (
    personId: number,
  ): Promise<AxiosResponse<PatientBrief>> => {
    return this.httpClient.get<PatientBrief>(
      `${PATIENT_BRIEF_URL}/${personId}`,
    );
  };

  getPatientStats = (): Promise<AxiosResponse<PatientStats>> => {
    return this.httpClient.get<PatientStats>(PATIENT_STATS_URL);
  };
}

export default PatientService;

const PATIENT_LIST_URL = '/api/patient/list';

const GENDER_LIST_URL = '/api/gender/list';
const RACE_LIST_URL = '/api/race/list';
const ETHNICITY_LIST_URL = '/api/ethnicity/list';

const PATIENT_BRIEF_URL = '/api/patient/brief';

const PATIENT_STATS_URL = '/api/patient/stats';

export interface PatientListParams {
  page: number;
  length: number;
  order_column?: string;
  order_desc: boolean;
  gender?: string;
  race?: string;
  ethnicity?: string;
  age_min?: number;
  age_max?: number;
  death?: boolean;
}
