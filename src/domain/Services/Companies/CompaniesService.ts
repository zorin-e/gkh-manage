import { Companies } from "@/infrastructure/Api/Companies";
import {
  AddCompanyRequest,
  CompanyId,
  DeleteCompanyRequest,
  GetAllCompaniesRequest,
  GetCompanyRequest,
  ShortCompanies,
  UpdateCompanyRequest,
} from "@/infrastructure/Api/Companies/types";
import { Response } from "@/infrastructure/Http";
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

  getAll(params = "") {
    return this.repository.getAll(params);
  }

  async getAllWithShortData(): Promise<ShortCompanies> {
    const { payload } = await this.getAll("paginate[perpage]=50");
    const shortData = !payload.data
      ? []
      : payload.data.data.map((company) => ({
          id: company.id,
          name: company.name,
        }));
    return shortData;
  }

  delete(data: DeleteCompanyRequest) {
    return this.repository.delete(data);
  }
}
