<template>
  <v-layout :class="$style.bg">
    <v-container fill-height :class="$style.center" align-center justify-center>
      <slot />
    </v-container>
  </v-layout>
</template>

<style module>
.bg {
  background: #e5e5e5;
}

.center {
  text-align: center;
}
</style>
