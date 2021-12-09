<template>
  <v-form
    :class="[$style.form, 'pa-10']"
    v-model="valid"
    @submit.prevent="submit"
  >
    <div :class="$style.wrapper">
      <v-avatar color="primary" size="48"></v-avatar>
      <div :class="$style.welcome" class="font-weight-black mt-3 mb-8">
        Добро пожаловать
      </div>
      <div :class="$style.title" class="font-weight-black mb-8">
        Вход в систему управления ИнТехСервис
      </div>
      <v-text-field
        v-model="form.email"
        label="Электронная почта"
        required
        :rules="emailRules"
        placeholder="example@email.com"
      />
      <v-text-field
        v-model="form.password"
        :append-icon="show ? icons.mdiEye : icons.mdiEyeOff"
        :type="show ? 'text' : 'password'"
        label="Пароль"
        :rules="passwordRules"
        @click:append="show = !show"
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
        :loading="isLoading"
        :disabled="!valid || isLoading"
        class="mt-5"
      >
        Войти
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { VueMaskDirective } from "v-mask";
import Vue from "vue";
import { ROUTES } from "@/domain/routes";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { authService } from "@/bootstrap";
import { isValidEmail } from "@/domain/isValidEmail";

export default Vue.extend({
  data() {
    return {
      passwordRules: [
        (v: string) => !!v || "Введите пароль",
        (v: string) => v.length >= 6 || "Пароль должен быть от 6 символов",
      ],
      emailRules: [
        (v: string) => !!v || "Введите электронную почту",
        (email: string) => isValidEmail(email) || "Не верная электронная почта",
      ],
      form: {
        email: "",
        password: "",
      },
      valid: false,
      show: false,
      icons: {
        mdiEye,
        mdiEyeOff,
      },
      isLoading: false,
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      const { success, payload } = await authService.signIn(this.form);
      this.isLoading = false;
      if (!success) {
        if (payload.message)
          this.$notify({
            type: "error",
            title: payload.message,
          });
        return;
      }
      this.$router.push({ name: ROUTES.dashboard.name });
    },
  },
  directives: {
    mask: VueMaskDirective,
  },
});
</script>

<style module>
.form {
  width: 100%;
  background: #fff;
  max-width: 380px;
  border-radius: 8px;
  border: solid 1px #dfe0eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  max-width: 219px;
}

.welcome {
  color: #a4a6b3;
  font-size: 19px;
  letter-spacing: 1px;
}

.title {
  letter-spacing: 0.7px;
  font-size: 24px;
}
</style>
