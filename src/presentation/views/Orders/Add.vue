<template>
  <order
    @submit="submit"
    submitText="Создать"
    :is-loading="isLoading"
    :is-submit-loading="isSubmitLoading"
  />
</template>

<script lang="ts">
import { ordersService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { AddOrderRequest } from "@/infrastructure/Api/Orders/types";
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
    };
  },
  methods: {
    async submit(order: AddOrderRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await ordersService.add(
        this.selectedCompanyId,
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

      if (message) {
        this.$notify({
          title: message,
          type: "success",
        });
      }

      this.$router.push({ name: ROUTES.orders.name });
    },
  },
  computed: {
    ...mapState("companies", {
      selectedCompanyId: "selectedCompanyId",
    }),
  },
});
</script>
