<template>
  <div>
    <specialist
      submitText="Сохранить"
      :is-loading="isLoading"
      :is-submit-loading="isSubmitLoading"
      :propForm="specialist"
      @submit="submit"
    />
  </div>
</template>

<script lang="ts">
import { specialistsService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { UpdateSpecialistRequest } from "@/infrastructure/Api/Specialists/types";
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
      specialist: {},
    };
  },
  methods: {
    updateSpecialist(specialist: UpdateSpecialistRequest) {
      this.specialist = {
        ...this.specialist,
        ...specialist,
      };
    },
    async init() {
      this.isLoading = true;
      const { success, payload } = await specialistsService.get({
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

      this.updateSpecialist({ ...payload.data });
    },
    async submit(specialist: UpdateSpecialistRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await specialistsService.update(
        this.id,
        specialist
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

      this.updateSpecialist({ ...specialist });

      if (message) {
        this.$notify({
          title: message,
          type: "success",
        });
      }

      this.close();
    },
    close() {
      this.$router.push({ name: ROUTES.specialists.name });
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
