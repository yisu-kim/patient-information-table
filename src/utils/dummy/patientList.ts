import { PatientList } from 'utils/types/patient';

export const generatePatientList = (
  page: number,
  length: number,
): PatientList['patient'] => {
  const totalLength = 1000;
  const list = [];
  for (let i = (page - 1) * length + 1; i <= page * length; i++) {
    list.push({
      personID: i,
      age: 0,
      birthDatetime: 'string',
      ethnicity: 'string',
      gender: 'string',
      isDeath: true,
      race: 'string',
    });
  }
  return {
    list,
    page,
    totalLength,
  };
};
