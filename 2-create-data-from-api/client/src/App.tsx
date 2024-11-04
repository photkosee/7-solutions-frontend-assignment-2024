import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { DepartmentSummaryType } from "./types";

function App() {
  const [departments, setDepartments] = useState<DepartmentSummaryType[]>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching departments");
    axios
      .get("http://localhost:3003/api/v1/departments")
      .then((response) => {
        if (response) {
          setDepartments(response.data.departments);
        } else {
          setError("No departments data received");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-5">
      <h1>Department Summary</h1>
      {departments && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(departments).map(
            ([dept, summary]: [string, DepartmentSummaryType]) => (
              <div
                key={dept}
                className="p-5 rounded-xl shadow-md max-w-md w-full flex flex-col gap-y-2 items-start"
              >
                <h2 className="font-bold text-lg">{dept}</h2>
                <div className="flex justify-around gap-x-2">
                  <p>
                    <span className="font-semibold">Male:</span> {summary.male}
                  </p>
                  <p>
                    <span className="font-semibold">Female:</span>{" "}
                    {summary.female}
                  </p>
                </div>

                <p>
                  <span className="font-semibold">Age Range:</span>{" "}
                  {summary.ageRange}
                </p>

                <div>
                  <p>
                    <span className="font-semibold">Hair Color:</span>
                  </p>
                  <ul className="text-start">
                    {Object.entries(summary.hair).map(
                      ([color, count]: [string, number]) => (
                        <li key={color}>
                          {color}: {count}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="text-start">
                  <p>
                    <span className="font-semibold">Address User:</span>
                  </p>
                  <ul className="text-start">
                    {Object.entries(summary.addressUser).map(
                      ([name, postalCode]: [string, string]) => (
                        <li key={name}>
                          {name}: {postalCode}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;
