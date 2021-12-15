<template>
  <div>
    <employee
      submitText="Сохранить"
      :is-loading="isLoading"
      :is-submit-loading="isSubmitLoading"
      :propForm="employee"
      @submit="submit"
    />
  </div>
</template>

<script lang="ts">
import { employeesService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { UpdateEmployeeRequest } from "@/infrastructure/Api/Employees/types";
import Vue from "vue";
import Employee from "./Employee.vue";

export default Vue.extend({
  components: {
    Employee,
  },
  data() {
    return {
      isLoading: false,
      isSubmitLoading: false,
      employee: {},
    };
  },
  methods: {
    updateEmployee(employee: UpdateEmployeeRequest) {
      this.employee = {
        ...this.employee,
        ...employee,
      };
    },
    async init() {
      this.isLoading = true;
      const { success, payload } = await employeesService.get({
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

      this.updateEmployee({ ...payload.data });
    },
    async submit(employee: UpdateEmployeeRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await employeesService.update(
        this.id,
        employee
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

      this.updateEmployee({ ...employee });

      if (message) {
        this.$notify({
          title: message,
          type: "success",
        });
      }

      this.close();
    },
    close() {
      this.$router.push({ name: ROUTES.employees.name });
    },
  },
  computed: {
    id(): number {
      return Number(this.$route.params.id);
    },
  },
  mounted() {
    this.init();
  },
});
</script>
