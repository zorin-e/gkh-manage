import { Http } from "@/infrastructure/Http";
import { Response } from "@/infrastructure/Http/Response";
import { CompanyId } from "../Companies/types";
import {
  AddHouseRequest,
  AddHouseResponse,
  DeleteHouseRequest,
  DeleteHouseResponse,
  GetAllHousesResponse,
  GetHouseRequest,
  GetHouseResponse,
  HouseId,
  UpdateHouseRequest,
  UpdateHouseResponse,
} from "./types";

export class Houses {
  constructor(private http: Http) {}

  async get({
    companyId,
    id,
  }: GetHouseRequest): Promise<Response<GetHouseResponse>> {
    return new Response(
      await this.http.request({
        url: `/buildings/${companyId}/${id}`,
      })
    );
  }

  async add(
    companyId: CompanyId,
    house: AddHouseRequest
  ): Promise<Response<AddHouseResponse>> {
    return new Response(
      await this.http.request({
        url: `/buildings/${companyId}`,
        method: "post",
        data: house,
      })
    );
  }

  async update(
    companyId: CompanyId,
    id: HouseId,
    data: UpdateHouseRequest
  ): Promise<Response<UpdateHouseResponse>> {
    return new Response(
      await this.http.request({
        url: `/buildings/${companyId}/${id}`,
        method: "put",
        data,
      })
    );
  }

  async getAll(
    companyId: CompanyId,
    params?: string
  ): Promise<Response<GetAllHousesResponse>> {
    return new Response(
      await this.http.request({
        url: `/buildings/${companyId}?${params}`,
      })
    );
  }

  async delete({
    companyId,
    id,
  }: DeleteHouseRequest): Promise<Response<DeleteHouseResponse>> {
    return new Response(
      await this.http.request({
        url: `/buildings/${companyId}/${id}`,
        method: "delete",
      })
    );
  }
}
