import { CompanyId } from "../Companies/types";
import { CommonList } from "../types";

export type HouseId = number;

export type GetHouseRequest = {
  companyId: CompanyId;
  id: HouseId;
};

export type GetHouseResponse = {
  id: HouseId;
  name: string;
  address: string;
  rooms_count: string;
};

export type AddHouseRequest = {
  name: string;
  address: string;
  rooms_count: string;
};

export type AddHouseResponse = {
  id: HouseId;
  name: string;
  address: string;
  rooms_count: string;
};

export type UpdateHouseRequest = {
  name?: string;
  address?: string;
  rooms_count?: string;
};

export type UpdateHouseResponse = {
  id: HouseId;
  name: string;
  address: string;
  rooms_count: string;
};

export type GetAllHousesResponse = CommonList<GetHouseResponse>;

export type DeleteHouseRequest = {
  companyId: CompanyId;
  id: HouseId;
};

export type DeleteHouseResponse = null;
