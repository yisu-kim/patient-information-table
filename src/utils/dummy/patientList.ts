import { PatientListParams } from 'services/patient';
import { Patient, PatientList } from 'utils/types/patient';

export const generatePatientList = ({
  page = 1,
  length = 10,
  order_desc = false,
  ...rest
}: PatientListParams): PatientList['patient'] => {
  const { order_column, gender, race, ethnicity, age_min, age_max, death } =
    rest;
  const totalLength = 1000;
  let list: Patient[] = [];

  // for generating
  for (let i = (page - 1) * length + 1; i <= page * length; i++) {
    list.push({
      personID: i,
      age: 0,
      birthDatetime: 'string',
      ethnicity: getRandomItem(['nonhispanic', 'hispanic']),
      gender: getRandomItem(['M', 'F']),
      isDeath: getRandomItem([true, false]),
      race: getRandomItem(['other', 'native', 'black', 'white', 'asian']),
    });
  }

  // for sorting
  if (order_column) {
    list.sort((a: any, b: any) => {
      if (order_desc) {
        return a[order_column] < b[order_column]
          ? 1
          : a[order_column] > b[order_column]
          ? -1
          : 0;
      }
      return a[order_column] < b[order_column]
        ? -1
        : a[order_column] > b[order_column]
        ? 1
        : 0;
    });
  }

  //for filtering
  if (gender) {
    list = list.filter((item) => item.gender === gender);
  }
  if (race) {
    list = list.filter((item) => item.race === race);
  }
  if (ethnicity) {
    list = list.filter((item) => item.ethnicity === ethnicity);
  }
  if (age_min) {
    list = list.filter((item) => item.age >= age_min);
  }
  if (age_max) {
    list = list.filter((item) => item.age <= age_max);
  }
  if (death) {
    list = list.filter((item) => item.isDeath === death);
  }

  return {
    list,
    page,
    totalLength,
  };
};

const getRandomItem = (items: any[]) => {
  return items[Math.floor(Math.random() * items.length)];
};
