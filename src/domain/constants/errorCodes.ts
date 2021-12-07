export const errorCodes: {
  // [code: number]: string |
  [name: string]: { [code: number]: string };
} = {
  // 500: 'Ошибка сервера',
  common: {
    500: "Ошибка сервера",
  },
  auth: {
    401: "Проверьте логин и пароль",
    422: "Проверьте павильность заполнения полей",
  },
};
