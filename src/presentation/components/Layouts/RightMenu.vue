<template>
  <div>
    <v-spacer />
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn :class="$style.noUpperCase" text v-bind="attrs" v-on="on">
          <v-icon class="mr-2">{{ mdiCog }}</v-icon>
          Настройки
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in settingsMenu" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      :class="$style.noUpperCase"
      text
      :to="{ name: this.routes.signIn.name }"
    >
      <v-icon class="mr-2">{{ mdiPower }}</v-icon>
      Выход
    </v-btn>
  </div>
</template>

<script lang="ts">
import { ROUTES } from "@/domain/routes";
import Vue from "vue";
import { mdiCog, mdiPower } from "@mdi/js";

export default Vue.extend({
  data() {
    return {
      routes: { ...ROUTES },
      mdiCog,
      mdiPower,
      settingsMenu: [
        {
          title: ROUTES.companies.title,
        },
        {
          title: ROUTES.employers.title,
        },
        {
          title: ROUTES.services.title,
        },
      ],
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
