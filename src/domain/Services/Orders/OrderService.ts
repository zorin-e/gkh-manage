import { CompanyId } from "@/infrastructure/Api/Companies/types";
import { Orders } from "@/infrastructure/Api/Orders";
import {
  AddOrderRequest,
  DeleteOrderRequest,
  GetAllOrdersResponse,
  GetOrderRequest,
  OrderId,
  UpdateOrderRequest,
} from "@/infrastructure/Api/Orders/types";
import { Response } from "@/infrastructure/Http";

export class OrderService {
  constructor(private repository: Orders) {}

  get(data: GetOrderRequest) {
    return this.repository.get(data);
  }

  async add(orderId: CompanyId, order: AddOrderRequest) {
    const response = await this.repository.add(orderId, order);
    const { success } = response;
    if (success) response.payload.message = "Дом создан";
    else response.payload.message = "Проверьте правильность заполнения полей";
    return response;
  }

  async update(orderId: CompanyId, id: OrderId, order: UpdateOrderRequest) {
    const response = await this.repository.update(orderId, id, order);
    const { success } = response;
    if (success) response.payload.message = "Дом сохранён";
    else response.payload.message = "Проверьте правильность заполнения полей";
    return response;
  }

  getAll(
    companyId: CompanyId,
    params = ""
  ): Promise<Response<GetAllOrdersResponse>> {
    return this.repository.getAll(companyId, params);
  }

  async getAllWithConcatenatedData(companyId: CompanyId, params = "") {
    const stringParams =
      "relations[]=tenant&relations[]=performers&relations[]=services";
    const response = await this.repository.getAll(companyId, stringParams);
    const { payload, success, status } = response;
    if (!success) return response;
    const concatenatedData = payload.data!.data.map((order) => {
      const performers = order.performers.map(
        (performer) => `${performer.name} ${performer.surname}`
      );
      const services = order.services.map((service) => service.name);
      const item = {
        ...order,
        time_range: `с ${order.time_from} до ${order.time_to}`,
        performers_concatenated: performers.join(", "),
        services_concatenated: services.join(", "),
        tenant_name: order.tenant.name,
      };
      return item;
    });
    return {
      success,
      status,
      payload: {
        ...{
          data: {
            data: concatenatedData,
            pagination: payload.data!.pagination,
          },
        },
      },
    };
  }

  delete(data: DeleteOrderRequest) {
    return this.repository.delete(data);
  }
}
