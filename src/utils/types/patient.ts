export type Patient = {
  age: number;
  birthDatetime: string;
  ethnicity: string;
  gender: string;
  isDeath: boolean;
  personID: number;
  race: string;
};

export type ModifiedPatient = Omit<Patient, 'isDeath'> & { isDeath: 'T' | 'F' };

export type PatientList = {
  patient: {
    list: Patient[];
    page: number;
    totalLength: number;
  };
};

export type GenderList = {
  genderList: string[];
};

export type RaceList = {
  raceList: string[];
};

export type EthnicityList = {
  ethnicityList: string[];
};

export type PatientBrief = {
  conditionList: string[];
  visitCount: number;
};

export type PatientStat = {
  count: number;
  ethnicity: string;
  gender: string;
  race: string;
};

export type PatientStats = {
  stats: PatientStat[];
};
