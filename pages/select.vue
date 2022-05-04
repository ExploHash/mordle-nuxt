<template>
  <main>
    <h1>MORDLE</h1>
    <div class="menu">
      <h3>Choose a gamemode:</h3>
      <div v-for="gamemode in gamemodes" v-bind:key="gamemode">
        <Card @click="choose(gamemode)">
          <template #title>
            {{ gamemode.title }}
          </template>
          <template #content>
            {{ gamemode.description }}
          </template>
        </Card>
      </div>
    </div>
  </main>
</template>

<style lang="less">
  h1 {
    text-align: center;
    color: var(--white)
  }
  .menu {
    .title {
      text-transform: capitalize;
    }

    .p-card {
      cursor: pointer;
      margin-bottom: 20px;
    }
  }
  
</style>

<script>
export default {
  data(){
    return {
      gamemodes: [
        {
          title: "Points",
          identifier: "points",
          description: "Play 3 wordles for points. You get points for guessing the word early or getting letters right. The game ends when you both are finished."
        },
        // {
        //   title: "Speed",
        //   identifier: "speed",
        //   description: "Play 5 wordles. You get a point everytime you guess the word first. The person with the most points wins"
        // }
      ]
    }
  },
  methods: {
    async choose(gamemode){
      const mode = this.$route.query.mode;

      if(mode === "custom"){
        console.log("custom")
        await this.$socket2.emit("customGameCreate", {
          type: gamemode.identifier
        }, (response) => {
          console.log("response", response);
          if(response && response.id){
            this.$router.push(`/m/${gamemode.identifier}/${response.id}?share=true`);
          }
        });
      }
    }
  }
}
</script>