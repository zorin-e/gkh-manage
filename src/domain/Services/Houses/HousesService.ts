import { CompanyId } from "@/infrastructure/Api/Companies/types";
import { Houses } from "@/infrastructure/Api/Houses";
import {
  AddHouseRequest,
  DeleteHouseRequest,
  GetHouseRequest,
  HouseId,
  UpdateHouseRequest,
} from "@/infrastructure/Api/Houses/types";

export class HousesService {
  constructor(private repository: Houses) {}

  get(data: GetHouseRequest) {
    return this.repository.get(data);
  }

  async add(companyId: CompanyId, house: AddHouseRequest) {
    const response = await this.repository.add(companyId, house);
    const { success } = response;
    if (success) response.payload.message = "Дом создан";
    else response.payload.message = "Проверьте правильность заполнения полей";
    return response;
  }

  async update(companyId: CompanyId, id: HouseId, house: UpdateHouseRequest) {
    const response = await this.repository.update(companyId, id, house);
    const { success } = response;
    if (success) response.payload.message = "Дом сохранён";
    else response.payload.message = "Проверьте правильность заполнения полей";
    return response;
  }

  getAll(companyId: CompanyId, params = "") {
    return this.repository.getAll(companyId, params);
  }

  delete(data: DeleteHouseRequest) {
    return this.repository.delete(data);
  }
}
