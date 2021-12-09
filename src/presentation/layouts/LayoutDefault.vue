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
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ name: item.to }"
        >
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
      <v-spacer></v-spacer>
      <v-col class="d-flex" cols="5">
        <v-icon class="mr-2">{{ mdiCity }}</v-icon>
        <v-select
          :loading="isLoading"
          :items="listCompanies"
          label="Управляющая компания"
          class="mr-10"
          hide-details
          @change="setCompanyId"
        />
      </v-col>
      <right-menu />
    </v-app-bar>
    <v-main class="pl-14 pt-14">
      <v-container fluid>
        <h2 v-if="title" class="font-weight-regular">{{ title }}</h2>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import RightMenu from "@/presentation/components/Layouts/RightMenu.vue";
import {
  mdiMapOutline,
  mdiHome,
  mdiPlusCircle,
  mdiCalendar,
  mdiCity,
} from "@mdi/js";
import { ROUTES } from "@/domain/routes";
import { mapActions, mapState } from "vuex";
import { GetCompanyResponse } from "@/infrastructure/Api/Companies/types";
export default Vue.extend({
  components: {
    RightMenu,
  },
  data() {
    return {
      isLoading: false,
      drawer: true,
      items: [
        { title: "Дашборд", icon: mdiHome, to: ROUTES.dashboard.name },
        { title: "Дома", icon: mdiMapOutline, to: ROUTES.houses.name },
        { title: "Заявки", icon: mdiPlusCircle, to: ROUTES.issues.name },
        { title: "Календарь", icon: mdiCalendar, to: ROUTES.calendar.name },
      ],

      mini: true,
      mdiCity,
    };
  },
  methods: {
    ...mapActions("companies", {
      getAllShortCompanies: "getAllWithShortData",
      setCompanyId: "setCompanyId",
    }),
    async getCompanies() {
      this.isLoading = true;
      await this.getAllShortCompanies();
      this.isLoading = false;
    },
  },
  computed: {
    ...mapState("companies", {
      companies: "shortCompanies",
      selectedCompanyId: "selectedCompanyId",
    }),
    listCompanies(): Map<string, string> {
      return this.companies.map((company: GetCompanyResponse) => ({
        text: company.name,
        value: company.id,
      }));
    },
    title(): string {
      const meta = this.$route.meta;
      if (meta?.title) {
        if (!meta?.isModal) return meta.title;
        return this.$route.matched[0]?.meta.title;
      }
      return "";
    },
  },
  mounted() {
    this.getCompanies();
  },
});
</script>
