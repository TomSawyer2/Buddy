<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-isDetailShow
      style="width: 30%; padding-top: 0px; margin-top: 0px"
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="queryData"
      sort-by="userName"
      :search="search"
      class="elevation-1"
      :footer-props="footer_props"
      :loading="loading"
      loading-text="加载中..."
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px" style="z-index: 1000">
          <AdminDetail
            :editedItem="editedItem"
            :majorItems="majorItemsChild"
            :bookItems="bookItemsChild"
            :fieldItems="fieldItemsChild"
            @getMajorsChild="getMajors"
            @getBooksChild="getBooks"
            @getFieldsChild="getFields"
            @closeChild="close"
            @updateInfoChild="updateInfo"
          />
        </v-dialog>
        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
          style="z-index: 100000"
        >
          <v-card>
            <v-card-title class="text-h5"
              >您确定要删除{{ editedItem.userName }}的相关信息？</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >取消</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >确定</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="todetail(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AdminTable from "@/components/Admin/AdminTable.vue";
import AdminDetail from "@/components/Admin/AdminDetail.vue";
export default Vue.extend({
  name: "AdminTable",
  components: { AdminDetail },
  props: ["queryData", "majorItems", "fieldItems", "bookItems"],
  data() {
    return {
      search: "",
      loading: false,
      headers: [
        {
          text: "姓名",
          align: "start",
          sortable: false,
          value: "userName",
        },
        { text: "队员编号", value: "number" },
        { text: "操作", value: "actions", sortable: false },
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        userName: "",
        number: null,
      },
      defaultItem: {
        userName: "",
        number: null,
      },
      footer_props: {
        "items-per-page-options": [5],
        "show-current-page": true,
        "show-first-last-page": true,
      },
      majorItemsChild: [],
      bookItemsChild: [],
      fieldItemsChild: [],
    };
  },
  created() {
    if (localStorage.getItem("ismobile") == "1") {
      (this as any).footer_props['items-per-page-options'][0] = 2;
    } else {
      (this as any).footer_props['items-per-page-options'][0] = 5;
    }
  },
  mounted() {
    (this as any).loading = true;
    (this as any).majorItemsChild = (this as any).majorItems;
    (this as any).fieldItemsChild = (this as any).fieldItems;
    (this as any).bookItemsChild = (this as any).bookItems;
  },
  methods: {
    todetail(item: any) {
      (this as any).dialog = true;
      (this as any).editedIndex = (this as any).queryData.indexOf(item);
      (this as any).editedItem = Object.assign({}, item);
    },

    deleteItem(item) {
      (this as any).editedIndex = (this as any).queryData.indexOf(item);
      (this as any).editedItem = Object.assign({}, item);
      (this as any).dialogDelete = true;
    },

    deleteItemConfirm() {
      (this as any).loading = true;
      (this as any).$emit("deleteUserChild", (this as any).editedItem);
      // (this as any).queryData.splice((this as any).editedIndex, 1);
      (this as any).closeDelete();
    },

    close() {
      (this as any).dialog = false;
      (this as any).$nextTick(() => {
        // (this as any).editedItem = {};
        (this as any).editedIndex = -1;
      });
    },

    closeDelete() {
      (this as any).dialogDelete = false;
      (this as any).$nextTick(() => {
        // (this as any).editedItem = {};
        (this as any).editedIndex = -1;
      });
    },

    updateInfo() {
      (this as any).loading = true;
      (this as any).$emit("updateUserInfoChild", (this as any).editedItem);
      (this as any).close();
    },

    getMajors() {
      (this as any).$emit("getMajorsChild");
    },
    getBooks() {
      (this as any).$emit("getBooksChild");
    },
    getFields() {
      (this as any).$emit("getFieldsChild");
    },
  },
  watch: {
    dialog(val) {
      val || (this as any).close();
    },
    dialogDelete(val) {
      val || (this as any).closeDelete();
    },
    queryData(newV, oldV) {
      (this as any).queryData = newV;
      (this as any).loading = false;
    },
  },
});
</script>

<style></style>
