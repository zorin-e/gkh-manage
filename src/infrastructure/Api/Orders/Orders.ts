import { Http } from "@/infrastructure/Http";
import { Response } from "@/infrastructure/Http/Response";
import { CompanyId } from "../Companies/types";
import {
  AddOrderRequest,
  AddOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetAllOrdersResponse,
  GetOrderRequest,
  GetOrderResponse,
  OrderId,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "./types";

export class Orders {
  constructor(private http: Http) {}

  async get({
    companyId,
    id,
  }: GetOrderRequest): Promise<Response<GetOrderResponse>> {
    return new Response(
      await this.http.request({
        url: `/orders/${companyId}/${id}`,
      })
    );
  }

  async add(
    companyId: CompanyId,
    order: AddOrderRequest
  ): Promise<Response<AddOrderResponse>> {
    return new Response(
      await this.http.request({
        url: `/orders/${companyId}`,
        method: "post",
        data: order,
      })
    );
  }

  async update(
    companyId: CompanyId,
    id: OrderId,
    data: UpdateOrderRequest
  ): Promise<Response<UpdateOrderResponse>> {
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
  ): Promise<Response<GetAllOrdersResponse>> {
    return new Response(
      await this.http.request({
        url: `/orders/${companyId}?${params}`,
      })
    );
  }

  async delete({
    companyId,
    id,
  }: DeleteOrderRequest): Promise<Response<DeleteOrderResponse>> {
    return new Response(
      await this.http.request({
        url: `/orders/${companyId}/${id}`,
        method: "delete",
      })
    );
  }
}
