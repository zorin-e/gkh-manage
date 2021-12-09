import {
  CompanyId,
  GetAllCompaniesResponse,
  GetCompanyResponse,
  ShortCompanies,
} from "@/infrastructure/Api/Companies/types";

export type CompaniesState = {
  companies: GetAllCompaniesResponse;
  shortCompanies: ShortCompanies;
  selectedCompanyId: CompanyId | null;
};
