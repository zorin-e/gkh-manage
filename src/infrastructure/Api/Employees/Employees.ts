import { Http } from "@/infrastructure/Http";
import { Response } from "@/infrastructure/Http/Response";
import { CompanyId } from "../Companies/types";
import {
  AddEmployeeRequest,
  AddEmployeeResponse,
  DeleteEmployeeRequest,
  DeleteEmployeeResponse,
  GetAllEmployeesResponse,
  GetEmployeeRequest,
  GetEmployeeResponse,
  EmployeeId,
  UpdateEmployeeRequest,
  UpdateEmployeeResponse,
} from "./types";

export class Employees {
  constructor(private http: Http) {}

  async get({
    id,
  }: GetEmployeeRequest): Promise<Response<GetEmployeeResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/managers/${id}`,
      })
    );
  }

  async add(
    employee: AddEmployeeRequest
  ): Promise<Response<AddEmployeeResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/managers`,
        method: "post",
        data: employee,
      })
    );
  }

  async update(
    id: EmployeeId,
    data: UpdateEmployeeRequest
  ): Promise<Response<UpdateEmployeeResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/managers/${id}`,
        method: "put",
        data,
      })
    );
  }

  async getAll(params?: string): Promise<Response<GetAllEmployeesResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/managers?${params}`,
      })
    );
  }

  async delete({
    id,
  }: DeleteEmployeeRequest): Promise<Response<DeleteEmployeeResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/managers/${id}`,
        method: "delete",
      })
    );
  }
}
