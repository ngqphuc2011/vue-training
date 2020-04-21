<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div>
      <b-button class="btn btn-success" @click="add">Add</b-button>
    </div>

    <div class="grid-container">
      <div class="grid-item" v-for="(item, index) in items" :key="index">
        <b-input v-model="items[index].name" />
        <b-button class="btn btn-secondary" @click="clear(index)">Clear</b-button>
        <b-button class="btn btn-danger" @click="del(index)">Delete</b-button>
      </div>
    </div>

    <div>
      <div v-if="!image">
        <h2>Select an image</h2>
        <input type="file" @change="onFileChange" />
      </div>
      <div v-else>
        <img :src="image" />
        <button @click="removeImage">Remove image</button>
      </div>
    </div>
  </div>
</template>


<style>
.grid-container {
  margin-left: 300px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
}
.grid-item {
  padding: 10px;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      counter: 0,
      items: [],
      image: ""
    };
  },
  methods: {
    add() {
      this.items.push({ name: "" });
    },
    clear(index) {
      this.items[index].name = "";
    },
    del(index) {
      this.items.splice(index, 1);
    },
    onFileChange(e) {
      console.log(e);
      
      var files = e.target.files
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
