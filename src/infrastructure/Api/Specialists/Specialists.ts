import { Http } from "@/infrastructure/Http";
import { Response } from "@/infrastructure/Http/Response";
import {
  AddSpecialistRequest,
  AddSpecialistResponse,
  DeleteSpecialistRequest,
  DeleteSpecialistResponse,
  GetAllSpecialistsResponse,
  GetSpecialistRequest,
  GetSpecialistResponse,
  SpecialistId,
  UpdateSpecialistRequest,
  UpdateSpecialistResponse,
} from "./types";

export class Specialists {
  constructor(private http: Http) {}

  async get({
    id,
  }: GetSpecialistRequest): Promise<Response<GetSpecialistResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/staff/${id}`,
      })
    );
  }

  async add(
    specialist: AddSpecialistRequest
  ): Promise<Response<AddSpecialistResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/staff`,
        method: "post",
        data: specialist,
      })
    );
  }

  async update(
    id: SpecialistId,
    data: UpdateSpecialistRequest
  ): Promise<Response<UpdateSpecialistResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/staff/${id}`,
        method: "put",
        data,
      })
    );
  }

  async getAll(params?: string): Promise<Response<GetAllSpecialistsResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/staff?${params}`,
      })
    );
  }

  async delete({
    id,
  }: DeleteSpecialistRequest): Promise<Response<DeleteSpecialistResponse>> {
    return new Response(
      await this.http.request({
        url: `/api/users/staff/${id}`,
        method: "delete",
      })
    );
  }
}
