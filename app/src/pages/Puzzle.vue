<template>
  <main class="row col-12">
    <section class="col-6 container">
      <div class="row mb-4">
        <div class="col-2">
          <label for="algoritimo" class="form-label">Busca</label>
          <select class="form-select" id="algoritimo" v-model="searchMethod">
            <option value="1">A*</option>
            <option value="2">Largura</option>
          </select>
        </div>
        <div class="col-2" v-show="isStar">
          <label for="profundidade" class="form-label">Profundidade</label>
          <select class="form-select" id="profundidade" v-model="depth">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div class="col-3">
          <label for="algoritimo" class="form-label">ordem</label>
          <input
            v-model="userValue"
            type="text"
            class="form-control"
            id="order"
            :class="{ success: success, error: error }"
            placeholder="[0-8] ex: 012345678"
          />
        </div>
        <div class="col">
          <button class="btn btn-success mt-1 mb-1 mx-1" @click="setOrder">
            Definir Final
          </button>
          <button class="btn btn-danger mt-1 mb-1 mx-1" @click="randomize">
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
        <span v-show="error" class="error p-2 mt-2">
          Para conseguir embaralhar manualmente de forma adequada. É necessario
          inserir 9 numeros, sendo obrigatorio 1 numero 0 e os restante entre 1
          a 8
        </span>
      </div>

      <div class="puzzle-temp border-0 border-radius-2">
        <div
          v-for="i in order"
          :key="i"
          class="puzzle-obj"
          :class="{ 'puzzle-active': i == 0 }"
        >
          {{ i == 0 ? "" : i }}
        </div>
      </div>
      <button class="col-6 btn btn-success btn-lg mt-2 mb-2" @click="solve">
        Solucionar
      </button>
    </section>
    <div class="col-6 aside">
      <aside>
        <h2>Historico</h2>
      </aside>
      <div
        v-if="this.loading"
        class="spinner-border text-success def"
        role="status"
      >
        <span class="visually-hidden">Loading</span>
      </div>
      <history
        v-if="this.solved"
        :historyArray="historyData"
        :tempoEx="tempoEx"
        :tamCaminho="this.tamCaminho"
      />
    </div>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import History from "./History.vue";
import Fila from "../helpers/fila.js";

