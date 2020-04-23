<template>
  <div class="hello">
    <div>
      <b-button class="btn btn-success" @click="addTextbox">Add Textbox</b-button>
      <b-button class="btn btn-success" @click="addImage">Add Image</b-button>
      <b-button class="btn btn-warning" @click="submitCheck">Submit</b-button>
      <!-- <router-link :to="{name:'Test'}" tag="b-button">Upload Image</router-link> -->
    </div>
    <br />

    <!-- Textbox Component -->
    <app-text-box v-bind:texts="texts"></app-text-box>

    <!-- Image Upload Component -->
    <app-image-upload v-bind:images="images"></app-image-upload>

    <div :hidden="cards.length == 0">
      <h2>Cards</h2>
      <div class="grid-card-container">
        <div v-for="(card, index) in cards" :key="index" class="card">
          <p style="background-color: #eee">{{ index + 1 }}</p>
          <img :src="cards[index].image" width="100%" />
          <div class="container">
            <h4>
              <b>{{ cards[index].text }}</b>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Textbox from "./Textbox.vue";
import ImageUpload from "./Image.vue";

export default {
  name: "HelloWorld",
  components: {
    appTextBox: Textbox,
    appImageUpload: ImageUpload
  },

  data() {
    return {
      texts: [],
      images: [],
      cards: []
    };
  },
  computed: {
    checkBlankText() {
      for (let index = 0; index < this.texts.length; index++) {
        if (this.texts[index].value == "") {
          return false;
        }
      }
      return true;
    },
    checkBlankImage() {
      for (let index = 0; index < this.images.length; index++) {
        if (this.images[index].image == "") {
          return false;
        }
      }
      return true;
    },
    checkEqual() {
      return this.texts.length == this.images.length;
    },
    checkTextLength() {
      return this.texts.length > 0;
    },
    checkImageLength() {
      return this.images.length > 0;
    }
  },
  methods: {
    //Textbox func
    addTextbox() {
      this.texts.push({ value: "" });
    },

    //Image func
    addImage() {
      this.images.push({ image: "" });
    },

    //submit
    submitCheck() {
      this.cards = [];
      if (this.checkTextLength) {
        if (this.checkImageLength) {
          if (this.checkEqual) {
            if (this.checkBlankText) {
              if (this.checkBlankImage) {
                this.submit();
              } else {
                alert("All Image must be uploaded");
              }
            } else {
              alert("All Textbox must be filled");
            }
          } else {
            alert("The number of Textbox and Image must be equal");
          }
        } else {
          alert("Image is required");
        }
      } else {
        alert("Textbox is required");
      }
    },

    submit() {
      for (let index = 0; index < this.texts.length; index++) {
        this.cards.push({
          text: this.texts[index].value,
          image: this.images[index].image
        });
      }
      console.log(this.cards);
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

img {
  width: 50%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}

.grid-card-container {
  margin-left: 50px;
  margin-right: 50px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

.grid-card-item {
  padding: 10px;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
  background-color: #eee;
}
</style>
