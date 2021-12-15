<template>
  <specialist
    @submit="submit"
    submitText="Создать"
    :propForm="{ password: '' }"
    :is-loading="isLoading"
    :is-submit-loading="isSubmitLoading"
  />
</template>

<script lang="ts">
import { specialistsService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { AddSpecialistRequest } from "@/infrastructure/Api/Specialists/types";
import Vue from "vue";
import Specialist from "./Specialist.vue";
export default Vue.extend({
  components: {
    Specialist,
  },
  data() {
    return {
      isLoading: false,
      isSubmitLoading: false,
    };
  },
  methods: {
    async submit(specialist: AddSpecialistRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await specialistsService.add(specialist);
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

      this.$router.push({ name: ROUTES.specialists.name });
    },
  },
});
</script>
