<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <q-btn
          @click="showModelInAddMode"
          outline
          color="primary"
          label="Add New"
          class="q-mr-xs"
        />
      </q-card-section>

      <q-table
        :data="data"
        :columns="columns"
        row-key="id"
        :pagination.sync="pagination"
        :loading="loading"
        :filter="filter"
        :rows-per-page-options="[5]"
        @request="onRequest"
        @row-dblclick="showModelInEditMode"
        binary-state-sort
      >
        <template v-slot:body-cell-action="props">
          <q-td>
            <q-btn outline round icon="delete" @click="deleteStudent(props)" />
          </q-td>
        </template>
      </q-table>
    </q-card>
    <div class="fixed-bottom text-center q-mb-sm">
      <q-btn
        @click="showModelInAddMode"
        size="15px"
        round
        color="primary"
        icon="add"
      />
    </div>

    <q-dialog v-model="showModel">
      <add-student
        :student="student"
        :mode="mode"
        @saveStudent="saveStudent"
        @close="showModel = false"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import Axios from "axios";
const RootUrl = "http://localhost:8000/student/";

export default {
  components: {
    "add-student": require("components/AddStudent.vue").default
  },
  data() {
    return {
      showModel: false,
      mode: "Add",

      data: [],
      loading: false,
      filter: "",
      pagination: {
        page: 1,
        rowsNumber: null
      },

      student: {
        id: 0,
        name: "",
        standard: "",
        mobile: ""
      },

      columns: [
        {
          name: "id",
          required: true,
          label: "Student ID",
          align: "left",
          field: "id",
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "student Name",
          align: "left",
          field: "name",
          sortable: true
        },
        {
          name: "standard",
          align: "left",
          label: "standard",
          field: "standard",
          sortable: true
        },
        {
          name: "mobile",
          align: "left",
          label: "mobile",
          field: "mobile",
          sortable: true
        },
        {
          name: "action",
          label: "",
          field: "id",
          align: "center"
        }
      ]
    };
  },

  methods: {
    async onRequest(prop) {
      var curPage = !prop ? 1 : prop.pagination.page;
      await Axios.get(RootUrl, { params: { page: curPage } }).then(response => {
        this.pagination.page = curPage;
        this.data = response.data.results;
        this.pagination.rowsNumber = response.data.count;
      });
      // console.log(prop);
    },

    showModelInAddMode() {
      this.student = { id: 0, name: "", standard: "", mobile: "" };
      this.showModel = true;
      this.mode = "Add";
    },
    showModelInEditMode(evt, row, index) {
      this.mode = "Edit";
      this.showModel = true;

      // console.log(row);

      this.student = {
        id: row.id,
        name: row.name,
        standard: row.standard,
        mobile: row.mobile
      };
    },

    saveStudent(studentData) {
      // console.log("saveStudent called");
      // console.log(this.mode);
      if (this.mode === "Add") {
        this.addStudent(studentData);
      } else {
        this.editStudent(studentData);
      }
    },

    async addStudent(studentData) {
      // console.log("addStudent Data=" + studentData);
      console.log(studentData);

      try {
        const response = await Axios.post(RootUrl, studentData);
        console.log("Created ID: " + response.data.id);
        this.onRequest();
      } catch (error) {
        console.log(error);
      }

      // const response = await Axios.post(RootUrl, studentData);
      // console.log("Created ID:" + response.data.id);
    },

    async editStudent(studentData) {
      // console.log("Edit Student");

      this.mode = "Add";

      try {
        const response = await Axios.put(
          RootUrl + studentData.id + "/",
          studentData
        );
        console.log("Created ID: " + response.data.id);
        this.onRequest();
      } catch (error) {
        console.log(error);
      }

      // const response = await Axios.put(
      //   RootUrl + studentData.id + "/",
      //   studentData
      // );
    },
    deleteStudent(props) {
      // const ok = confirm("Are u sure");
      const thisRow = props.value;
      // console.log(props.row);
      this.$q
        .dialog({
          title: "Delete",
          color: "red",
          message: `${props.row.name}  (id:${props.row.id}) `,
          cancel: true,
          ok: {
            push: true
          }
        })
        .onOk(async () => {
          try {
            await Axios.delete(RootUrl + thisRow);
            console.log("Deleted!!!");
            this.onRequest();
          } catch (err) {
            console.error(err);
          }
        });
    }
  },
  mounted() {
    filter: undefined;
    this.onRequest();
  }
};
</script>
