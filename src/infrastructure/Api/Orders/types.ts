import { CompanyId } from "../Companies/types";
import { EmployeeId } from "../Employees/types";
import { HouseId } from "../Houses/types";
import { Services } from "../Services/types";
import { CommonList } from "../types";

export type OrderId = number;

export type GetOrderRequest = {
  companyId: CompanyId;
  id: OrderId;
};

export type TenantId = number;

export type Tenant = {
  id: TenantId;
  name: string | null;
  surname: string | null;
  email: string | null;
  phone: string | null;
  post: null;
  group: number;
  role_id: null;
};

export type Performer = {
  id: EmployeeId;
  name: string;
  surname: string;
  email: string;
  phone: null;
  post: null;
  group: 3;
  role_id: null;
};

export type GetOrderResponse = {
  id: OrderId;
  company_id: CompanyId;
  tenant_id: TenantId;
  building_id: HouseId;
  room_number: number;
  date: Date;
  time_from: string;
  time_to: string;
  priority: number;
  status: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  tenant: Tenant;
  services: Services;
  performers: Array<Performer>;
  attachments: Array<string>;
};

export type AddOrderRequest = {
  name: string;
  address: string;
  rooms_count: string;
};

export type AddOrderResponse = GetOrderResponse;

export type UpdateOrderRequest = {
  name?: string;
  address?: string;
  rooms_count?: string;
};

export type UpdateOrderResponse = GetOrderResponse;

export type GetAllOrdersResponse = CommonList<GetOrderResponse>;

export type DeleteOrderRequest = {
  companyId: CompanyId;
  id: OrderId;
};

export type DeleteOrderResponse = null;
