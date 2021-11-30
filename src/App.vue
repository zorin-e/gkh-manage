<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  computed: {
    layout() {
      return this.$route.meta?.layout || "div";
    },
  },
});
</script>
