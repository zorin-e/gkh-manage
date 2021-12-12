<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
    <notifications position="top right" classes="my-notify" />
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

<style lang="scss">
.vue-notification-group {
  padding: 10px !important;
}
.my-notify {
  padding: 10px 15px;
  color: #fff;
}
</style>
