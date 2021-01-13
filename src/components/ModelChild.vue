<template>
  <q-dialog v-model="modelvisible">
    <q-card style="width: 600px; max-width: 60vw;">
      <q-card-section>
        <div class="text-h6">
          {{ mode }} Student
          <q-btn
            round
            flatfde
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
                <!-- <q-item-label class="q-pb-xs">Student ID</q-item-label> -->
                <q-input
                  dense
                  outlined
                  v-model="id"
                  label="Student ID"
                  disable
                />
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <!-- <q-item-label class="q-pb-xs">Student Name</q-item-label> -->
                <q-input
                  active
                  dense
                  outlined
                  v-model="name"
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
                  v-model="standard"
                  :options="StandardChoices"
                  stack-label
                  options-dense
                ></q-select>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <!-- <q-item-label class="q-pb-xs">Mobile</q-item-label> -->
                <q-input dense outlined v-model="mobile" label="Mobile">
                </q-input>
              </q-item-section>
            </q-item>
          </q-list>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-teal">
        <q-btn
          @click="saveStudent"
          label="Save"
          type="submit"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  props: {
    modelvisible: Boolean,
    mode: String,
    student: {}
  },
  data() {
    return {
      id: "",
      name: "",
      standard: "",
      mobile: "",
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
  methods: {
    saveStudent() {
      this.$emit("saveStudent");
    }
  }
};
</script>

<style></style>
