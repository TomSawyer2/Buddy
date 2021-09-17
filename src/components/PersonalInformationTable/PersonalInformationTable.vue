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
    <template v-slot:item.identity="{ item }">
      <v-select
        v-model="item.identity"
        :items="identityItems"
        required
        :disabled="showIdentitySelect"
      ></v-select>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "PersonalInformationTable",
  props: ["queryData", "showSelect", "selectedFather", "showIdentitySelect"],
  data() {
    return {
      singleSelect: false,
      selected: [],
      footer_props: {
        "items-per-page-options": [5],
        "show-current-page": true,
        "show-first-last-page": true,
      },
      identityItems: [
        "核心骨干",
        "骨干",
        "模块组长",
        "项目组长",
        "组员",
      ],
      headers: [
        {
          text: "开始年",
          align: "start",
          sortable: false,
          value: "startYear",
        },
        {
          text: "终止年",
          align: "start",
          sortable: false,
          value: "endYear",
        },
        {
          text: "方向",
          align: "start",
          sortable: false,
          value: "projectDirection",
        },
        {
          text: "名称",
          align: "start",
          sortable: false,
          value: "projectName",
        },
        {
          text: "身份",
          align: "start",
          sortable: false,
          value: "identity",
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
      if(newV !== undefined && newV != []) {
        let i = 0;
        for (i; i < newV.length; i ++ ) {
          let j = 0;
          for (j; j < (this as any).queryData.length; j ++ ) {
            if(newV[i].projectName == (this as any).queryData[j].projectName) {
              (this as any).queryData[j].identity = newV[i].identity;
            }
          }
        }
      }
      console.log(newV);
      if(newV !== undefined && newV.length >= oldV.length) {
        if(newV.length == 1) {
          if(newV[0].identity == '') {
            (this as any).$message.error("选中的选项身份信息不能为空！");
            (this as any).selected = [];
          } else {
            (this as any).$emit("projectItemChild", newV);
          }
        } else if (newV.length > 1) {
          let idx = 0;
          for(idx; idx < newV.length; idx ++ ) {
            if (newV[idx].identity == "" || newV[idx].identity === undefined) {
              (this as any).$message.error("选中的选项身份信息不能为空！");
              (this as any).selected.splice(idx, 1);
              break;
            }
            if (idx == newV.length - 1) {
              (this as any).$emit("projectItemChild", newV);
            }
          }
        }
      } else if(newV !== undefined && newV.length < oldV.length) {
        (this as any).$emit("projectItemChild", newV);
      }
    },
    queryData(newV, oldV) {
      if(newV !== undefined && (this as any).selected !== undefined) {
        let i = 0;
        for (i; i < newV.length; i ++ ) {
          let j = 0;
          for (j; j < (this as any).selected.length; j ++ ) {
            if(newV[i].projectName == (this as any).selected[j].projectName) {
              newV[i].identity = (this as any).selected[j].identity;
            }
          }
        }
      }
    }
  },
});
</script>
