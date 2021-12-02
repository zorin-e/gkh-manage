<template>
  <v-col xs="12" sm="10" md="9" lg="7">
    <div class="text-right">
      <v-btn
        color="primary"
        dark
        class="mb-2"
        @click="$router.push({ name: routes.addCompany.name })"
      >
        Добавить
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="houses"
        :items-per-page="5"
        class="elevation-1 mt-5"
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
        <v-card-title> Удалить управляющую компанию? </v-card-title>
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
      mdiDelete: mdiDeleteOutline,
      mdiPencil,
      headers: [
        { text: "Название", value: "name" },
        { text: "Домов", value: "housesCount" },
        { text: "Сотрудников", value: "employers" },
        { text: "Пользователей", value: "users" },
        { text: "", value: "actions", sortable: false },
      ],
      houses: [
        {
          name: "Чистые пруды",
          housesCount: 580,
          employers: 300,
          users: 450,
        },
        {
          name: "Тихий лес",
          housesCount: 800,
          employers: 190,
          users: 300,
        },
        {
          name: "Чистые пруды",
          housesCount: 580,
          employers: 300,
          users: 450,
        },
        {
          name: "Чистые пруды",
          housesCount: 580,
          employers: 300,
          users: 450,
        },
        {
          name: "Чистые пруды",
          housesCount: 580,
          employers: 300,
          users: 450,
        },
        {
          name: "Чистые пруды",
          housesCount: 580,
          employers: 300,
          users: 450,
        },
        {
          name: "Чистые пруды",
          housesCount: 580,
          employers: 300,
          users: 450,
        },
        {
          name: "Чистые пруды",
          housesCount: 580,
          employers: 300,
          users: 450,
        },
        {
          name: "Чистые пруды",
          housesCount: 580,
          employers: 300,
          users: 450,
        },
      ],
    };
  },
});
</script>
