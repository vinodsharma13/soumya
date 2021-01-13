<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        ref="table"
        :data="data"
        :columns="columns"
        :filter="filter"
        row-key="name"
        :pagination.sync="pagination"
        :loading="loading"
        @request="request"
      >
        <template slot="top-right">
          <!-- slot-scope="props" -->
          <q-search hide-underline v-model="filter" />
        </template>
      </q-table>

      <q-table
        title="Student List"
        :data="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :grid="mode == 'grid'"
        :pagination.sync="pagination"
        :loading="loading"
        :filter="filter"
        @request="request"
        binary-state-sort
      >
        <template v-slot:top-right="props">
          <q-btn
            @click="new_student = true"
            outline
            color="primary"
            label="Add New"
            class="q-mr-xs"
          />

          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{
                props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
              }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="
              mode = mode === 'grid' ? 'list' : 'grid';
              separator = mode === 'grid' ? 'none' : 'horizontal';
            "
            v-if="!props.inFullscreen"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{ mode === "grid" ? "List" : "Grid" }}
            </q-tooltip>
          </q-btn>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="new_student">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            Add new Student
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Student ID</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="student.id"
                    label="Student ID"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Student Name</q-item-label>
                  <q-input dense outlined v-model="student.name" label="Name" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Class</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="student.standard"
                    label="Standard"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Last Call</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="student.last_call"
                    mask="date"
                    label="Last Call"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="lastCallProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <!-- <q-date
                            v-model="student.last_call"
                            @input="() => $refs.lastCallProxy.hide()"
                          /> -->
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn
            @click="addStudent"
            label="Save"
            type="submit"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Axios from "axios";
const RootUrl = "http://localhost:8000";

export default {
  data() {
    return {
      serverPagination: {
        page: 1,
        rowsNumber: 10 // specifying this determines pagination is server-side
      },

      serverData: [],
      filter: "",
      loading: false,
      // pagination: {
      //   rowsPerPage: 2
      // }
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },

      student: {},
      new_student: false,
      mode: "list",
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
          name: "last_call",
          align: "left",
          label: "Last Call",
          field: "last_call",
          sortable: true
        }
      ],
      data: [
        {
          id: 1,
          name: "Dr. Jada Conolly",
          standard: "X",
          last_call: "12-09-2019"
        },
        {
          id: 2,
          name: "Dr. Kiley Ibbotson",
          standard: "XI",
          last_call: "09-02-2019"
        },
        {
          id: 3,
          name: "Dr. Leslie Tecklenburg",
          standard: "IX",
          last_call: "03-25-2019"
        }
      ]
    };
  },
  mounted() {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    });
  },

  methods: {
    addStudent() {
      console.log("add students");
    },
    request({ pagination, filter }) {
      // we set QTable to "loading" state
      this.loading = true;

      // we do the server data fetch, based on pagination and filter received
      // (using Axios here, but can be anything; parameters vary based on backend implementation)

      axios
        .get(
          `/data/${pagination.page}?sortBy=${pagination.sortBy}&descending=${pagination.descending}&filter=${filter}`
        )
        .then(({ data }) => {
          // updating pagination to reflect in the UI
          this.serverPagination = pagination;

          // we also set (or update) rowsNumber
          this.serverPagination.rowsNumber = data.rowsNumber;

          // then we update the rows with the fetched ones
          this.serverData = data.rows;

          // finally we tell QTable to exit the "loading" state
          this.loading = false;
        })
        .catch(error => {
          // there's an error... do SOMETHING
          console.log("Error");
          // we tell QTable to exit the "loading" state
          this.loading = false;
        });
    }
  }
};
</script>
