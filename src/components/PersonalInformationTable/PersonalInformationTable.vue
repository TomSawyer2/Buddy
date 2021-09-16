<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="queryData"
    :single-select="singleSelect"
    item-key="projectName"
    :show-select="showSelect"
    :footer-props="footer_props"
    class="elevation-1"
    no-data-text="数据库中暂无对应的项目"
  >
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "PersonalInformationTable",
  props: ["queryData", "showSelect", "selectedFather"],
  data() {
    return {
      singleSelect: false,
      selected: [],
      footer_props: {
        "items-per-page-options": [5],
        "show-current-page": true,
        "show-first-last-page": true,
      },
      headers: [
        {
          text: "开始年份",
          align: "start",
          sortable: false,
          value: "startYear",
        },
        {
          text: "终止年份",
          align: "start",
          sortable: false,
          value: "endYear",
        },
        {
          text: "项目方向",
          align: "start",
          sortable: false,
          value: "projectDirection",
        },
        {
          text: "项目名称",
          align: "start",
          sortable: false,
          value: "projectName",
        },
      ],
    };
  },
  methods: {},
  mounted() {
    (this as any).selected = (this as any).selectedFather;
  },
  watch: {
    selected(newV, oldV) {
      (this as any).$emit("projectItemChild", newV);
    },
  },
});
</script>
