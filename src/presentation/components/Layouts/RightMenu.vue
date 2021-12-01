<template>
  <v-toolbar-items>
    <v-btn
      :class="$style.noUpperCase"
      text
      :to="{ name: this.routes.signIn.name }"
    >
      <v-icon left dark>mdi-settings</v-icon>
      <v-icon aria-hidden="false"> mdi-account </v-icon>
      Выход
    </v-btn>
  </v-toolbar-items>
</template>

<script lang="ts">
import { ROUTES } from "@/domain/routes";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      routes: { ...ROUTES },
    };
  },
});
</script>

<style module>
.noUpperCase {
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 14px !important;
  font-weight: normal !important;
  color: #000 !important;
}
</style>
