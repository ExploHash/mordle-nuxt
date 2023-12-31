<template>
  <main>
    <Dialog id="shareDialog" header="Share the link with your friend" v-model:visible="showShareDialog" >
      <div class="share-dialog">
        <div class="share-dialog-content">
          <p>Copy the link below and send it to your friend</p>
          <InputText id="shareLink" v-model="shareLink" readonly />
          <p>When your friend joins the game will start :)</p>
        </div>
      </div>
    </Dialog>
    <div class="points-game">
      <div class="points-card opponent">
        <div class="header">
          <div class="nickname"> {{ opponentBoard.nickname }}</div>
          <div class="points"> {{ opponentBoard.points }}</div>
          <div class="game"> {{ opponentBoard.game }}/3 </div>
        </div>
        <div class="board">
          <div class="board-row" v-for="rowIndex in 6" v-bind:key="rowIndex">
            <div class="board-letter" v-for="letterIndex in 5" v-bind:key="letterIndex">
              <span v-if="opponentBoard.board[rowIndex - 1] && opponentBoard.board[rowIndex - 1][letterIndex - 1]" :class="{ present: opponentBoard.board[rowIndex - 1][letterIndex - 1].present, located: opponentBoard.board[rowIndex - 1][letterIndex - 1].located  }">{{ opponentBoard.board[rowIndex - 1][letterIndex - 1].value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="points-card me">
        <div class="header">
          <span class="nickname"> {{ myBoard.nickname }}</span>
          <span class="points"> {{ myBoard.points }}</span>
          <span class="game"> {{ myBoard.game }}/3 </span>
        </div>
        <div class="board">
          <div class="board-row" v-for="rowIndex in 6" v-bind:key="rowIndex">
            <div class="board-letter" v-for="letterIndex in 5" v-bind:key="letterIndex">
              <span v-if="myBoard.board[rowIndex - 1] && myBoard.board[rowIndex - 1][letterIndex - 1]" :class="{ present: myBoard.board[rowIndex - 1][letterIndex - 1].present, located: myBoard.board[rowIndex - 1][letterIndex - 1].located  }">{{ myBoard.board[rowIndex - 1][letterIndex - 1].value }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="keyboard">
        <SimpleKeyboard @onKeyPress="onKeyPress" :locatedLetters="myBoard.locatedLetters" :missingLetters="myBoard.missingLetters" :presentLetters="myBoard.presentLetters" />
      </div>
    </div>
  </main>
</template>

<style lang="less">
  .points-game {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh; // Set the game to full viewport height

    .points-card {
      flex: 1; // Adjusts the flex value so both cards and keyboard share the viewport height proportionally
      overflow: auto; // Allows content to scroll within the card if it overflows its container
      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .board {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .board-row {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .board-letter {
            width: 5vh;
            height: 5vh;
            max-width: 60px; // Sets a maximum size so it doesn't become too large on bigger screens
            max-height: 60px;
            background-color: var(--gray);
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 4vh;
              background-color: var(--dark-gray);
              max-font-size: 35px; // Sets a maximum font size for bigger screens

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
  
    .keyboard {
      flex: 0 0 auto; // Do not expand or shrink the keyboard
      display: flex;
      justify-content: center; // Align keyboard in the center
      padding: 1em; // Add some padding around the keyboard
    }
  }

  // Media queries for desktop layout adjustments
  @media (min-width: 1024px) {
    .keyboard {
      max-width: 500px; // A reasonable max width for the keyboard on wide screens
      margin: 0 auto; // Center the keyboard horizontally
    }
    .points-card {
      width: 500px;
      // max-width: 500px; // A reasonable max width for the cards on wide screens
    }
    // Center
    .points-game {
      align-items: center;
    }
  }
</style>

<script>
import SimpleKeyboard from "~/components/SimpleKeyBoard.vue";
import { useToast } from "primevue/usetoast";

export default {
  name: "App",
  components: {
    SimpleKeyboard
  },
  data: () => ({
    showShareDialog: false,
    shareLink: "",
    opponentBoard: {
      nickname: "-",
      points: 0,
      game: 1,
      board: [
        [
          {value: "", present: true, located: true},
          {value: "", present: false, located: false},
          {value: "", present: false, located: false},
          {value: "", present: false, located: false},
          {value: "", present: false, located: false}
        ],
        [
          {value: "", present: true, located: true},
          {value: "", present: false, located: false},
          {value: "", present: true, located: false},
          {value: "", present: false, located: false},
          {value: "", present: true, located: false},
        ]
      ]
    },
    myBoard: {
      nickname: "-",
      points: 0,
      game: 1,
      locatedLetters: [],
      presentLetters: [],
      board: [
        [
          {value: "", present: true, located: true},
          {value: "", present: false, located: false},
          {value: "", present: true, located: false},
          {value: "", present: false, located: false},
          {value: "", present: false, located: false}
        ],
        [
          {value: "", present: true, located: true},
          {value: "", present: true, located: false},
          {value: "", present: true, located: false},
          {value: "", present: true, located: false},
          {value: "", present: true, located: true}
        ],
        [
          {value: "", present: true, located: true},
          {value: "", present: true, located: true},
          {value: "", present: true, located: true},
          {value: "", present: true, located: true},
          {value: "", present: true, located: true},
        ]
      ]
    }
  }),
  methods: {
    onKeyPress(character) {
      this.$socket2.emit("inputPointsGame", {
        gameId: this.$route.params.id,
        character
      });
    }
  },
  mounted(){
    //Check for share dialog
    if(this.$route.query.share){
      this.showShareDialog = true;
      this.shareLink = "http://mordle.nykaworks.com/join/" + this.$route.params.id;
    }

    const nickname = localStorage.getItem("nickname");
    
    //Subscribe to game events
    this.$socket.on("pointsGameUpdate", (data) => {
      console.log("pointsGameUpdate", data);
      if(data.nickname === nickname){
        this.myBoard = data;
      }else{
        this.opponentBoard = data;
      }
    });

    this.$socket.on("pointsStateUpdate", (data) => {
      // alert(data);
      console.log(data);
      // this.opponentBoard = data.opponentBoard;
      // this.myBoard = data.myBoard;
    });

    this.$socket.on("pointsGameMessage", (data) => {
      console.log("pointsGameMessage", data);
      alert(data);
    });

    this.$socket2.emit("joinPointsGame", {
      id: this.$route.params.id
    });
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
