import axios from "axios";

import groupByDepartment from "./groupByDepartment";
import { User } from "../types";

const summarizeAllDepartments = async () => {
  const { data } = await axios.get("https://dummyjson.com/users");
  const users: User[] = data.users;
  const departments = groupByDepartment(users);

  return { departments };
}

const summarizeDepartment = async (department: string) => {
  const { data } = await axios.get("https://dummyjson.com/users");
  const users: User[] = data.users;
  const departments = groupByDepartment(users);

  return departments[department];
}

export { summarizeAllDepartments, summarizeDepartment };