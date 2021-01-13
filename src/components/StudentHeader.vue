<template>
  <q-card-section>
    {{ userName }}
    <q-btn @click="changeUserName()">ChangeName</q-btn>
    <q-btn
      @click="showModel()"
      outline
      color="primary"
      label="Add New"
      class="q-mr-xs"
    />
  </q-card-section>
</template>

<script>
// @click="new_student = true"
export default {
  props: { userName: String },
  // @click="new_student = true"
  data() {
    return {
      new_student: false
    };
  },
  methods: {
    changeUserName() {
      this.$emit("changeUserName");
    },
    showModel() {
      this.$emit("showModel");
    }
  }
};
</script>

<style></style>
