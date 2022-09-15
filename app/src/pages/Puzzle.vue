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
          <button class="col-12 btn btn-danger btn-lg mt-1 mb-1">
            Embaralhar
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
    <aside class="col-6">
      <h2>Historico</h2>
    </aside>
  </main>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PuzzleContent",
});
</script>

<style scoped>
.puzzle-temp {
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 5px;
  background-color: #232323;
  max-height: 800px;
  max-width: 800px;
}
.puzzle-obj {
  background: #333333;
  border-radius: 10px;
  font-size: 7rem;
  font-weight: 700;
  width: 240px;
  height: 180px;
}
.puzzle-active {
  background: #157347;
}

aside {
  background: #232323;
  border-radius: 10px;
}
</style>
