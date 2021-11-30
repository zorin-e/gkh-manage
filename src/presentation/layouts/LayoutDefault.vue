<template>
  <v-app>
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
      <!-- -->
    </v-app-bar>

    <v-main class="pl-14 pt-14">
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data() {
    return {
      drawer: true,
      items: [
        { title: "Дашборд", icon: "mdi-home" },
        { title: "Дома", icon: "mdi-map-outline" },
        { title: "Заявки", icon: "mdi-plus-circle" },
        { title: "Календарь", icon: "mdi-calendar" },
      ],
      mini: true,
    };
  },
});
</script>
