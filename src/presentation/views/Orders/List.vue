<template>
  <v-col xs="12" sm="12" md="12" lg="10">
    <div class="text-right">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        @click="
          $router.push({
            name: routes.addOrder.name,
            params: { companyId: selectedCompanyId },
          })
        "
      >
        Добавить
      </v-btn>
      <filters />
      <v-data-table
        :headers="headers"
        :items="ordersData.data"
        :items-per-page="options.perpage"
        :loading="isDataLoading || !selectedCompanyId"
        :server-items-length="ordersData.pagination.total"
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
        <v-card-title> Удалить заявку? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogDelete = false"> Нет </v-btn>
          <v-btn
            color="red darken-1"
            :loading="isLoading"
            :disabled="isLoading"
            text
            @click="deleteOrder"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import { ordersService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { mdiDeleteOutline, mdiPencil } from "@mdi/js";
import { objectParamsToString } from "@/domain/objectParamsToString";
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { GetOrderResponse, OrderId } from "@/infrastructure/Api/Orders/types";
import Filters from "./Filters.vue";

export default Vue.extend({
  components: {
    Filters,
  },
  data() {
    return {
      isLoading: false,
      currentItemToDelete: null as null | OrderId,
      isDataLoading: false,
      dialogDelete: false,
      routes: { ...ROUTES },
      mdiDelete: mdiDeleteOutline,
      mdiPencil,
      headers: [
        { text: "Адрес", value: "address", sortable: false },
        { text: "Клиент", value: "tenant_data", sortable: false },
        { text: "Категория", value: "", sortable: false },
        { text: "Дата", value: "date", sortable: false },
        { text: "Время", value: "time_range", sortable: false },
        {
          text: "Исполнитель",
          value: "performers_concatenated",
          sortable: false,
        },
        { text: "Услуги", value: "services_concatenated", sortable: false },
        { text: "Комментраий", value: "comment", sortable: false },
        { text: "", value: "actions", sortable: false, width: "90px" },
      ],
      orders: [] as Array<GetOrderResponse>,
      total: 0,
      options: {
        perpage: 10,
        page: 1,
      },
    };
  },
  methods: {
    ...mapActions("orders", {
      getAllOrders: "getAll",
    }),
    async getOrders() {
      const requestParams = objectParamsToString({
        paginate: { ...this.options },
      });
      this.isDataLoading = true;
      await this.getAllOrders(this.selectedCompanyId, requestParams);
      this.isDataLoading = false;
    },
    async nextPage(page: number) {
      this.options.page = page;
      this.getOrders();
    },
    changeItemsPerPage(count: number) {
      this.options.perpage = count;
      this.getOrders();
    },
    edit(id: OrderId) {
      this.$router.push({
        name: ROUTES.editOrder.name,
        params: {
          companyId: this.selectedCompanyId,
          id: String(id),
        },
      });
    },
    confirmDelete(id: OrderId) {
      this.currentItemToDelete = id;
      this.dialogDelete = true;
    },
    async deleteOrder() {
      this.isLoading = true;
      const { payload, success } = await ordersService.delete({
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
      this.getOrders();
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === ROUTES.orders.name) {
      this.getOrders();
    }
    next();
  },
  computed: {
    ...mapState("orders", {
      ordersData: "orders",
    }),
    ...mapState("companies", {
      selectedCompanyId: "selectedCompanyId",
    }),
  },
  watch: {
    selectedCompanyId(value) {
      if (value) this.getOrders();
    },
  },
  mounted() {
    if (!this.selectedCompanyId) return;
    this.getOrders();
  },
});
</script>
