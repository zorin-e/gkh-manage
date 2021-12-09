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
        :items="companiesData.data"
        :items-per-page="options.perpage"
        :loading="isDataLoading"
        :server-items-length="companiesData.pagination.total"
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
            @click="deleteCompany"
          >
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
import {
  CompanyId,
  GetCompanyResponse,
} from "@/infrastructure/Api/Companies/types";
import { mdiDeleteOutline, mdiPencil } from "@mdi/js";
import { objectParamsToString } from "@/domain/objectParamsToString";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      isLoading: false,
      currentItemToDelete: null as null | CompanyId,
      isDataLoading: false,
      dialogDelete: false,
      routes: { ...ROUTES },
      mdiDelete: mdiDeleteOutline,
      mdiPencil,
      headers: [
        { text: "Название", value: "name", sortable: false },
        { text: "Номер телефона", value: "phone", sortable: false },
        { text: "Индекс", value: "postcode", sortable: false },
        { text: "Адрес", value: "address", sortable: false },
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
    ...mapActions("companies", {
      getAllCompanies: "getAll",
      getAllShortCompanies: "getAllWithShortData",
    }),
    async getCompanies() {
      const requestParams = objectParamsToString({
        paginate: { ...this.options },
      });
      this.isDataLoading = true;
      await this.getAllCompanies(requestParams);
      this.isDataLoading = false;
    },
    async nextPage(page: number) {
      this.options.page = page;
      this.getCompanies();
    },
    changeItemsPerPage(count: number) {
      this.options.perpage = count;
      this.getCompanies();
    },
    edit(id: CompanyId) {
      this.$router.push({
        name: ROUTES.editCompany.name,
        params: { id: String(id) },
      });
    },
    confirmDelete(id: CompanyId) {
      this.currentItemToDelete = id;
      this.dialogDelete = true;
    },
    async deleteCompany() {
      this.isLoading = true;
      const { payload, success } = await companiesService.delete({
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
      this.getCompanies();
      this.getAllShortCompanies();
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === ROUTES.companies.name) {
      this.getCompanies();
      this.getAllShortCompanies();
    }
    next();
  },
  computed: {
    ...mapState("companies", {
      companiesData: "companies",
    }),
  },
  mounted() {
    this.getCompanies();
  },
});
</script>
