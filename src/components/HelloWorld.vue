<template>
  <div class="hello">
    <form>
      <div>
        <div>
          <b-button class="btn btn-success" @click="addTextbox">Add Textbox</b-button>
          <b-button class="btn btn-danger" @click="removeAllTextbox">Remove All Textbox</b-button>
          <b-button class="btn btn-primary" @click="getDemoData">Get Demo Data</b-button>
        </div>
        <br />
        <div>
          <b-button class="btn btn-success" @click="addImage">Add Image</b-button>
          <b-button class="btn btn-danger" @click="removeAllImage">Remove All Image</b-button>
          <input type="submit" class="btn btn-warning" value="Submit" @click="submitCheck" />
        </div>
        <!-- <router-link :to="{name:'Test'}" tag="b-button">Upload Image</router-link> -->
      </div>
      <br />

      <!-- Textbox Component -->
      <app-text-box v-bind:texts="texts"></app-text-box>

      <!-- Image Upload Component -->
      <app-image-upload v-bind:images="images"></app-image-upload>

      <div class="card-slider" :hidden="cards.length == 0">
        <h2>Cards</h2>
        <Slider>
          <SliderItem v-for="(card, index) in cards" :key="index">
            <p style="background-color: #eee">{{ index + 1 }}</p>
            <img :src="cards[index].image" />
            <div class="card-text">
              <h4>
                <p>{{ cards[index].text }}</p>
              </h4>
            </div>
          </SliderItem>
        </Slider>
      </div>
      <hr />
    </form>
  </div>
</template>

<script>
import Textbox from "./Textbox.vue";
import ImageUpload from "./Image.vue";
import { Slider, SliderItem } from "vue-easy-slider";

export default {
  name: "HelloWorld",
  components: {
    appTextBox: Textbox,
    appImageUpload: ImageUpload,
    Slider,
    SliderItem
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
  watch: {
    checkEqual() {}
  },
  methods: {
    //Textbox func
    addTextbox() {
      this.texts.push({ value: "" });
    },

    removeAllTextbox() {
      this.$store.commit("removeAllTextbox");
    },

    //Image func
    addImage() {
      this.images.push({ image: "" });
    },

    removeAllImage() {
      this.$store.commit("removeAllImage");
    },

    //get demo data from api
    getDemoData() {
      this.$store.dispatch("getDataFromApi");
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

.card-slider {
  width: 20%;
  margin: auto;
}

.card-text {
  font-family: cursive;
}
</style>
