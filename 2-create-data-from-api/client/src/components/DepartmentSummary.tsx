import { useEffect, useState } from "react";

import { fetchDepartmentSummary } from "../services/grpcClient";
import { DepartmentSummaryType } from "../types";

const DepartmentSummary = () => {
  const [departments, setDepartments] = useState<DepartmentSummaryType[]>([]);

  useEffect(() => {
    fetchDepartmentSummary()
      .then((data) => setDepartments(data))
      .catch((error) => console.error(error));
  }, []);

  if (!departments) return <div>Loading...</div>;

  return (
    <div>
      {Object.entries(departments).map(([department, data]) => (
        <div key={department}>
          <h2>{department}</h2>
          <p>Male: {data.male}</p>
          <p>Female: {data.female}</p>
          <p>Age Range: {data.ageRange}</p>
          <h3>Hair Colors:</h3>
          <ul>
            {Object.entries(data.hair).map(([color, count]) => (
              <li key={color}>
                {color}: {count}
              </li>
            ))}
          </ul>
          <h3>Addresses:</h3>
          <ul>
            {Object.entries(data.addressUser).map(([name, postalCode]) => (
              <li key={name}>
                {name}: {postalCode}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DepartmentSummary;
