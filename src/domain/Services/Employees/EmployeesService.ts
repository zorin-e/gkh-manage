import {
  AddEmployeeRequest,
  DeleteEmployeeRequest,
  GetEmployeeRequest,
  EmployeeId,
  UpdateEmployeeRequest,
  GetEmployeeResponse,
  UpdateEmployeeResponse,
} from "@/infrastructure/Api/Employees/types";
import { Employees } from "@/infrastructure/Api/Employees";
import { phrases } from "@/domain/constants/phrases";
import { Response } from "@/infrastructure/Http";

export class EmployeesService {
  constructor(private repository: Employees) {}

  get(data: GetEmployeeRequest): Promise<Response<GetEmployeeResponse>> {
    return this.repository.get(data);
  }

  async add(employee: AddEmployeeRequest) {
    const response = await this.repository.add(employee);
    const { success } = response;
    if (success) response.payload.message = "Сотрудник создан";
    else response.payload.message = phrases.checkFields;
    return response;
  }

  async update(
    id: EmployeeId,
    employee: UpdateEmployeeRequest
  ): Promise<Response<UpdateEmployeeResponse>> {
    const response = await this.repository.update(id, employee);
    const { success } = response;
    if (success) response.payload.message = "Сотрудник сохранён";
    else response.payload.message = phrases.checkFields;
    return response;
  }

  getAll(params = "") {
    return this.repository.getAll(params);
  }

  delete(data: DeleteEmployeeRequest) {
    return this.repository.delete(data);
  }
}
