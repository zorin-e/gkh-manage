import { AuthStorage } from "@/infrastructure/Storage/AuthStorage";

export class SignOutService {
  constructor(private authStorage: AuthStorage) {}

  logout() {
    this.authStorage.delete();
  }
}
