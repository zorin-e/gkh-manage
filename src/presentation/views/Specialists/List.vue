<template>
  <v-col xs="12" sm="10" md="9" lg="7">
    <div class="text-right">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        @click="
          $router.push({
            name: routes.addSpecialist.name,
          })
        "
      >
        Добавить
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="specialistsData.data"
        :items-per-page="options.perpage"
        :loading="isDataLoading"
        :server-items-length="specialistsData.pagination.total"
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
            @click="deleteSpecialist"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import { specialistsService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import {
  GetSpecialistResponse,
  SpecialistId,
} from "@/infrastructure/Api/Specialists/types";
import { mdiDeleteOutline, mdiPencil } from "@mdi/js";
import { objectParamsToString } from "@/domain/objectParamsToString";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      isLoading: false,
      currentItemToDelete: null as null | SpecialistId,
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
        { text: "Должность", value: "post", sortable: false },
        { text: "Номер телефона", value: "phone", sortable: false },
        { text: "", value: "actions", sortable: false },
      ],
      specialists: [] as Array<GetSpecialistResponse>,
      total: 0,
      options: {
        perpage: 10,
        page: 1,
      },
    };
  },
  methods: {
    ...mapActions("specialists", {
      getAllSpecialists: "getAll",
    }),
    async getSpecialists() {
      const requestParams = objectParamsToString({
        paginate: { ...this.options },
      });
      this.isDataLoading = true;
      await this.getAllSpecialists(requestParams);
      this.isDataLoading = false;
    },
    async nextPage(page: number) {
      this.options.page = page;
      this.getSpecialists();
    },
    changeItemsPerPage(count: number) {
      this.options.perpage = count;
      this.getSpecialists();
    },
    edit(id: SpecialistId) {
      this.$router.push({
        name: ROUTES.editSpecialist.name,
        params: {
          id: String(id),
        },
      });
    },
    confirmDelete(id: SpecialistId) {
      this.currentItemToDelete = id;
      this.dialogDelete = true;
    },
    async deleteSpecialist() {
      this.isLoading = true;
      const { payload, success } = await specialistsService.delete({
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
      this.getSpecialists();
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === ROUTES.specialists.name) {
      this.getSpecialists();
    }
    next();
  },
  computed: {
    ...mapState("specialists", {
      specialistsData: "specialists",
    }),
  },
  mounted() {
    this.getSpecialists();
  },
});
</script>
