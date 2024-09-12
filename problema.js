class RecintosZoo {
    constructor() {
      // Recintos disponíveis no zoológico
      this.recintos = [
        {
          numero: 1,
          bioma: 'savana',
          tamanhoTotal: 10,
          animais: [{ especie: 'MACACO', quantidade: 3 }]
        },
        {
          numero: 2,
          bioma: 'floresta',
          tamanhoTotal: 5,
          animais: []
        },
        {
          numero: 3,
          bioma: 'savana e rio',
          tamanhoTotal: 7,
          animais: [{ especie: 'GAZELA', quantidade: 1 }]
        },
        {
          numero: 4,
          bioma: 'rio',
          tamanhoTotal: 8,
          animais: []
        },
        {
          numero: 5,
          bioma: 'savana',
          tamanhoTotal: 9,
          animais: [{ especie: 'LEAO', quantidade: 1 }]
        }
      ];
  
      // Animais permitidos no zoológico
      this.animaisPermitidos = {
        'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
        'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
        'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
        'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
        'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio', 'savana e rio'], carnivoro: false },
      };
    }
  
    // Verifica se os recintos são viáveis para novos animais
    analisaRecintos(especie, quantidade) {
      if (!this.animaisPermitidos[especie]) {
        return { erro: 'Animal inválido' };
      }
      if (quantidade <= 0) {
        return { erro: 'Quantidade inválida' };
      }
  
      const animal = this.animaisPermitidos[especie];
      const recintosViaveis = [];
  
      for (const recinto of this.recintos) {
        if (!animal.biomas.includes(recinto.bioma)) continue;
  
        let espacoNecessario = quantidade * animal.tamanho;
        if (recinto.animais.length > 0) espacoNecessario += 1;
  
        const espacoOcupado = recinto.animais.reduce((total, a) => {
          return total + a.quantidade * this.animaisPermitidos[a.especie].tamanho;
        }, 0);
  
        const espacoLivre = recinto.tamanhoTotal - espacoOcupado;
  
        const recintoInvalido = recinto.animais.some(a => {
          return this.animaisPermitidos[a.especie].carnivoro && a.especie !== especie;
        }) || (animal.especie === 'HIPOPOTAMO' && recinto.animais.length > 0 && recinto.bioma !== 'savana e rio');
  
        if (recintoInvalido || espacoLivre < espacoNecessario) continue;
  
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessario}, total: ${recinto.tamanhoTotal})`);
      }
  
      return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: 'Não há recinto viável' };
    }
  }
  
  export { RecintosZoo as RecintosZoo };