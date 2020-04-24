<template>
  <div class="hello">
    <form>
      <div>
        <b-button class="btn btn-success" @click="addTextbox">Add Textbox</b-button>
        <b-button class="btn btn-success" @click="addImage">Add Image</b-button>
        <b-button class="btn btn-danger" @click="getDemoData">Get Demo Data</b-button>
        <input type="submit" class="btn btn-warning" value="Submit" @click="submitCheck" />
        <!-- <router-link :to="{name:'Test'}" tag="b-button">Upload Image</router-link> -->
      </div>
      <br />

      <!-- Textbox Component -->
      <app-text-box v-bind:texts="texts"></app-text-box>

      <!-- Image Upload Component -->
      <app-image-upload v-bind:images="images"></app-image-upload>
    </form>

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
      texts: this.$store.state.texts,
      images: this.$store.state.images,
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

    //get demo data from api
    getDemoData() {
      this.$store.commit('getDataFromApi')
    },

    //submit
    submitCheck() {
      this.cards = [];
      let isValid =
        this.checkTextLength &&
        this.checkImageLength &&
        this.checkEqual &&
        this.checkBlankText &&
        this.checkBlankImage;
      let errorString = "";

      if (isValid) {
        this.submit();
      } else {
        if (!this.checkTextLength) {
          errorString += "Textbox is required.\n";
        } else if (!this.checkImageLength) {
          errorString += "Image is required.\n";
        } else {
          if (!this.checkEqual) {
            errorString += "The number of Textbox and Image must be equal.\n";
          } else {
            if (!this.checkBlankText) {
              errorString += "All Textbox must be filled.\n";
            }
            if (!this.checkBlankImage) {
              errorString += "All Image must be uploaded.\n";
            }
          }
        }
        alert(errorString);
      }
    },

    submit() {
      for (let index = 0; index < this.texts.length; index++) {
        this.cards.push({
          text: this.texts[index].value,
          image: this.images[index].image
        });
      }
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
