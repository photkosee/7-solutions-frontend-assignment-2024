import axios from "axios";
import NodeCache from 'node-cache';

import groupByDepartment from "./groupByDepartment";
import { User } from "../types";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
const TARGET_URL = "https://dummyjson.com/users";

const fetchData = async () => {
  // Check cache for existing data
  const cachedData = cache.get(TARGET_URL);
  if (cachedData) {
    return cachedData;
  }

  // Fetch new data if not in cache
  const { data } = await axios.get(TARGET_URL);

  // Cache the data for future requests
  cache.set(TARGET_URL, data);

  return data;
}

const summarizeAllDepartments = async () => {
  const data = await fetchData();
  const users: User[] = data.users;
  const departments = groupByDepartment(users);

  return { departments };
}

const summarizeDepartment = async (department: string) => {
  const data = await fetchData();
  const users: User[] = data.users;
  const departments = groupByDepartment(users);

  return departments[department];
}

export { summarizeAllDepartments, summarizeDepartment };