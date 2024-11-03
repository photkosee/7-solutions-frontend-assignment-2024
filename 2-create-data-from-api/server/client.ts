import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/departments';
import { AllDepartmentSummaryResponse } from './proto/departments/AllDepartmentSummaryResponse';

const host = '0.0.0.0:9090';
const packageDefinition = protoLoader.loadSync('./proto/departments.proto', {
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const client = new proto.departments.DepartmentService(
  host,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (error?: Error) => {
  if (error) {
    console.log(`Client connect error: ${error.message}`);
  } else {
    onClientReady();
  }
});

const onClientReady = () => {
  switch (process.argv[process.argv.length - 1]) {
    case '--all':
      getAllDepartmentSummary();
      break;
    default:
      throw new Error('Example not specified');
  }
}

const getAllDepartmentSummary = () => {
  client.getAllDepartmentSummary(
    {},
    (error?: grpc.ServiceError | null, AllDepartmentSummaryResponse?: AllDepartmentSummaryResponse) => {
      if (error) {
        console.error(error.message);
      } else if (AllDepartmentSummaryResponse && AllDepartmentSummaryResponse.departments) {
        console.log(
          `(client) Got server message: ${AllDepartmentSummaryResponse.departments["Engineering"]?.male}`
        );
      }
    }
  );
}
