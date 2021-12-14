<template>
  <div>
    <order
      submitText="Сохранить"
      :is-loading="isLoading || !selectedCompanyId"
      :is-submit-loading="isSubmitLoading"
      :propForm="order"
      @submit="submit"
    />
  </div>
</template>

<script lang="ts">
import { ordersService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { UpdateOrderRequest } from "@/infrastructure/Api/Orders/types";
import Vue from "vue";
import { mapState } from "vuex";
import Order from "./Order.vue";

export default Vue.extend({
  components: {
    Order,
  },
  data() {
    return {
      isLoading: false,
      isSubmitLoading: false,
      order: {},
    };
  },
  methods: {
    updateOrder(order: UpdateOrderRequest) {
      this.order = {
        ...this.order,
        ...order,
      };
    },
    async init() {
      this.isLoading = true;
      const { success, payload } = await ordersService.get({
        companyId: this.selectedCompanyId,
        id: this.id,
      });
      this.isLoading = false;
      if (!success && payload.message) {
        this.$notify({
          title: "Ошибка",
          type: "error",
          text: payload.message,
        });
        return;
      }

      this.updateOrder({ ...payload.data });
    },
    async submit(order: UpdateOrderRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await ordersService.update(
        this.selectedCompanyId,
        this.id,
        order
      );
      this.isSubmitLoading = false;
      const { message } = payload;
      if (!success && message) {
        this.$notify({
          title: "Ошибка",
          type: "error",
          text: message,
        });
        return;
      }

      this.updateOrder({ ...order });

      if (message) {
        this.$notify({
          title: message,
          type: "success",
        });
      }

      this.close();
    },
    close() {
      this.$router.push({ name: ROUTES.orders.name });
    },
  },
  watch: {
    selectedCompanyId(value) {
      if (value) {
        this.init();
      }
    },
  },
  computed: {
    ...mapState("companies", {
      selectedCompanyId: "selectedCompanyId",
    }),
    id(): number {
      return Number(this.$route.params.id);
    },
  },
  mounted() {
    if (this.selectedCompanyId) this.init();
  },
});
</script>
