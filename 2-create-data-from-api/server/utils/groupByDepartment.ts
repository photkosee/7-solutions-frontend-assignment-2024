import { DepartmentSummary, User } from "../types";

const groupByDepartment = (users: User[]): Record<string, DepartmentSummary> => {
  const departments: Record<string, DepartmentSummary> = {};

  users.forEach((user) => {
    const { department } = user.company;
    if (!departments[department]) {
      // Init department if not exist
      departments[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {}
      };
    }

    const departmentData = departments[department];

    // Gender count
    if (user.gender.toLowerCase() === "male") {
      departmentData.male += 1;
    } else if (user.gender.toLowerCase() === "female") {
      departmentData.female += 1;
    }

    // Hair color count
    const hairColor = user.hair.color;
    if (!departmentData.hair[hairColor]) {
      departmentData.hair[hairColor] = 0;
    }
    departmentData.hair[hairColor] += 1;

    // Address summary
    const userNameKey = `${user.firstName}${user.lastName}`;
    departmentData.addressUser[userNameKey] = user.address.postalCode;

    // Calculate age range
    const ages = users.filter(u => u.company.department === department).map(u => u.age);
    departmentData.ageRange = `${Math.min(...ages)}-${Math.max(...ages)}`;
  });

  return departments;
}

export default groupByDepartment;
