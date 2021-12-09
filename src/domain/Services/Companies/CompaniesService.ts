import { Companies } from "@/infrastructure/Api/Companies";
import {
  AddCompanyRequest,
  CompanyId,
  DeleteCompanyRequest,
  GetAllCompaniesRequest,
  GetCompanyRequest,
  UpdateCompanyRequest,
} from "@/infrastructure/Api/Companies/types";
export class CompaniesService {
  constructor(private repository: Companies) {}

  get(data: GetCompanyRequest) {
    return this.repository.get(data);
  }

  async add(company: AddCompanyRequest) {
    const response = await this.repository.add(company);
    const { success } = response;
    if (success) response.payload.message = "Компания создана";
    return response;
  }

  async update(id: CompanyId, company: UpdateCompanyRequest) {
    const response = await this.repository.update(id, company);
    const { success } = response;
    if (success) response.payload.message = "Компания сохранена";
    return response;
  }

  getAll(params?: GetAllCompaniesRequest) {
    return this.repository.getAll(params);
  }

  delete(data: DeleteCompanyRequest) {
    return this.repository.delete(data);
  }
}
