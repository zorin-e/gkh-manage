<template>
  <v-col xs="12" sm="10" md="9" lg="7">
    <div class="text-right">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        @click="$router.push({ name: routes.addCompany.name })"
      >
        Добавить
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="companies"
        :items-per-page="options.perpage"
        :loading="isDataLoading"
        :server-items-length="total"
        :options="{ page: options.page }"
        class="elevation-1 mt-5"
        @update:page="nextPage"
        @update:items-per-page="changeItemsPerPage"
      >
        <template #item.actions>
          <v-icon class="mr-2">
            {{ mdiPencil }}
          </v-icon>
          <v-icon @click="dialogDelete = true">
            {{ mdiDelete }}
          </v-icon>
        </template>
      </v-data-table>
      <router-view />
    </div>

    <v-dialog :value="dialogDelete" max-width="290">
      <v-card>
        <v-card-title> Удалить управляющую компанию? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogDelete = false"> Нет </v-btn>
          <v-btn color="red darken-1" text @click="dialogDelete = false">
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import { companiesService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { GetCompanyResponse } from "@/infrastructure/Api/Companies/types";
import { mdiDeleteOutline, mdiPencil } from "@mdi/js";

import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      isDataLoading: false,
      dialogDelete: false,
      routes: { ...ROUTES },
      mdiDelete: mdiDeleteOutline,
      mdiPencil,
      headers: [
        { text: "Название", value: "name" },
        { text: "Номер телефона", value: "phone" },
        { text: "Индекс", value: "postcode" },
        { text: "Адрес", value: "address" },
        { text: "", value: "actions", sortable: false },
      ],
      companies: [] as Array<GetCompanyResponse>,
      total: 0,
      options: {
        perpage: 10,
        page: 1,
      },
    };
  },
  methods: {
    paramsToString(params = {}) {
      return Object.entries(params).reduce((accum, value) => {
        if (value[1])
          accum += (accum ? "&" : "") + `paginate[${value[0]}]=${value[1]}`;
        return accum;
      }, "");
    },
    async getCompanies() {
      const requestParams = this.paramsToString(this.options);
      console.log(requestParams);

      this.isDataLoading = true;
      const { payload, success } = await companiesService.getAll(requestParams);
      this.isDataLoading = false;
      if (success && payload.data) {
        const { data, pagination } = payload.data;
        this.companies = data;
        return {
          pagination,
        };
      }
      return {};
    },
    async init() {
      const { pagination } = await this.getCompanies();
      if (pagination) {
        this.total = pagination.total;
      }
    },
    async nextPage(page: number) {
      this.options.page = page;
      this.getCompanies();
    },
    changeItemsPerPage(count: number) {
      this.options.perpage = count;
      this.getCompanies();
    },
  },
  mounted() {
    this.init();
  },
});
</script>
