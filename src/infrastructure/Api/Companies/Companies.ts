import { Http } from "@/infrastructure/Http";
import { Response } from "@/infrastructure/Http/Response";
import {
  AddCompanyRequest,
  AddCompanyResponse,
  CompanyId,
  DeleteCompanyRequest,
  DeleteCompanyResponse,
  GetAllCompaniesResponse,
  GetCompanyRequest,
  GetCompanyResponse,
  UpdateCompanyRequest,
  UpdateCompanyResponse,
} from "./types";

export class Companies {
  constructor(private http: Http) {}

  async get({ id }: GetCompanyRequest): Promise<Response<GetCompanyResponse>> {
    return new Response(
      await this.http.request({
        url: `/companies/${id}`,
      })
    );
  }

  async add(company: AddCompanyRequest): Promise<Response<AddCompanyResponse>> {
    return new Response(
      await this.http.request({
        url: "/companies",
        method: "post",
        data: company,
      })
    );
  }

  async update(
    id: CompanyId,
    data: UpdateCompanyRequest
  ): Promise<Response<UpdateCompanyResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/companies/${id}`,
        method: "put",
        data,
      })
    );
  }

  async getAll(params?: string): Promise<Response<GetAllCompaniesResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/companies?${params}`,
      })
    );
  }

  async delete({
    id,
  }: DeleteCompanyRequest): Promise<Response<DeleteCompanyResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/companies/${id}`,
        method: "delete",
      })
    );
  }
}
