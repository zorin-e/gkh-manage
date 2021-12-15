<template>
  <v-col xs="12" sm="10" md="9" lg="7">
    <div class="text-right">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        @click="
          $router.push({
            name: routes.addEmployee.name,
          })
        "
      >
        Добавить
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="employeesData.data"
        :items-per-page="options.perpage"
        :loading="isDataLoading"
        :server-items-length="employeesData.pagination.total"
        :options="{ page: options.page }"
        class="elevation-1 mt-5"
        @update:page="nextPage"
        @update:items-per-page="changeItemsPerPage"
      >
        <template #item.actions="{ item }">
          <v-icon @click="edit(item.id)" class="mr-2">
            {{ mdiPencil }}
          </v-icon>
          <v-icon @click="confirmDelete(item.id)">
            {{ mdiDelete }}
          </v-icon>
        </template>
      </v-data-table>
      <router-view />
    </div>

    <v-dialog :value="dialogDelete" persistent max-width="290">
      <v-card>
        <v-card-title> Удалить компанию? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogDelete = false"> Нет </v-btn>
          <v-btn
            color="red darken-1"
            :loading="isLoading"
            :disabled="isLoading"
            text
            @click="deleteEmployee"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import { employeesService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import {
  GetEmployeeResponse,
  EmployeeId,
} from "@/infrastructure/Api/Employees/types";
import { mdiDeleteOutline, mdiPencil } from "@mdi/js";
import { objectParamsToString } from "@/domain/objectParamsToString";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      isLoading: false,
      currentItemToDelete: null as null | EmployeeId,
      isDataLoading: false,
      dialogDelete: false,
      routes: { ...ROUTES },
      mdiDelete: mdiDeleteOutline,
      mdiPencil,
      headers: [
        { text: "Фамилия", value: "surname", sortable: false },
        { text: "Имя", value: "name", sortable: false },
        { text: "Отчество", value: "patronymic", sortable: false },
        { text: "Электронная почта", value: "email", sortable: false },
        { text: "", value: "actions", sortable: false },
      ],
      employees: [] as Array<GetEmployeeResponse>,
      total: 0,
      options: {
        perpage: 10,
        page: 1,
      },
    };
  },
  methods: {
    ...mapActions("employees", {
      getAllEmployees: "getAll",
    }),
    async getEmployees() {
      const requestParams = objectParamsToString({
        paginate: { ...this.options },
      });
      this.isDataLoading = true;
      await this.getAllEmployees(requestParams);
      this.isDataLoading = false;
    },
    async nextPage(page: number) {
      this.options.page = page;
      this.getEmployees();
    },
    changeItemsPerPage(count: number) {
      this.options.perpage = count;
      this.getEmployees();
    },
    edit(id: EmployeeId) {
      this.$router.push({
        name: ROUTES.editEmployee.name,
        params: {
          id: String(id),
        },
      });
    },
    confirmDelete(id: EmployeeId) {
      this.currentItemToDelete = id;
      this.dialogDelete = true;
    },
    async deleteEmployee() {
      this.isLoading = true;
      const { payload, success } = await employeesService.delete({
        id: Number(this.currentItemToDelete),
      });
      this.isLoading = false;

      if (!success && payload.message) {
        this.$notify({
          type: "error",
          title: payload.message,
        });
        return;
      }

      this.dialogDelete = false;
      this.getEmployees();
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === ROUTES.employees.name) {
      this.getEmployees();
    }
    next();
  },
  computed: {
    ...mapState("employees", {
      employeesData: "employees",
    }),
  },
  mounted() {
    this.getEmployees();
  },
});
</script>
