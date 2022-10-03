export default class Fila {

    constructor()
    {
        this.fila = [];
    }

    enqueue(atual, prioridade, movimentos, historico, solucao, last)
    {
        let novo = {atual, prioridade, movimentos, historico, solucao, last};
        let flag = false;
        for(let i = 0; i < this.fila.length; i++)
        {
            if(this.fila[i].prioridade > prioridade)
            {
                this.fila.splice(i, 0, novo);
                flag = true;break;
            }
        }
        if(!flag)
        {
            this.fila.push(novo);
        }

    }

    enqueueSPrio(atual, historico, solucao, last)
    {
        let novo = {atual, historico, solucao, last}
        this.fila.push(novo);
    }

    dequeue()
    {
        return this.fila.shift();
    }

    empty()
    {
        return this.fila.length === 0;
    }
}
