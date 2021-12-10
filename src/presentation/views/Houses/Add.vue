<template>
  <house
    @submit="submit"
    submitText="Создать"
    :is-loading="isLoading"
    :is-submit-loading="isSubmitLoading"
  />
</template>

<script lang="ts">
import { housesService } from "@/bootstrap";
import { ROUTES } from "@/domain/routes";
import { AddHouseRequest } from "@/infrastructure/Api/Houses/types";
import Vue from "vue";
import { mapState } from "vuex";
import House from "./House.vue";
export default Vue.extend({
  components: {
    House,
  },
  data() {
    return {
      isLoading: false,
      isSubmitLoading: false,
    };
  },
  methods: {
    async submit(house: AddHouseRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await housesService.add(
        this.selectedCompanyId,
        house
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

      this.$router.push({ name: ROUTES.houses.name });
    },
  },
  computed: {
    ...mapState("companies", {
      selectedCompanyId: "selectedCompanyId",
    }),
  },
});
</script>
