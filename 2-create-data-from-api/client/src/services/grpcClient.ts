import { UserServiceClient } from "./generated/UserServiceClientPb";
import { Empty } from "./generated/user_pb";

const client = new UserServiceClient("http://localhost:50051");

export const fetchDepartmentSummary = async () => {
  const request = new Empty();

  return new Promise((resolve, reject) => {
    client.getUserSummary(request, null, (err, response) => {
      if (err) reject(err);
      else resolve(response?.toObject().departments);
    });
  });
}
