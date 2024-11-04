import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/departments';
import { AllDepartmentSummaryResponse__Output } from './proto/departments/AllDepartmentSummaryResponse';
import { DepartmentSummaryResponse__Output } from './proto/departments/DepartmentSummaryResponse';
import { Request, Response } from 'express';

const express = require('express');
const cors = require('cors');
const host = '0.0.0.0:9090';
const port = 3003;

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));

const packageDefinition = protoLoader.loadSync('./proto/departments.proto', {
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const departmentProto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const departmentStub = new departmentProto.departments.DepartmentService(
  host,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
departmentStub.waitForReady(deadline, (error?: Error) => {
  if (error) {
    console.log(`Client connect error: ${error.message}`);
  }
});

app.get("/api/v1/departments", (req: Request, res: Response) => {
  departmentStub.getAllDepartmentSummary(
    {},
    (error?: grpc.ServiceError | null, AllDepartmentSummaryResponse?: AllDepartmentSummaryResponse__Output) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (AllDepartmentSummaryResponse) {
        res.status(200).send(AllDepartmentSummaryResponse);
      }
    }
  );
});

app.get("/api/v1/departments/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  departmentStub.getDepartmentSummary(
    { department: id },
    (error?: grpc.ServiceError | null, DepartmentSummaryResponse?: DepartmentSummaryResponse__Output) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (DepartmentSummaryResponse) {
        res.status(200).send(DepartmentSummaryResponse);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`API is listening on port ${port}`)
});
