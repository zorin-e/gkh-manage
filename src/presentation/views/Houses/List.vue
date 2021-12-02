<template>
  <v-col xs="12" sm="10" md="9" lg="7">
    <div class="text-right">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        @click="$router.push({ name: routes.addHouse.name })"
      >
        Добавить
      </v-btn>
      <v-text-field
        v-model="search"
        placeholder="Поиск"
        class="mt-5"
        :append-icon="searchIcon"
      ></v-text-field>
      <v-data-table
        :headers="headers"
        :items="houses"
        :items-per-page="5"
        class="elevation-1"
      >
        <template #item.actions>
          <v-icon class="mr-2">
            {{ mdiPencil }}
          </v-icon>
          <v-icon @click="dialogDelete = true">
            {{ mdiDelete }}
          </v-icon>
        </template>
      </v-data-table>
      <router-view />
    </div>

    <v-dialog :value="dialogDelete" max-width="290">
      <v-card>
        <v-card-title> Удалить дом? </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogDelete = false"> Нет </v-btn>
          <v-btn color="red darken-1" text @click="dialogDelete = false">
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import { ROUTES } from "@/domain/routes";
import { mdiMagnify, mdiDeleteOutline, mdiPencil } from "@mdi/js";

import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      dialogDelete: false,
      routes: { ...ROUTES },
      search: "",
      searchIcon: mdiMagnify,
      mdiDelete: mdiDeleteOutline,
      mdiPencil,
      headers: [
        { text: "Адрес", value: "address" },
        { text: "Квартир", value: "flatsCount" },
        { text: "Собственников", value: "owners" },
        { text: "", value: "actions", sortable: false },
      ],
      houses: [
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
        {
          address: "Верхосунская,16,18,20,23а,24",
          flatsCount: 580,
          owners: 300,
        },
      ],
    };
  },
});
</script>
