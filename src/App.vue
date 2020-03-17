<template>
  <div id="app">
    <h1>Memory Game</h1>
    <h2>Parrot ver.</h2>
    <div>Time:{{ timer.time }}</div>
    <div class="container">
      <div class="row">
        <div v-for="(parrot_name, index) in shuffled_parrot_list" :key="index" class="col-3">
          <Parrot
            :parrot_info="{
              parrot_index: index,
              parrot_name: parrot_name 
            }"
            :is_clicked="is_opened(index)"
            @clicked="clicked"
          ></Parrot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parrot from "./components/Parrot.vue";
import _ from "lodash";
import { Timer } from "./timer";
const parrot_master = [
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
  data: function() {
    return {
      is_start: false,
      timer: new Timer(),
      parrot_list: [],
      shuffled_parrot_list: [],
      opened_parrot: [],
      matched_parrot: [],
      total_parrot: 16
    };
  },
  methods: {
    clicked: function(parrot_info) {
      if (!this.is_start) {
        this.timer.start();
        this.is_start = true;
      }
      if (this.opened_parrot.length >= 2) return;
      if (
        this.opened_parrot
          .map(obj => obj.parrot_index)
          .includes(parrot_info.parrot_index)
      )
        return;
      this.opened_parrot.push(parrot_info);
      if (this.opened_parrot.length == 1) return;
      if (this.is_same(this.opened_parrot[0], this.opened_parrot[1])) {
        this.matched_parrot.push(this.opened_parrot[0]);
        this.matched_parrot.push(this.opened_parrot[1]);
        this.opened_parrot = [];
        if (this.matched_parrot.length === this.total_parrot) {
          const self = this;
          window.setTimeout(function() {
            alert("おめでとう！");
            self.matched_parrot = [];
            self.timer.end();
          }, 100);
        }
        return;
      }
      const self = this;
      window.setTimeout(function() {
        self.opened_parrot = [];
      }, 2000);
    },
    is_opened: function(index) {
      const x = [...this.opened_parrot, ...this.matched_parrot].some(
        obj => obj.parrot_index === index
      );
      return x;
    },
    is_same: function(parrot1, parrot2) {
      return parrot1.parrot_name === parrot2.parrot_name;
    }
  },
  created: function() {
    const random_parrots = _.sampleSize(parrot_master, 8);
    this.parrot_list = random_parrots;
    this.shuffled_parrot_list = _.shuffle([
      ...random_parrots,
      ...random_parrots
    ]);
  }
};
</script>

<style></style>
