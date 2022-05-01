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
            background-color: var(--gray);
            border: 1px solid black;
            display: inline-block;
            span {
              background-color: var(--dark-gray);
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
      nickname: "Fuck",
      points: 200,
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
      nickname: "Fack",
      points: 323,
      game: 2,
      locatedLetters: [],
      presentLetters: [],
      board: [
        [
          {value: "B", present: true, located: true},
          {value: "L", present: false, located: false},
          {value: "A", present: true, located: false},
          {value: "N", present: false, located: false},
          {value: "K", present: false, located: false}
        ],
        [
          {value: "B", present: true, located: true},
          {value: "E", present: true, located: false},
          {value: "A", present: true, located: false},
          {value: "R", present: true, located: false},
          {value: "D", present: true, located: true}
        ],
        [
          {value: "B", present: true, located: true},
          {value: "R", present: true, located: true},
          {value: "E", present: true, located: true},
          {value: "A", present: true, located: true},
          {value: "D", present: true, located: true},
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
      this.shareLink = "http://localhost:3000/join/" + this.$route.params.id;
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
