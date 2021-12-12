<template>
  <v-row align="center">
    <v-col class="d-flex" cols="12" sm="4">
      <v-select :items="items" label="Все дома"></v-select>
    </v-col>

    <v-col class="d-flex" cols="12" sm="4">
      <v-select :items="items" label="Все мастера"></v-select>
    </v-col>

    <v-col class="d-flex" cols="12" sm="4">
      <v-select :items="items" label="Все категории"></v-select>
    </v-col>

    <v-col class="d-flex" cols="12" sm="4">
      <v-select :items="items" label="Все статусы"></v-select>
    </v-col>
    <v-col cols="12" sm="4">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Фильтр по дате"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
          range
          :max="currentDate"
        >
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
const date = new Date();
export default Vue.extend({
  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      date: [],
      menu: false,
      currentDate: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
    };
  },
});
</script>
