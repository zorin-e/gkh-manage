<template>
  <div>
    <company
      submitText="Сохранить"
      :is-loading="isLoading"
      :is-submit-loading="isSubmitLoading"
      :propForm="company"
      @submit="submit"
    />
  </div>
</template>

<script lang="ts">
import { companiesService } from "@/bootstrap";
import { UpdateCompanyRequest } from "@/infrastructure/Api/Companies/types";
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
      company: {},
    };
  },
  methods: {
    updateCompany(company: UpdateCompanyRequest) {
      this.company = {
        ...this.company,
        ...company,
      };
    },
    async init() {
      this.isLoading = true;
      const { success, payload } = await companiesService.get({ id: this.id });
      this.isLoading = false;
      if (!success && payload.message) {
        this.$notify({
          title: "Ошибка",
          type: "error",
          text: payload.message,
        });
        return;
      }

      this.updateCompany({ ...payload.data });
    },
    async submit(company: UpdateCompanyRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await companiesService.update(
        this.id,
        company
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

      this.updateCompany({ ...company });

      if (message) {
        this.$notify({
          title: message,
          type: "success",
        });
      }
    },
  },
  computed: {
    id() {
      return Number(this.$route.params.id);
    },
  },
  mounted() {
    this.init();
  },
});
</script>
