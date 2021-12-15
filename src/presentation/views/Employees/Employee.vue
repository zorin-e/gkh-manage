<template>
  <v-dialog
    :value="true"
    :persistent="isFormChanged"
    v-on="
      !isFormChanged ? { 'click:outside': close, keydown: closeByEscape } : {}
    "
    max-width="400px"
  >
    <v-form v-model="valid" @submit.prevent="submit">
      <v-card :loading="isLoading" :disabled="isLoading">
        <v-card-title v-if="title">
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Фамилия"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.surname"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Имя"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Отчество"
                required
                hide-details
                v-model="form.patronymic"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Электронная почта"
                required
                hide-details
                :rules="[...requiredRules, ...emailRules]"
                v-model="form.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="form.password"
                :append-icon="show ? icons.mdiEye : icons.mdiEyeOff"
                :type="show ? 'text' : 'password'"
                label="Пароль"
                :rules="passwordRules"
                @click:append="show = !show"
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
import { GetEmployeeResponse } from "@/infrastructure/Api/Employees/types";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { isValidEmail } from "@/domain/isValidEmail";

export default Vue.extend({
  props: {
    submitText: {
      type: String,
      required: true,
    },
    propForm: {
      type: Object as PropType<GetEmployeeResponse>,
      default: () => ({}),
    },
    isLoading: Boolean,
    isSubmitLoading: Boolean,
  },
  data() {
    return {
      passwordRules: [
        (v: string) =>
          typeof v === "undefined" ? true : !!v || "Введите пароль",
        (v: string) =>
          typeof v === "undefined"
            ? true
            : v.length >= 6 || "Пароль должен быть от 6 символов",
      ],
      emailRules: [
        (v: string) => !!v || "Введите электронную почту",
        (email: string) => isValidEmail(email) || "Не верная электронная почта",
      ],
      requiredRules: [(v: string) => !!v || "Заполните поле"],
      valid: false,
      show: false,
      form: {},
      check: false,
      icons: {
        mdiEye,
        mdiEyeOff,
      },
    };
  },
  methods: {
    closeByEscape(event: any) {
      if (event.keyCode === 27) {
        this.close();
      }
    },
    close() {
      this.$router.push({ name: ROUTES.employees.name });
    },
    submit() {
      this.$emit("submit", { ...this.form });
    },
  },
  watch: {
    isLoading: {
      immediate: true,
      handler: function (value) {
        if (!value) {
          this.form = {
            ...this.form,
            ...this.propForm,
          };
        }
      },
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
