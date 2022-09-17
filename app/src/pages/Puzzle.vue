<template>
  <main class="row col-12">
    <section class="col-5 container">
      <div class="row mb-4">
        <div class="col-4 mb-2">
          <label for="algoritimo" class="form-label">Tipo de Busca</label>
          <select class="form-select" id="algoritimo">
            <option value="1" selected>A*</option>
            <option value="2">Largura</option>
          </select>
        </div>
        <div class="col-5 mb-2">
          <label for="algoritimo" class="form-label">Ordem</label>
          <input
            type="text"
            class="form-control"
            id="ordem"
            placeholder="insira a ordem 0-8 "
          />
        </div>
        <div>
          <button class="btn btn-danger w-25 mt-1 mb-1">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="puzzle-temp border-0 border-radius-2">
        <div
          v-for="i in 9"
          :key="i"
          class="puzzle-obj"
          :class="{ 'puzzle-active': i - 1 == 0 }"
        >
          {{ i - 1 }}
        </div>
      </div>
      <button class="col-12 btn btn-success btn-lg mt-2 mb-2">
        Solucionar
      </button>
    </section>

    <history class="col-6" />
  </main>
</template>

<script>
import { defineComponent } from "vue";
import History from "./History.vue";

export default defineComponent({
  components: { History },
  name: "PuzzleContent",
});
</script>

<style scoped>
.puzzle-temp {
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 10px;
  background-color: #232323;
  max-height: 500px;
  max-width: 500px;
}
.puzzle-obj {
  background: #333333;
  border-radius: 10px;
  font-size: 7rem;
  font-weight: 700;
  width: 130px;
  height: 130px;
}
.puzzle-active {
  background: #157347;
}
</style>
