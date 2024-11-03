// Original file: proto/departments.proto


export interface DepartmentSummary {
  'male'?: (number);
  'female'?: (number);
  'ageRange'?: (string);
  'hair'?: ({[key: string]: number});
  'addressUser'?: ({[key: string]: string});
}

export interface DepartmentSummary__Output {
  'male'?: (number);
  'female'?: (number);
  'ageRange'?: (string);
  'hair'?: ({[key: string]: number});
  'addressUser'?: ({[key: string]: string});
}
