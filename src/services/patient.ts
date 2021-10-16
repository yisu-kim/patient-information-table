import { AxiosInstance, AxiosResponse } from 'axios';
import {
  EthnicityList,
  GenderList,
  PatientBrief,
  PatientList,
  PatientStats,
  RaceList,
} from 'utils/types/patient';

const PATIENT_LIST_URL = '/api/patient/list';

const GENDER_LIST_URL = '/api/gender/list';
const RACE_LIST_URL = '/api/race/list';
const ETHNICITY_LIST_URL = '/api/ethnicity/list';

const PATIENT_BRIEF_URL = '/api/patient/brief';

const PATIENT_STATS_URL = '/api/patient/stats';

class PatientService {
  constructor(private httpClient: AxiosInstance) {}

  getPatientList = (
    page = 1,
    length = 10,
    order_desc = false,
    order_column?: string,
  ): Promise<AxiosResponse<PatientList>> => {
    type Params = {
      page: number;
      length: number;
      order_desc: boolean;
      order_column?: string;
    };

    const params: Params = {
      page,
      length,
      order_desc,
    };

    if (order_column) {
      params.order_column = order_column;
    }

    return this.httpClient.get<PatientList>(PATIENT_LIST_URL, {
      params,
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
