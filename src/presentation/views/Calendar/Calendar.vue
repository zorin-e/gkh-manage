<template>
  <div>
    <v-col class="d-flex align-end" cols="5">
      <v-icon class="mr-2">{{ mdiCity }}</v-icon>
      <v-select
        :loading="isLoading"
        :items="specialists.data"
        item-value="id"
        item-text="name"
        label="Специалисты"
        class="mr-10"
        hide-details
        v-model="selectedSpecialist"
        @change="getOrders"
      />
    </v-col>
    <v-row class="fill-height mt-5">
      <v-col>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="value"
            color="primary"
            type="4day"
            :events="events"
            :event-color="getEventColor"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mdiCity } from "@mdi/js";
import { ordersService } from "@/bootstrap";
import { mapActions, mapState } from "vuex";
import { SpecialistId } from "@/infrastructure/Api/Specialists/types";
import { GetOrderResponse } from "@/infrastructure/Api/Orders/types";
export default Vue.extend({
  data: () => ({
    value: "",
    events: [] as Array<{ start: string; end: string; name?: string }>,
    colors: [
      "#2196F3",
      "#3F51B5",
      "#673AB7",
      "#00BCD4",
      "#4CAF50",
      "#FF9800",
      "#757575",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    createStart: null,
    extendOriginal: null,
    mdiCity,
    selectedSpecialist: {},
    isLoading: false,
  }),
  methods: {
    ...mapActions("specialists", {
      getAll: "getAll",
    }),
    ...mapActions("orders", {
      getOrderBySpecialist: "getAll",
    }),
    async getOrders(id: SpecialistId) {
      const { payload } = await ordersService.getAll(
        this.selectedCompanyId,
        `filters[performers][id]=${id}`
      );
      if (payload.data) {
        const events = payload.data?.data.map((event) => {
          const item = {
            start: `${event.date} ${event.time_from}`,
            end: `${event.date} ${event.time_to}`,
            name: String(event.room_number),
            color: this.rndElement(this.colors),
          };
          return item;
        });
        this.events = [...this.events, ...events];
      }
    },
    async init() {
      this.isLoading = true;
      await this.getAll();
      this.isLoading = false;
    },
    getEventColor(event: any) {
      const rgb = parseInt(event.color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return event === this.dragEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event === this.createEvent
        ? `rgba(${r}, ${g}, ${b}, 0.7)`
        : event.color;
    },
    rnd(a: number, b: number) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr: string[]) {
      return arr[this.rnd(0, arr.length - 1)];
    },
  },
  computed: {
    ...mapState("companies", {
      selectedCompanyId: "selectedCompanyId",
    }),
    ...mapState("specialists", {
      specialists: "specialists",
    }),
  },
  mounted() {
    this.init();
  },
});
</script>
