<template>
  <div>
    <house
      submitText="Сохранить"
      :is-loading="isLoading"
      :is-submit-loading="isSubmitLoading"
      :propForm="house"
      @submit="submit"
    />
  </div>
</template>

<script lang="ts">
import { housesService } from "@/bootstrap";
import { UpdateHouseRequest } from "@/infrastructure/Api/Houses/types";
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
      house: {},
    };
  },
  methods: {
    updateHouse(house: UpdateHouseRequest) {
      this.house = {
        ...this.house,
        ...house,
      };
    },
    async init() {
      this.isLoading = true;
      const { success, payload } = await housesService.get({
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

      this.updateHouse({ ...payload.data });
    },
    async submit(house: UpdateHouseRequest) {
      this.isSubmitLoading = true;
      const { payload, success } = await housesService.update(
        this.selectedCompanyId,
        this.id,
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

      this.updateHouse({ ...house });

      if (message) {
        this.$notify({
          title: message,
          type: "success",
        });
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
    this.init();
  },
});
</script>
