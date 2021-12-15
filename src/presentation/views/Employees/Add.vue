<template>
  <employee
    @submit="submit"
    submitText="Создать"
    :propForm="{ role_id: 1, password: '' }"
    :is-loading="isLoading"
    :is-submit-loading="isSubmitLoading"
  />
</template>

<script lang="ts">
import { employeesService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { AddEmployeeRequest } from "@/infrastructure/Api/Employees/types";
import Vue from "vue";
import { mapState } from "vuex";
import Employee from "./Employee.vue";
export default Vue.extend({
  components: {
    Employee,
  },
  data() {
    return {
      isLoading: false,
      isSubmitLoading: false,
    };
  },
  methods: {
    async submit(employee: AddEmployeeRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await employeesService.add(employee);
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

      this.$router.push({ name: ROUTES.employees.name });
    },
  },
  computed: {
    ...mapState("companies", {
      selectedCompanyId: "selectedCompanyId",
    }),
  },
});
</script>
