import {
  AddSpecialistRequest,
  DeleteSpecialistRequest,
  GetSpecialistRequest,
  SpecialistId,
  UpdateSpecialistRequest,
  GetSpecialistResponse,
  UpdateSpecialistResponse,
} from "@/infrastructure/Api/Specialists/types";
import { Specialists } from "@/infrastructure/Api/Specialists";
import { phrases } from "@/domain/constants/phrases";
import { Response } from "@/infrastructure/Http";

export class SpecialistsService {
  constructor(private repository: Specialists) {}

  get(data: GetSpecialistRequest): Promise<Response<GetSpecialistResponse>> {
    return this.repository.get(data);
  }

  async add(specialist: AddSpecialistRequest) {
    const response = await this.repository.add(specialist);
    const { success } = response;
    if (success) response.payload.message = "Специалист создан";
    else response.payload.message = phrases.checkFields;
    return response;
  }

  async update(
    id: SpecialistId,
    specialist: UpdateSpecialistRequest
  ): Promise<Response<UpdateSpecialistResponse>> {
    const response = await this.repository.update(id, specialist);
    const { success } = response;
    if (success) response.payload.message = "Специалист сохранён";
    else response.payload.message = phrases.checkFields;
    return response;
  }

  getAll(params = "") {
    return this.repository.getAll(params);
  }

  delete(data: DeleteSpecialistRequest) {
    return this.repository.delete(data);
  }
}
