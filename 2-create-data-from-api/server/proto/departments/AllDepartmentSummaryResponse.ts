// Original file: proto/departments.proto

import type { DepartmentSummary as _departments_DepartmentSummary, DepartmentSummary__Output as _departments_DepartmentSummary__Output } from '../departments/DepartmentSummary';

export interface AllDepartmentSummaryResponse {
  'departments'?: ({[key: string]: _departments_DepartmentSummary});
}

export interface AllDepartmentSummaryResponse__Output {
  'departments'?: ({[key: string]: _departments_DepartmentSummary__Output});
}
