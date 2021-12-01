<template>
  <v-layout>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      expand-on-hover
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-avatar color="primary" size="56"></v-avatar>
        </v-list-item-avatar>

        <v-list-item-title>Сергей Петров</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app max-height="56" elevation="3" color="white">
      <right-menu />
    </v-app-bar>
    <v-main class="pl-14 pt-14">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import RightMenu from "@/presentation/components/Layouts/RightMenu.vue";
import { mdiMapOutline, mdiHome, mdiPlusCircle, mdiCalendar } from "@mdi/js";
export default Vue.extend({
  components: {
    RightMenu,
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Дашборд", icon: mdiHome },
        { title: "Дома", icon: mdiMapOutline },
        { title: "Заявки", icon: mdiPlusCircle },
        { title: "Календарь", icon: mdiCalendar },
      ],
      mini: true,
    };
  },
});
</script>
