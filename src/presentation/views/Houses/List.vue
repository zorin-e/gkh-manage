<template>
  <v-col xs="12" sm="10" md="9" lg="7">
    <v-alert
      v-if="!selectedCompanyId"
      border="left"
      color="orange"
      type="warning"
      >Выберите управляющую компанию</v-alert
    >
    <div v-if="selectedCompanyId" class="text-right">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        @click="
          $router.push({
            name: routes.addHouse.name,
            params: { companyId: selectedCompanyId },
          })
        "
      >
        Добавить
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="housesData.data"
        :items-per-page="options.perpage"
        :loading="isDataLoading"
        :server-items-length="housesData.pagination.total"
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
            @click="deleteHouse"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import { housesService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { GetHouseResponse, HouseId } from "@/infrastructure/Api/Houses/types";
import { mdiDeleteOutline, mdiPencil } from "@mdi/js";
import { objectParamsToString } from "@/domain/objectParamsToString";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      isLoading: false,
      currentItemToDelete: null as null | HouseId,
      isDataLoading: false,
      dialogDelete: false,
      routes: { ...ROUTES },
      mdiDelete: mdiDeleteOutline,
      mdiPencil,
      headers: [
        { text: "Адрес", value: "address", sortable: false },
        { text: "Собственников", value: "name", sortable: false },
        { text: "Квартир", value: "rooms_count", sortable: false },
        { text: "", value: "actions", sortable: false },
      ],
      houses: [] as Array<GetHouseResponse>,
      total: 0,
      options: {
        perpage: 10,
        page: 1,
      },
    };
  },
  methods: {
    ...mapActions("houses", {
      getAllHouses: "getAll",
    }),
    async getHouses() {
      const requestParams = objectParamsToString({
        paginate: { ...this.options },
      });
      this.isDataLoading = true;
      await this.getAllHouses(this.selectedCompanyId, requestParams);
      this.isDataLoading = false;
    },
    async nextPage(page: number) {
      this.options.page = page;
      this.getHouses();
    },
    changeItemsPerPage(count: number) {
      this.options.perpage = count;
      this.getHouses();
    },
    edit(id: HouseId) {
      this.$router.push({
        name: ROUTES.editHouse.name,
        params: {
          companyId: this.selectedCompanyId,
          id: String(id),
        },
      });
    },
    confirmDelete(id: HouseId) {
      this.currentItemToDelete = id;
      this.dialogDelete = true;
    },
    async deleteHouse() {
      this.isLoading = true;
      const { payload, success } = await housesService.delete({
        companyId: this.selectedCompanyId,
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
      this.getHouses();
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === ROUTES.houses.name) {
      this.getHouses();
    }
    next();
  },
  computed: {
    ...mapState("houses", {
      housesData: "houses",
    }),
    ...mapState("companies", {
      selectedCompanyId: "selectedCompanyId",
    }),
  },
  watch: {
    selectedCompanyId(value) {
      if (value) this.getHouses();
    },
  },
  mounted() {
    if (!this.selectedCompanyId) return;
    this.getHouses();
  },
});
</script>
