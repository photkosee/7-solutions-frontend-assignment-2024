// Original file: proto/departments.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AllDepartmentSummaryResponse as _departments_AllDepartmentSummaryResponse, AllDepartmentSummaryResponse__Output as _departments_AllDepartmentSummaryResponse__Output } from '../departments/AllDepartmentSummaryResponse';
import type { DepartmentSummaryRequest as _departments_DepartmentSummaryRequest, DepartmentSummaryRequest__Output as _departments_DepartmentSummaryRequest__Output } from '../departments/DepartmentSummaryRequest';
import type { DepartmentSummaryResponse as _departments_DepartmentSummaryResponse, DepartmentSummaryResponse__Output as _departments_DepartmentSummaryResponse__Output } from '../departments/DepartmentSummaryResponse';
import type { Empty as _departments_Empty, Empty__Output as _departments_Empty__Output } from '../departments/Empty';

export interface DepartmentServiceClient extends grpc.Client {
  getAllDepartmentSummary(argument: _departments_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_departments_AllDepartmentSummaryResponse__Output>): grpc.ClientUnaryCall;
  getAllDepartmentSummary(argument: _departments_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_departments_AllDepartmentSummaryResponse__Output>): grpc.ClientUnaryCall;
  getAllDepartmentSummary(argument: _departments_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_departments_AllDepartmentSummaryResponse__Output>): grpc.ClientUnaryCall;
  getAllDepartmentSummary(argument: _departments_Empty, callback: grpc.requestCallback<_departments_AllDepartmentSummaryResponse__Output>): grpc.ClientUnaryCall;
  
  getDepartmentSummary(argument: _departments_DepartmentSummaryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_departments_DepartmentSummaryResponse__Output>): grpc.ClientUnaryCall;
  getDepartmentSummary(argument: _departments_DepartmentSummaryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_departments_DepartmentSummaryResponse__Output>): grpc.ClientUnaryCall;
  getDepartmentSummary(argument: _departments_DepartmentSummaryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_departments_DepartmentSummaryResponse__Output>): grpc.ClientUnaryCall;
  getDepartmentSummary(argument: _departments_DepartmentSummaryRequest, callback: grpc.requestCallback<_departments_DepartmentSummaryResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface DepartmentServiceHandlers extends grpc.UntypedServiceImplementation {
  getAllDepartmentSummary: grpc.handleUnaryCall<_departments_Empty__Output, _departments_AllDepartmentSummaryResponse>;
  
  getDepartmentSummary: grpc.handleUnaryCall<_departments_DepartmentSummaryRequest__Output, _departments_DepartmentSummaryResponse>;
  
}

export interface DepartmentServiceDefinition extends grpc.ServiceDefinition {
  getAllDepartmentSummary: MethodDefinition<_departments_Empty, _departments_AllDepartmentSummaryResponse, _departments_Empty__Output, _departments_AllDepartmentSummaryResponse__Output>
  getDepartmentSummary: MethodDefinition<_departments_DepartmentSummaryRequest, _departments_DepartmentSummaryResponse, _departments_DepartmentSummaryRequest__Output, _departments_DepartmentSummaryResponse__Output>
}
