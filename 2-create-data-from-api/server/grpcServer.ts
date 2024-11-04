import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

import { summarizeAllDepartments, summarizeDepartment } from './utils/summarizeDepartment';
import { Empty } from './proto/departments/Empty';
import { DepartmentServiceHandlers } from './proto/departments/DepartmentService';
import { DepartmentSummaryResponse } from './proto/departments/DepartmentSummaryResponse';
import { AllDepartmentSummaryResponse } from './proto/departments/AllDepartmentSummaryResponse';
import { ProtoGrpcType } from './proto/departments';
import { DepartmentSummaryRequest } from './proto/departments/DepartmentSummaryRequest';


const host = '0.0.0.0:9090';

const departmentServer: DepartmentServiceHandlers = {
  async getAllDepartmentSummary(
    call: grpc.ServerUnaryCall<Empty, AllDepartmentSummaryResponse>,
    callback: grpc.sendUnaryData<AllDepartmentSummaryResponse>
  ) {
    try {
      const summarizedData = await summarizeAllDepartments();
      callback(null, summarizedData);
    } catch (error) {
      callback(null, null);
    }
  },

  async getDepartmentSummary(
    call: grpc.ServerUnaryCall<DepartmentSummaryRequest, DepartmentSummaryResponse>,
    callback: grpc.sendUnaryData<DepartmentSummaryResponse>
  ) {
    try {
      const summarizedData = await summarizeDepartment(call.request.department!);
      callback(null, { department: summarizedData });
    } catch (error) {
      callback(null, null);
    }
  },
};

const getServer = (): grpc.Server => {
  const packageDefinition = protoLoader.loadSync('./proto/departments.proto');
  const proto = (grpc.loadPackageDefinition(
    packageDefinition
  ) as unknown) as ProtoGrpcType;
  const server = new grpc.Server();
  server.addService(proto.departments.DepartmentService.service, departmentServer);

  return server;
}

if (require.main === module) {
  const server = getServer();

  server.bindAsync(
    host,
    grpc.ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server bound on port: ${port}`);
      }
    }
  );
}
