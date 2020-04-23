<template>
  <div class="textbox">
    <div :hidden="texts.length == 0">
      <h2>Enter a text</h2>
      <div class="grid-text-container">
        <div class="grid-text-item" v-for="(text, index) in texts" :key="index">
          <p>{{ index + 1 }}</p>
          <b-input v-model="texts[index].value" />
          <b-button class="btn btn-secondary" @click="clearTextbox(index)">Clear</b-button>
          <b-button class="btn btn-danger" @click="removeTextbox(index)">Remove</b-button>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "Textbox",
  props: {
    texts: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    clearTextbox(index) {
      this.texts[index].value = "";
    },
    removeTextbox(index) {
      this.texts.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.grid-text-container {
  margin-left: 50px;
  margin-right: 50px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.grid-text-item {
  padding: 10px;
}
</style>