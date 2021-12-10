<template>
  <v-layout flex>
    <v-card
      v-for="item in menu"
      :key="item.title"
      elevation="2"
      width="253"
      height="176"
      class="d-flex flex-column mr-5"
    >
      <v-card-title>
        {{ item.title }} <v-icon class="ml-3">{{ item.icon }}</v-icon>
      </v-card-title>
      <v-card-subtitle class="mt-1">{{ item.count }}</v-card-subtitle>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn color="primary" plain :to="item.link">Перейти</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import { ROUTES } from "@/domain/routes";
import { mdiMapOutline, mdiBank, mdiAccount } from "@mdi/js";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      mdiMapOutline,
      mdiBank,
      menu: [
        {
          title: "Дома",
          icon: mdiMapOutline,
          count: 120,
          link: { name: ROUTES.houses.name },
        },
        { title: "Квартиры", icon: mdiBank, count: 570 },
        { title: "Пользователи", icon: mdiAccount, count: 1000 },
      ],
    };
  },
});
</script>
