import { CommonList } from "../types";

export type EmployeeId = number;

export type GetEmployeeRequest = {
  id: EmployeeId;
};

export type GetEmployeeResponse = {
  group: number;
  id: EmployeeId;
  name: string;
  surname: string;
  email: string;
  role_id: number;
};

export type AddEmployeeRequest = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role_id: number;
};

export type AddEmployeeResponse = GetEmployeeResponse;

export type UpdateEmployeeRequest = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  role_id?: number;
};

export type UpdateEmployeeResponse = GetEmployeeResponse;

export type GetAllEmployeesResponse = CommonList<GetEmployeeResponse>;

export type DeleteEmployeeRequest = {
  id: EmployeeId;
};

export type DeleteEmployeeResponse = null;
