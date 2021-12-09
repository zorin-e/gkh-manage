<template>
  <company
    @submit="submit"
    submitText="Создать"
    :is-loading="isLoading"
    :is-submit-loading="isSubmitLoading"
  />
</template>

<script lang="ts">
import { companiesService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { AddCompanyRequest } from "@/infrastructure/Api/Companies/types";
import Vue from "vue";
import Company from "./Company.vue";
export default Vue.extend({
  components: {
    Company,
  },
  data() {
    return {
      isLoading: false,
      isSubmitLoading: false,
    };
  },
  methods: {
    async submit(company: AddCompanyRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await companiesService.add(company);
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

      this.$router.push({ name: ROUTES.companies.name });
    },
  },
});
</script>
