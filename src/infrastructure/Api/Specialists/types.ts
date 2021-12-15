import { CommonList } from "../types";

export type SpecialistId = number;

export type GetSpecialistRequest = {
  id: SpecialistId;
};

export type GetSpecialistResponse = {
  group: number;
  id: SpecialistId;
  name: string;
  surname: string;
  email: string;
  post?: string;
  phone?: string;
};

export type AddSpecialistRequest = {
  name: string;
  surname: string;
  email: string;
  password: string;
  post?: string;
  phone?: string;
};

export type AddSpecialistResponse = GetSpecialistResponse;

export type UpdateSpecialistRequest = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  post?: string;
  phone?: string;
};

export type UpdateSpecialistResponse = GetSpecialistResponse;

export type GetAllSpecialistsResponse = CommonList<GetSpecialistResponse>;

export type DeleteSpecialistRequest = {
  id: SpecialistId;
};

export type DeleteSpecialistResponse = null;
