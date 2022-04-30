<template>
  <h1>Joining...</h1>
</template>

<style lang="less">
  .points-game {
    // min-height: 100vh;
    height: 100vh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    * {
      flex-grow: 1;
    }
    .points-card {
      border-bottom: 1px solid black;
      .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        * {
          flex-basis: 0;
        }

        .nickname {
          text-align: left;
        }

        .points {
          text-align: center;
        }

        .game {
          text-align: right;
        }
      }
      .board {
        // height: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .board-row {
          // flex-grow: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .board-letter {
            width: 10vw;
            height: 10vw;
            background-color: var(--pink);
            border: 1px solid black;
            display: inline-block;
            span {
              background-color: var(--blue);
              display: block;
              width: 100%;
              height: 100%;
              text-align: center;
              font-size: 7vw;
              line-height: 10vw;

              &.present{
                background-color: var(--orange);
              }
              &.located{
                background-color: var(--green);
              }
            }
          }
        }
      }
    }
  }
</style>

<script>
import SimpleKeyboard from "~/components/SimpleKeyBoard.vue";

export default {
  name: "App",
  components: {
    SimpleKeyboard
  },
  data: () => ({
  }),
  methods: {
  },
  mounted(){
    //Check if the user is already logged in
    if(!localStorage.getItem("nickname")){
      this.$router.push("/?redirect=" + this.$route.path);
    }else{
      //Send join game command
      this.$socket2.emit("customGameJoin", {
        id: this.$route.params.id,
      }, (response) => {
        if(response && response.id)
          this.$router.push(`/m/${response.type}/${response.id}`);
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
