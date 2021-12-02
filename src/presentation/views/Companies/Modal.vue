<template>
  <v-dialog :value="true" persistent max-width="600px">
    <v-card>
      <v-card-title v-if="title">
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Адрес" required hide-details></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Название" required hide-details></v-text-field>
            <v-text-field label="Адрес" required hide-details></v-text-field>
            <v-text-field
              label="Номер телефона"
              required
              hide-details
            ></v-text-field>
            <v-text-field
              label="Почтовый индекс"
              required
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="mt-5" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Отменить </v-btn>
        <v-btn color="blue darken-1" text @click="close"> Сохранить </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { ROUTES } from "@/domain/routes";
import Vue from "vue";
export default Vue.extend({
  methods: {
    close() {
      this.$router.push({ name: ROUTES.companies.name });
    },
  },
  computed: {
    title() {
      return this.$route.meta?.title;
    },
  },
});
</script>
