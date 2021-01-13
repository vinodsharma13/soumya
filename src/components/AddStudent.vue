<template>
  <q-card style="width: 600px; max-width: 60vw;">
    <q-card-section>
      <div class="text-h6">
        <span v-if="mode === 'Edit'">Update Student</span>
        <span v-else>Add Student</span>
        <q-btn
          v-close-popup
          round
          flatfde
          dense
          icon="close"
          class="float-right"
          color="grey-8"
        ></q-btn>
      </div>
    </q-card-section>
    <q-separator inset></q-separator>
    <q-card-section class="q-pt-none">
      <q-form @submit="submitForm" class="q-gutter-md">
        <q-list>
          <q-item>
            <q-item-section>
              <!-- <q-item-label class="q-pb-xs">Student ID</q-item-label> -->
              <q-input
                dense
                outlined
                v-model="studentToSubmit.id"
                label="Student ID"
                disable
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <!-- <q-item-label class="q-pb-xs">Student Name</q-item-label> -->
              <q-input
                autofocus
                dense
                outlined
                v-model="studentToSubmit.name"
                label="Name"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Enter Your Name']"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <!-- <q-item-label class="q-pb-xs">Class</q-item-label> -->
              <q-select
                dense
                label="Standard"
                outlined
                v-model="studentToSubmit.standard"
                :options="StandardChoices"
                stack-label
                options-dense
              ></q-select>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <!-- <q-item-label class="q-pb-xs">Mobile</q-item-label> -->
              <q-input
                dense
                outlined
                v-model="studentToSubmit.mobile"
                label="Mobile"
              >
              </q-input>
            </q-item-section>
          </q-item>
        </q-list>

        <q-card-actions align="right" class="text-teal">
          <q-btn label="Save" type="submit" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ["student", "mode"],
  data() {
    return {
      studentToSubmit: {
        id: 0,
        name: "",
        standard: "",
        mobile: ""
      },
      StandardChoices: [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
        "XII"
      ]
    };
  },
  mounted() {
    this.initForm();
  },
  methods: {
    initForm() {
      if (this.mode === "Edit") {
        this.studentToSubmit = this.student;
      }
    },
    submitForm() {
      this.$emit("saveStudent", this.studentToSubmit);
      this.$emit("close");
    }
  }
};
</script>

<style></style>
