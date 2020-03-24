<template>
  <div id="app">
    <h1 class="ml-2 mt-4">Parrot Memory Game</h1>
    <div class="timer mb-4">Time : {{ timer.time }} sec</div>
    <div class="board d-flex flex-wrap justify-content-between">
      <div
        v-for="(parrot_name, index) in shuffled_parrot_list"
        :key="index"
        class="parrot_wrapper m-1"
      >
        <Parrot
          :parrotInfo="{
            parrot_index: index,
            parrot_name: parrot_name
          }"
          :is_clicked="is_opened(index)"
          @clicked="clicked"
        ></Parrot>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import Timer from "./timer";
import Parrot from "./components/Parrot.vue";

const parrotMaster = [
  "/images/60fpsparrot.gif",
  "/images/angelparrot.gif",
  "/images/angryparrot.gif",
  "/images/aussiecongaparrot.gif",
  "/images/aussieparrot.gif",
  "/images/aussiereversecongaparrot.gif",
  "/images/backwardsparrot.gif",
  "/images/beerparrot.gif",
  "/images/beretparrot.gif",
  "/images/bikerparrot.gif",
  "/images/birthdaypartyparrot.gif",
  "/images/bluntparrot.gif",
  "/images/bobaparrot.gif",
  "/images/bootlegparrot.gif",
  "/images/boredparrot.gif",
  "/images/bouncingparrot.gif",
  "/images/brazilianfanparrot.gif",
  "/images/brazilianplayerparrot.gif",
  "/images/bunnyparrot.gif",
  "/images/calvinist_parrot.gif",
  "/images/ceilingparrot.gif",
  "/images/chicoparrot.gif",
  "/images/christmasparrot.gif",
  "/images/confusedparrot.gif",
  "/images/congaparrot.gif",
  "/images/congapartyparrot.gif",
  "/images/copparrot.gif",
  "/images/dadparrot.gif",
  "/images/darkmodeparrot.gif",
  "/images/dealwithitnowparrot.gif",
  "/images/dealwithitparrot.gif",
  "/images/discoparrot.gif",
  "/images/donutparrot.gif",
  "/images/evilparrot.gif",
  "/images/fastparrot.gif",
  "/images/flowerparrot.gif",
  "/images/flyingmoneyparrot.gif",
  "/images/footballparrot.gif",
  "/images/frenchparrot.gif",
  "/images/gentlemanparrot.gif",
  "/images/githubparrot.gif",
  "/images/gothparrot.gif",
  "/images/grouchoparrot.gif",
  "/images/hardhatparrot.gif",
  "/images/harpoparrot.gif",
  "/images/headingparrot.gif",
  "/images/headsetparrot.gif",
  "/images/horizontalparrot.gif",
  "/images/illuminatiparrot.gif",
  "/images/inverseparrot.gif",
  "/images/invisibleparrot.gif",
  "/images/jediparrot.gif",
  "/images/laptop_parrot.gif",
  "/images/levitationparrot.gif",
  "/images/maracasparrot.gif",
  "/images/mardigrasparrot.gif",
  "/images/marshmallowparrot.gif",
  "/images/michaeljacksonparrot.gif",
  "/images/middleparrot.gif",
  "/images/moonwalkingparrot.gif",
  "/images/mustacheparrot.gif",
  "/images/norwegianblueparrot.gif",
  "/images/opensourceparrot.gif",
  "/images/originalparrot.gif",
  "/images/parrot.gif",
  "/images/parrotnotfound.gif",
  "/images/partyparrot.gif",
  "/images/phparrot.gif",
  "/images/picassoparrot.gif",
  "/images/pingpongparrot.gif",
  "/images/pirateparrot.gif",
  "/images/popcornparrot.gif",
  "/images/portalblueparrot.gif",
  "/images/portalorangeparrot.gif",
  "/images/pumpkinparrot.gif",
  "/images/redenvelopeparrot.gif",
  "/images/redhatparrot.gif",
  "/images/reversecongaparrot.gif",
  "/images/reverseparrot.gif",
  "/images/reverseportalblueparrot.gif",
  "/images/reverseportalorangeparrot.gif",
  "/images/revolutionparrot.gif",
  "/images/sadparrot.gif",
  "/images/sassyparrot.gif",
  "/images/scienceparrot.gif",
  "/images/sherlockholmesparrot.gif",
  "/images/shortparrot.gif",
  "/images/shuffleparrot.gif",
  "/images/sintparrot.gif",
  "/images/sithparrot.gif",
  "/images/sleepingparrot.gif",
  "/images/slowparrot.gif",
  "/images/spinningparrot.gif",
  "/images/spyparrot.gif",
  "/images/stableparrot.gif",
  "/images/sushiparrot.gif",
  "/images/tennisparrot.gif",
  "/images/thumbsupparrot.gif",
  "/images/tiedyeparrot.gif",
  "/images/transparront.gif",
  "/images/twinsparrot.gif",
  "/images/ultrafastparrot.gif",
  "/images/verticalparrot.gif",
  "/images/vikingparrot.gif",
  "/images/wendyparrot.gif",
  "/images/whitewalkerparrot.gif",
  "/images/yosemitesamparrot.gif"
];
export default {
  name: "App",
  components: {
    Parrot
  },
  data() {
    return {
      is_start: false,
      timer: new Timer(),
      parrot_list: [],
      shuffled_parrot_list: [],
      opened_parrot: [],
      matched_parrot: [],
      total_parrot: 16,
      time_out_id: null
    };
  },
  methods: {
    clicked(parrotInfo) {
      if (this.is_open_different_parrot()) {
        this.opened_parrot = [];
        clearTimeout(this.time_out_id);
      }
      if (!this.is_valid_state(parrotInfo)) return;
      if (!this.is_start) {
        this.timer.start();
        this.is_start = true;
      }
      this.opened_parrot.push(parrotInfo);
      if (this.opened_parrot.length === 1) return;
      // 以下の処理は2つ以上開かれている場合での処理のため、一つ開かれている状態なら、以下の処理は実行しない
      if (this.is_same(this.opened_parrot[0], this.opened_parrot[1])) {
        this.match(this.opened_parrot[0], this.opened_parrot[1]);
        return;
      }
      this.different();
    },
    is_valid_state(parrotInfo) {
      if (this.opened_parrot.length >= 2) return false;
      if (
        //
        this.opened_parrot
          .map(obj => obj.parrot_index)
          .includes(parrotInfo.parrot_index)
      )
        return false;
      return true;
    },
    is_open_different_parrot() {
      if (
        this.opened_parrot.length === 2 &&
        this.opened_parrot[0].parrot_name !== this.opened_parrot[1].parrot_name
      )
        return true;
      return false;
    },
    is_opened(index) {
      const x = [...this.opened_parrot, ...this.matched_parrot].some(
        obj => obj.parrot_index === index
      );
      return x;
    },
    is_same(parrot1, parrot2) {
      return parrot1.parrot_name === parrot2.parrot_name;
    },
    match(parrot1, parrot2) {
      this.matched_parrot.push(parrot1);
      this.matched_parrot.push(parrot2);
      this.opened_parrot = [];
      if (this.matched_parrot.length === this.total_parrot) {
        this.finish();
      }
    },
    different() {
      const self = this;
      this.time_out_id = window.setTimeout(() => {
        self.opened_parrot = [];
      }, 2000);
    },
    finish() {
      const self = this;
      this.is_start = false;
      window.setTimeout(() => {
        alert("おめでとう！");
        self.matched_parrot = [];
        self.timer.end();
      }, 100);
    }
  },
  created() {
    const randomParrots = _.sampleSize(parrotMaster, 8);
    this.parrot_list = randomParrots;
    this.shuffled_parrot_list = _.shuffle([...randomParrots, ...randomParrots]);
  }
};
</script>

<style>
* {
  font-family: "Indie Flower", cursive;
}

.timer {
  width: 350px;
  margin: auto;
  font-size: 25px;
}
.board {
  width: 350px;
  height: 350px;
  margin: auto;
}
.parrot_wrapper {
  width: 70px;
  height: 70px;
}

@media screen and (min-width: 768px) {
  .timer {
    width: 680px;
    margin: auto;
    font-size: 25px;
  }
  .board {
    width: 680px;
    height: 500px;
    margin: auto;
  }
  .parrot_wrapper {
    width: 130px;
    height: 130px;
  }
}
</style>
