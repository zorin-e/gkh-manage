type Routes = {
  [key: string]: { title: string; name: string };
};

export const ROUTES: Routes = {
  signIn: {
    title: "Вход",
    name: "SignIn",
  },
  dashboard: {
    title: "Дашборд",
    name: "Dashboard",
  },
  houses: {
    title: "Список домов",
    name: "Houses",
  },
  addHouse: {
    title: "Новый дом",
    name: "AddHouse",
  },
  editHouse: {
    title: "Редактирование дома",
    name: "EditHouse",
  },
  applications: {
    title: "Заявки",
    name: "Applications",
  },
  calendar: {
    title: "Календарь",
    name: "Calendar",
  },
  companies: {
    title: "Управляющие компании",
    name: "Companies",
  },
  employers: {
    title: "Сотрудники",
    name: "Employers",
  },
  services: {
    title: "Услуги",
    name: "Services",
  },
};
