<template>
  <main>
    <h1>MORDLE</h1>
    <div class="menu">
      <h3>Hello {{ nickname }}!</h3>
      <div v-for="option in options">
        <Card @click="choose(option)">
          <template #title>
            {{ option.title }}
          </template>
          <template #content>
            {{ option.description }}
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
      nickname: "",
      options: [
        // {
        //   title: "Quickplay",
        //   identifier: "quick",
        //   description: "Find a game with a random stranger"
        // },
        {
          title: "Create a game",
          identifier: "custom",
          description: "Create your game"
        }
      ]
    }
  },
  mounted(){
    this.nickname = localStorage.getItem("nickname");
  },
  methods: {
    choose(option){
      this.$router.push("/select?mode=" + option.identifier);
    }
  }
}
</script>