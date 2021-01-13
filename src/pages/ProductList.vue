<template>
  <q-page padding>
    <q-table
      title="Products"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :rows-per-page-options="[2]"
      @request="onRequest"
    />
  </q-page>
</template>

<script>
// import { onMounted, reactive } from "@vue/composition-api";
import Axios from "axios";
const RootUrl = "http://localhost:8000";

export default {
  data() {
    return {
      data: [],
      pagination: {
        page: 1,
        rowsNumber: null
      },
      columns: [
        {
          name: "idt",
          label: "IDENTITY",
          field: "id"
        },
        {
          name: "name",
          label: "PRODUCT NAME",
          field: "name"
        }
      ]
    };
  },
  mounted() {
    this.onRequest();
  },
  methods: {
    routeToEdit(event, row, index) {
      console.log(row.id);
      root.$router.push({ path: `/products/${row.id}` });
    },

    onRequest(prop) {
      Axios.get(
        prop
          ? RootUrl + `/products/?page=${prop.pagination.page}`
          : RootUrl + "/products/"
      ).then(response => {
        prop
          ? (this.pagination.page = prop.pagination.page)
          : (this.pagination.page = 1);
        this.data = response.data.results;
        this.pagination.rowsNumber = response.data.count;
      });
      console.log(prop);
    }
  }
};
</script>

<style lang="scss" scoped></style>
