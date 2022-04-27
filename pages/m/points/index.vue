<template>
  <main>
    <div class="points-card opponent">
      <div class="header">
        <span class="nickname"> {{ opponentBoard.nickname }}</span>
        <span class="points"> {{ opponentBoard.points }}</span>
        <span class="game"> {{ opponentBoard.game }}/3 </span>
      </div>
      <div class="board">
        <div class="board-row" v-for="rowIndex in 6" v-bind:key="rowIndex">
          <div class="board-letter" v-for="letterIndex in 5" v-bind:key="letterIndex">
            <span v-if="opponentBoard.board[rowIndex - 1] && opponentBoard.board[rowIndex - 1][letterIndex - 1]" :class="{ present: opponentBoard.board[rowIndex - 1][letterIndex - 1].present, located: opponentBoard.board[rowIndex - 1][letterIndex - 1].located  }">{{ opponentBoard.board[rowIndex - 1][letterIndex - 1].letter }}</span>
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
            <span v-if="myBoard.board[rowIndex - 1] && myBoard.board[rowIndex - 1][letterIndex - 1]" :class="{ present: myBoard.board[rowIndex - 1][letterIndex - 1].present, located: myBoard.board[rowIndex - 1][letterIndex - 1].located  }">{{ myBoard.board[rowIndex - 1][letterIndex - 1].letter }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="keyboard">
      <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input"/>
    </div>
  </main>
</template>

<style lang="less">
  main {
    display: grid;
    grid-template: "a"
                   "b"
                   "c";
    .points-card {
      .board {
        height: 100%;
        display: inline-block;
        .board-row {
          display: inline-block;
          .board-letter {
            background-color: var(--pink);
            border: 1px solid black;
            width: 10vw;
            height: 10vw;
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
// import "./App.css";

export default {
  name: "App",
  components: {
    SimpleKeyboard
  },
  data: () => ({
    opponentBoard: {
      nickname: "Gert",
      points: 200,
      game: 1,
      board: [
        [
          {letter: "", present: true, located: true},
          {letter: "", present: false, located: false},
          {letter: "", present: false, located: false},
          {letter: "", present: false, located: false},
          {letter: "", present: false, located: false}
        ],
        [
          {letter: "", present: true, located: true},
          {letter: "", present: false, located: false},
          {letter: "", present: true, located: false},
          {letter: "", present: false, located: false},
          {letter: "", present: true, located: false},
        ]
      ]
    },
    myBoard: {
      nickname: "Skensha",
      points: 323,
      game: 2,
      board: [
        [
          {letter: "B", present: true, located: true},
          {letter: "L", present: false, located: false},
          {letter: "A", present: true, located: false},
          {letter: "N", present: false, located: false},
          {letter: "K", present: false, located: false}
        ],
        [
          {letter: "B", present: true, located: true},
          {letter: "E", present: true, located: false},
          {letter: "A", present: true, located: false},
          {letter: "R", present: true, located: false},
          {letter: "D", present: true, located: true}
        ],
        [
          {letter: "B", present: true, located: true},
          {letter: "R", present: true, located: true},
          {letter: "E", present: true, located: true},
          {letter: "A", present: true, located: true},
          {letter: "D", present: true, located: true},
        ]
      ]
    }
  }),
  methods: {
    onChange(input) {
      this.input = input;
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(input) {
      this.input = input.target.value;
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
