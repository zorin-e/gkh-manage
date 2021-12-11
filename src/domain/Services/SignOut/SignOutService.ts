import { AuthStorage } from "@/domain/Services/Storage/AuthStorage";

export class SignOutService {
  constructor(private authStorage: AuthStorage) {}

  logout() {
    this.authStorage.delete();
  }
}
