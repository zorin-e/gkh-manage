<template>
  <v-dialog
    :value="true"
    :persistent="isFormChanged"
    v-on="
      !isFormChanged ? { 'click:outside': close, keydown: closeByEscape } : {}
    "
    max-width="670px"
    width="100%"
  >
    <v-form v-model="valid" @submit.prevent="submit">
      <v-card :loading="isLoading" :disabled="isLoading">
        <v-card-title v-if="title">
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="9">
              <v-autocomplete
                label="Адрес"
                clearable
                required
                hide-details
                :rules="requiredRules"
                v-model="form.building_id"
              ></v-autocomplete>
              <v-text-field
                label="Клиент"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.tenant_id"
              ></v-text-field>
              <v-text-field
                label="Номер телефона"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.tenant.phone"
              ></v-text-field>
              <v-text-field
                label="Категория заявки"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.tenant.phone"
              ></v-text-field>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="form.date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="form.date"
                            label="Дата"
                            hide-details
                            prepend-icon="mdi-calendar"
                            readonly
                            required
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="form.date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Отменить
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(form.date)"
                          >
                            Выбрать
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="3">
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="form.time_from"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="form.time_from"
                            label="Время с"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="form.time_from"
                          full-width
                          format="24hr"
                          hide-details
                          @click:minute="$refs.menu2.save(form.time_from)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="3">
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="form.time_to"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="form.time_to"
                            label="Время до"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu3"
                          v-model="form.time_to"
                          full-width
                          format="24hr"
                          hide-details
                          @click:minute="$refs.menu3.save(form.time_to)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-autocomplete
                label="Исполнители"
                chips
                clearable
                hide-details
                multiple
                v-model="form.performers"
                :items="['Иванов', 'Петров', 'Сидоров']"
              ></v-autocomplete>
              <v-autocomplete
                label="Услуги"
                chips
                clearable
                hide-details
                multiple
                v-model="form.services"
                :items="[
                  'Установка сместителя',
                  'Устранение засора',
                  'Поклейка обоев',
                ]"
              ></v-autocomplete>
              <v-textarea
                label="Комментарий"
                v-model="form.comment"
              ></v-textarea>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="Помещение"
                type="number"
                required
                hide-details
                :rules="requiredRules"
                v-model="form.room_number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mt-5" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Закрыть</v-btn>
          <v-btn
            type="submit"
            :disabled="!valid || isSubmitLoading || !isFormChanged"
            color="blue darken-1"
            text
            :loading="isSubmitLoading"
            >{{ submitText }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { ROUTES } from "@/domain/routes";
import Vue from "vue";
import isEqual from "lodash/isEqual";

export default Vue.extend({
  props: {
    submitText: {
      type: String,
      required: true,
    },
    propForm: {
      type: Object,
      default: () => ({}),
    },
    isLoading: Boolean,
    isSubmitLoading: Boolean,
  },
  data() {
    return {
      menu: false,
      menu2: false,
      menu3: false,
      requiredRules: [(v: string) => !!v || "Заполните поле"],
      valid: false,
      form: {
        tenant: {},
      },
      check: false,
    };
  },
  methods: {
    closeByEscape(event: any) {
      if (event.keyCode === 27) {
        this.close();
      }
    },
    close() {
      this.$router.push({ name: ROUTES.orders.name });
    },
    submit() {
      this.$emit("submit", { ...this.form });
    },
  },
  watch: {
    isLoading(value) {
      if (!value) {
        this.form = {
          ...this.form,
          ...this.propForm,
        };
      }
    },
  },
  computed: {
    title(): string {
      return this.$route.meta?.title;
    },
    isFormChanged(): boolean {
      return !isEqual(this.propForm, this.form);
    },
  },
});
</script>
