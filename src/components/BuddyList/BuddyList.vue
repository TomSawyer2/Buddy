<template>
  <v-card
    min-height="180"
    style="margin-top: 15px"
    v-if="(isAllShow ? true : item.isGraduated) && item.phoneNumber !== phone"
  >
    <v-card style="box-shadow: none" @click="onToDetail(item.id)">
      <div class="info-container">
        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
          }"
        >
          <div class="name-sex-container">
            <i
              v-if="item.sex === '男'"
              class="mdi mdi-human-male"
              aria-hidden="true"
            ></i>
            <i
              v-else-if="item.sex === '女'"
              class="mdi mdi-human-female"
              aria-hidden="true"
            ></i>
            <i v-else class="mdi mdi-account" aria-hidden="true"></i>
            <p class="font-weight-black">
              {{ item.userName }}
            </p>
          </div>

          <p class="font-weight-black info-detail-container">
            编号：{{ item.number ? item.number : "无" }}
          </p>

          <p
            class="font-weight-black info-detail-container"
            style="white-space: nowrap"
          >
            <i class="mdi mdi-phone" aria-hidden="true"></i>
            {{ item.phoneNumber }}
          </p>

          <v-chip-group
            v-if="item.fields != ''"
            style="margin-left: 5px"
            column
            class="mt-2"
          >
            <v-chip
              v-for="(field, index) in item.fieldsValue"
              :key="index"
              small
              >{{ field }}</v-chip
            >
          </v-chip-group>
          <p v-else class="font-weight-black info-detail-container">
            技术栈：未填写
          </p>
        </div>

        <div class="avatar-action-container">
          <v-list-item-avatar tile size="125" style="margin: 8px 0 8px 0">
            <v-img v-bind:src="item.avatar"></v-img>
          </v-list-item-avatar>
        </div>
      </div>
    </v-card>

    <div class="btn-container">
      <v-btn depressed small style="width: 125px" @click="onAdd(item.id)">
        添加为Buddy
        <v-icon color="orange darken-4" right> mdi-plus </v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BuddyList",
  props: ["item", "cardWidth", "phone", "isAllShow"],
  data() {
    return {};
  },
  methods: {
    onAdd(id: string) {
      this.$emit("add", id);
    },
    onToDetail(id: string) {
      this.$emit("todetail", id);
    },
  },
});
</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: space-between;
}
.avatar-action-container {
  display: flex;
  flex-direction: column;
  width: 125px;
  margin-right: 10px;
}
.name-sex-container {
  display: flex;
  padding: 0.625rem;
  font-size: 1.25rem;
  height: 2.5625rem;
}
.info-detail-container {
  padding: 0.725em;
  font-size: 1em;
  height: 1.5625em;
  width: 150px;
  margin-bottom: 0 !important;
}
.btn-container {
  display: flex;
  justify-content: flex-end;
  padding: 5px;
}
</style>
