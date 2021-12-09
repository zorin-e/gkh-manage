import { Companies } from "@/infrastructure/Api/Companies";
import {
  AddCompanyRequest,
  DeleteCompanyRequest,
  GetAllCompaniesRequest,
  GetCompanyRequest,
  UpdateCompanyRequest,
} from "@/infrastructure/Api/Companies/types";
import { Http } from "@/infrastructure/Http";

export class CompaniesService {
  constructor(private repository: Companies) {}

  get(data: GetCompanyRequest) {
    return this.repository.get(data);
  }

  add(company: AddCompanyRequest) {
    return this.repository.add(company);
  }

  update(company: UpdateCompanyRequest) {
    return this.repository.update(company);
  }

  getAll(params?: GetAllCompaniesRequest) {
    return this.repository.getAll(params);
  }

  delete(data: DeleteCompanyRequest) {
    return this.repository.delete(data);
  }
}
