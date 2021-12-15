import { GetAllEmployeesResponse } from "@/infrastructure/Api/Employees/types";

export type EmployeesState = {
  employees: GetAllEmployeesResponse;
};
