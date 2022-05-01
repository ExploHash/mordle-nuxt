<template>
  <div class="keyboard"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    input: {
      type: String
    },
    locatedLetters: {
      type: Array
    },
    presentLetters: {
      type: Array
    },
    missingLetters: {
      type: Array
    }
  },
  data: () => ({
    layoutName: "wordle",
    keyboard: null,
    oldlocatedLetters: [],
    oldpresentLetters: [],
    oldmissingLetters: []
  }),
  mounted() {
    let ctx = this;
    setTimeout(() => {
      this.keyboard = new Keyboard(".keyboard", {
        onKeyPress: this.onKeyPress,
        layout: {
          'wordle': [
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            '{enter} Z X C V B N M {bksp}',
          ]
        },
        layoutName: "wordle"
      });
      console.log("KANKER", this.keyboard);
    }, 1000);
  },
  methods: {
    onKeyPress(button) {
      this.$emit("onKeyPress", button);
    },
    updateKeyboard(){
      console.log("WUUUUT");
      ["located", "present", "missing"].forEach((key) => {
        this.keyboard.removeButtonTheme(this["old" + key + "Letters"].join(" "), key);
        this.keyboard.addButtonTheme(this[key + "Letters"].join(" "), key);
        this["old" + key + "Letters"] = this[key + "Letters"];
      });
    }
  },
  watch: {
    locatedLetters: function() {
      this.updateKeyboard();
    },
    presentLetters: function() {
      this.updateKeyboard();
    },
    missingLetters: function() {
      this.updateKeyboard();
    },
  },
};
</script>

<style lang="less">
  .hg-button{
    &.present{
      background-color: var(--orange);
    }
    
    &.missing{
      background-color: var(--dark-gray);
    }

    &.located{
      background-color: var(--green);
    }

  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
