<template>
  <div class="image">
    <div :hidden="images.length == 0">
      <h2>Select an image</h2>
      <div class="grid-image-container">
        <div class="grid-image-item" v-for="(image, index) in images" :key="index">
          <p>{{ index + 1 }}</p>

          <div class="dropbox" v-if="images[index].image == '' ">
            <input
              type="file"
              @change="onFileChange($event, index)"
              class="input-file"
              accept="image/*"
            />
          </div>
          <div v-else>
            <img :src="images[index].image" />
          </div>
          <div>
            <b-button class="btn btn-secondary" @click="clearImage(index)">Clear</b-button>
            <b-button class="btn btn-danger" @click="removeImage(index)">Remove</b-button>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  name: "ImageUpload",
  props: {
    images: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    onFileChange(event, index) {
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0], index);
    },
    createImage(file, index) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = e => {
        this.images[index].image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    clearImage(index) {
      this.images[index].image = "";
    },
    removeImage(index) {
      this.images.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.grid-image-container {
  margin-left: 50px;
  margin-right: 50px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.grid-image-item {
  padding: 10px;
}
img {
  width: 50%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>