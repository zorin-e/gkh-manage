<template>
  <v-dialog :value="true" persistent max-width="400px">
    <v-form v-model="valid" @submit.prevent="submit">
      <v-card :loading="isLoading" :disabled="isLoading">
        <v-card-title v-if="title">
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Адрес"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.address"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Собственников"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Квартир"
                type="number"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.rooms_count"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mt-5" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
          <v-btn
            type="submit"
            :disabled="!valid || isSubmitLoading || !isFormChanged"
            color="blue darken-1"
            text
            :loading="isSubmitLoading"
            >{{ submitText }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { ROUTES } from "@/domain/routes";
import Vue, { PropType } from "vue";
import isEqual from "lodash/isEqual";
import { GetHouseResponse } from "@/infrastructure/Api/Houses/types";

export default Vue.extend({
  props: {
    submitText: {
      type: String,
      required: true,
    },
    propForm: {
      type: Object as PropType<GetHouseResponse>,
      default: () => ({}),
    },
    isLoading: Boolean,
    isSubmitLoading: Boolean,
  },
  data() {
    return {
      requiredRules: [(v: string) => !!v || "Заполните поле"],
      valid: false,
      form: {},
      check: false,
    };
  },
  methods: {
    close() {
      this.$router.push({ name: ROUTES.houses.name });
    },
    submit() {
      this.$emit("submit", { ...this.form });
    },
  },
  watch: {
    isLoading(value) {
      if (!value) {
        this.form = {
          ...this.form,
          ...this.propForm,
        };
      }
    },
  },
  computed: {
    title(): string {
      return this.$route.meta?.title;
    },
    isFormChanged(): boolean {
      return !isEqual(this.propForm, this.form);
    },
  },
});
</script>