export default defineComponent({
  components: { History },
  name: "PuzzleContent",
  emits: ["change"],
  data() {
    return {
      isStar: 1,
      searchMethod: "1",
      depth: 1,
      order: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      userValue: "012345678",
      error: false,
      success: false,
      historyData: [],
      solved: false,
      loading: false,
      tempoEx: "",
      tamCaminho: 0,
    };
  },
  methods: {
    changeIsStar() {
      this.isStar = this.searchMethod == "1" ? true : false;
    },
    setOrder() {
      const validateUserValue = this.userValue.trim().split("");
      if (
        validateUserValue.length == 9 &&
        !isNaN(this.userValue) &&
        validateUserValue.includes("0")
      ) {
        this.order = validateUserValue;
        this.error = false;
        this.success = true;
      } else {
        this.error = true;
        this.success = false;
      }
    },
    randomize() {
      let final = this.userValue;
      for (let i = 0; i < 45; i++) {
        let posZero = final.indexOf("0");
        let mov = this.possibilidades(posZero);
        let rand = Math.ceil(Math.random() * mov.length - 1);
        let aux = final.charAt(mov[rand]);
        final = final.replace("0", "r");
        final = final.replace(aux, "0");
        final = final.replace("r", aux);
      }
      this.order = final.split("");
    },
    solve() {
      this.tamCaminho = 0;
      this.loading = true;
      this.solved = false;
      this.historyData = [];
      let resultado;
      let solucao = this.userValue;
      let inicio = "";
      let horaInicio = new Date().getTime();

      for (let i = 0; i < 9; i++) {
        inicio = inicio + this.order[i];
      }
      if (this.searchMethod == 1) {
        let filaCPrio = new Fila();
        filaCPrio.enqueue(inicio, 0, 0, [inicio], solucao, -1);
        if (this.depth == "1") resultado = this.AEstrelaUm(filaCPrio);
        else resultado = this.AEstrelaDois(filaCPrio);
      } else {
        let filaSPrio = new Fila();
        filaSPrio.enqueueSPrio(inicio, [inicio], solucao, -1);
        resultado = this.buscaCega(filaSPrio);
      }

      let horaFim = new Date().getTime();
      this.solved = true;
      this.loading = false;

      this.historyData = resultado.historico;

      let tempo = horaFim - horaInicio;
      this.tempoEx = `${Math.floor(tempo / 60000)}:${Math.floor(
        (tempo % 60000) / 1000
      )}:${Math.floor((tempo % 60000) % 1000)}`;
    },
    AEstrelaUm(fila) {
      let flag = false;
      let valor;
      while (!fila.empty() && !flag) {
        valor = fila.dequeue();
        this.tamCaminho++;
        let posZero = valor.atual.indexOf("0");
        flag = this.resolvido(valor);
        if (!flag) {
          let passos = this.possibilidades(posZero);

          for (let pos of passos) {
            if (valor.last != valor.atual.charAt(pos)) {
              let novo = valor.atual;
              let aux = novo.charAt(pos);
              novo = novo.replace("0", "r");
              novo = novo.replace(aux, "0");
              novo = novo.replace("r", aux);
              let fa = this.calculaManhatam(novo, valor.solucao);
              let auxHisto = [...valor.historico];
              auxHisto.push(novo);
              let prio = fa + valor.movimentos + 1;
              fila.enqueue(
                novo,
                prio,
                valor.movimentos + 1,
                auxHisto,
                valor.solucao,
                aux
              );
            }
          }
        }
      }
      return valor;
    },
    AEstrelaDois(fila) {
      let flag = false;
      let valor;
      while (!fila.empty() && !flag) {
        valor = fila.dequeue();
        let posZero = valor.atual.indexOf("0");
        flag = this.resolvido(valor);
        if (!flag) {
          let passos = this.possibilidades(posZero);

          for (let pos of passos) {
            if (valor.last != valor.atual.charAt(pos)) {
              let novo = valor.atual;
              let aux = novo.charAt(pos);
              novo = novo.replace("0", "r");
              novo = novo.replace(aux, "0");
              novo = novo.replace("r", aux);
              let posFilhos = this.possibilidades(novo.indexOf("0"));
              let fa = -1;
              for (let i of posFilhos) {
                let charFilho = novo.charAt(i);
                let novoFilho = novo.replace("0", "r");
                novoFilho = novoFilho.replace(charFilho, "0");
                novoFilho = novoFilho.replace("r", charFilho);
                let auxFilho = this.calculaManhatam(novoFilho, valor.solucao);

                if (fa == -1 || auxFilho < fa) fa = auxFilho;
              }
              let auxHisto = [...valor.historico];
              auxHisto.push(novo);
              let prio = fa + valor.movimentos + 1;
              fila.enqueue(
                novo,
                prio,
                valor.movimentos + 1,
                auxHisto,
                valor.solucao,
                aux
              );
            }
          }
        }
      }
      return valor;
    },
    possibilidades(index) {
      if (index == 0) return [1, 3];
      if (index == 1) return [0, 2, 4];
      if (index == 2) return [1, 5];
      if (index == 3) return [0, 4, 6];
      if (index == 4) return [1, 3, 5, 7];
      if (index == 5) return [2, 4, 8];
      if (index == 6) return [3, 7];
      if (index == 7) return [4, 6, 8];
      if (index == 8) return [5, 7];
    },
    buscaCega(fila) {
      let flag = false;
      let valor;
      while (!fila.empty() && !flag) {
        valor = fila.dequeue();
        let posZero = valor.atual.indexOf("0");
        flag = this.resolvido(valor);
        if (!flag) {
          let passos = this.possibilidades(posZero);

          for (let pos of passos) {
            if (valor.last != valor.atual.charAt(pos)) {
              let novo = valor.atual;
              let aux = novo.charAt(pos);
              novo = novo.replace("0", "r");
              novo = novo.replace(aux, "0");
              novo = novo.replace("r", aux);
              let auxHisto = [...valor.historico];
              auxHisto.push(novo);
              fila.enqueueSPrio(novo, auxHisto, valor.solucao, aux);
            }
          }
        }
      }
      return valor;
    },
    resolvido(valor) {
      if (valor.atual === valor.solucao) return true;
      return false;
    },
    calculaManhatam(aux, resolvido) {
      let valor = 0;

      for (let i = 0; i < 9; i++) {
        if(aux[i] !== resolvido[i])
          valor++;
      }
      return valor;
    },
  },
  watch: {
    searchMethod() {
      this.changeIsStar();
    },
  },
});
</script>

<style scoped>
.error {
  border: 2px solid #ed5555;
  color: #ed5555;
}
.success {
  border: 2px solid #157347;
  color: #157347;
}
.puzzle-temp {
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 10px;
  background-color: #232323;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  max-height: 450px;
  max-width: 450px;
}
.puzzle-obj {
  display: flex;
  align-items: center;
  justify-content: center;
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

.aside {
  background: #232323;
  border-radius: 10px;
}

.def {
  position: relative;
  display: flex;
  top: 5%;
  left: 27%;
  width: 450px;
  height: 450px;
  opacity: 50%;
}
</style>
