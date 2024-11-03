import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { DepartmentServiceClient as _departments_DepartmentServiceClient, DepartmentServiceDefinition as _departments_DepartmentServiceDefinition } from './departments/DepartmentService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  departments: {
    AllDepartmentSummaryResponse: MessageTypeDefinition
    DepartmentService: SubtypeConstructor<typeof grpc.Client, _departments_DepartmentServiceClient> & { service: _departments_DepartmentServiceDefinition }
    DepartmentSummary: MessageTypeDefinition
    DepartmentSummaryRequest: MessageTypeDefinition
    DepartmentSummaryResponse: MessageTypeDefinition
    Empty: MessageTypeDefinition
  }
}

