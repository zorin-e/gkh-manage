import { CompanyId } from "../Companies/types";
import { ServiceCategoryId } from "../ServiceCategories/type";

export type ServiceId = number;

export type Service = {
  id: ServiceId;
  company_id: CompanyId;
  category_id: ServiceCategoryId;
  name: string;
  price: number;
};

export type Services = Array<Service>;
