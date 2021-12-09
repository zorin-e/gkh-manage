import { CommonList } from "../types";

export type CompanyId = string;

export type GetCompanyRequest = {
  id: CompanyId;
};

export type GetCompanyResponse = {
  id: CompanyId;
  name: string;
  phone: string;
  postcode: string;
  address: string;
};

export type AddCompanyRequest = {
  name: string;
  phone: string;
  postcode: string;
  address: string;
};

export type AddCompanyResponse = {
  id: CompanyId;
  name: string;
  phone: string;
  postcode: string;
  address: string;
};

export type UpdateCompanyRequest = {
  name?: string;
  phone?: string;
  postcode?: string;
  address?: string;
};

export type UpdateCompanyResponse = {
  id: CompanyId;
  name: string;
  phone: string;
  postcode: string;
  address: string;
};

export type GetAllCompaniesRequest =
  | {
      filters?: {
        name?: string;
        address?: string;
      };
      paginate?: {
        page?: number;
        perpage?: number;
      };
    }
  | string;

export type GetAllCompaniesResponse = CommonList<GetCompanyResponse>;

export type DeleteCompanyRequest = {
  id: CompanyId;
};

export type DeleteCompanyResponse = null;
