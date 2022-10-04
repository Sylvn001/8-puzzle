<template>
  <div class="historyContainer">
    <div class="data-history">
      <div class="data-setup">Tempo Gasto: {{ tempoEx }}</div>
      <div class="data-setup">Passos: {{ historyArray.length - 1 }}</div>
      <div class="data-setup">Tam caminho: {{ tamCaminho }}</div>
    </div>
    <div class="historyBox">
      <div
        class="historyCard"
        v-for="(history, historyIndex) in historyArray"
        :key="historyIndex"
      >
        <div class="passo">Passo {{ historyIndex }}</div>
        <div class="historyCardItem">
          <div
            v-for="historyValue in history"
            class="historyCardItemValues"
            :key="historyValue"
            :class="{ 'puzzle-active': historyValue == 0 }"
          >
            {{ historyValue == 0 ? "" : historyValue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    historyArray: [],
    tempoEx: String,
    tamCaminho: Number,
  },
  name: "HistoryComponent",
});
</script>

<style scoped>
.historyContainer {
  width: 100%;
  height: 100%;
  max-height: 520px;
  max-width: 100%;
  overflow: auto;
}

.historyBox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.historyCard {
  background: #333333;
  display: flex;
  height: 150px;
}
.historyCardItem {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  border-radius: 30px;
  border: 10px solid #232323;
}
.passo {
  background: #232323;

  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  border: 10px solid #333333;
  border-radius: 10px;
}
.historyCardItemValues {
  border-radius: 10px;
  max-width: 60px;
  padding: 5px;
}
.puzzle-active {
  background: #157347;
}
.data-history {
  display: flex;
}
.data-setup {
  background: #333333;
  width: 200px;
  height: 2rem;
  margin: 0.8rem 0.5rem 0.8rem 0;
  border-radius: 10px;
}
</style>
