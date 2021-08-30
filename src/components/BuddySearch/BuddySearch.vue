<template>
  <div class="searchbar">
    <div style="flex-direction: column; width: 60%; margin-left: 10px">
      <v-text-field
        label="老队员姓名"
        v-model="searchInfo.userName"
        validate-on-blur
        clearable
        style="width: 60%"
      />
      <v-select
        dense
        v-model="searchInfo.fields"
        :items="fields"
        small-chips
        label="技术栈"
        multiple
        outline
        clearable
      ></v-select>
    </div>
    <div class="search-btn">
      <v-switch v-model="isAllShow"></v-switch>
      <div class="student-show-text">显示小队员</div>
      <v-btn
        :disabled="false"
        color="primary"
        @click="search"
        style="width: 30%"
      >
        <v-icon>mdi-magnify</v-icon>
        搜索
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { getAllFields } from "@/apis";
import Vue from "vue";
export default Vue.extend({
  name: "BuddySearch",
  props: [],
  data() {
    return {
      searchInfo: {
        userName: "",
        fields: [],
      },
      fields: ["1", "2", "3", "4"],
      isCardShow: false,
      valid: false,
      isAllShow: false,
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchInfo);
    },
  },
  async mounted() {
    try {
      const res = (await getAllFields()).data.data;
      this.fields = res;
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    isAllShow: function (val: boolean) {
      this.$emit("showAllChange", val);
    },
  },
});
</script>

<style scoped>
.searchbar {
  display: flex;
  align-items: stretch;
}
.search-btn {
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.student-show-text {
  margin-top: -23px;
  color: rgb(107, 105, 105);
  font-size: 0.875rem;
}
</style>
