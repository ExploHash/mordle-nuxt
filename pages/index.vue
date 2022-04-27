<template>
  <main>
    <h1>MORDLE</h1>
    <div class="nicknamecontainer">
      <InputText placeholder="Nickname" type="text" v-model="nickname" />
      <Button @click="submit">Continue</Button>
    </div>
  </main>
</template>

<style lang="less">
  h1 {
    text-align: center;
    color: var(--white)
  }
  .nicknamecontainer {
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    align-items: center;

    * {
      margin-bottom: 10px;
      text-align: center;
    }

    h2 {
      text-align: center;
    }

    .p-button {
      background-color: var(--pink);
      border-radius: 16px;
      font-weight: 800;
      width: 50%;
      display: block;
      padding: 10px;
    }
    .p-inputtext {
      color: black;
      font-weight: 800;
    
      padding: 10px;
      background-color: var(--white);
      width: 80%;
      border-radius: 16px;
    }
  }
  
</style>

<script>

function dec2hex (dec) {
  return dec.toString(16).padStart(2, "0")
}

// generateId :: Integer -> String
function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

export default {
  data(){
    return {
      nickname: ""
    }
  },
  mounted(){
    if(localStorage.getItem("nickname")){
      this.$router.push("/menu");
    }
  },
  methods: {
    submit(){
      localStorage.setItem("identifier", generateId(20));
      localStorage.setItem("nickname", this.nickname);
      this.$router.push("/menu");
    }
  }
}
</script>