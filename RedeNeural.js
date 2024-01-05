
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

class RedeNeural{
    constructor(i_nodes, h_nodes, o_nodes){
        this.i_nodes = i_nodes; // input nodes
        this.h_nodes = h_nodes; // hidden nodes
        this.o_nodes = o_nodes; // output nodes

        this.bias_ih = new Matrix(this.h_nodes, 1); // bias para a camada escondida
        this.bias_ih.randomize();
        this.bias_ho = new Matrix(this.o_nodes, 1); // bias para a camada de saída
        this.bias_ho.randomize();

       

        this.weights_ih = new Matrix(this.h_nodes, this.i_nodes);   // pesos entre a camada de entrada e a camada escondida
        this.weights_ih.randomize();
        this.weights_ho = new Matrix(this.o_nodes, this.h_nodes);   // pesos entre a camada escondida e a camada de saída
        this.weights_ho.randomize();

        

        //this.learning_rate = 0.1;
    }

    

    feedforward(arr){
        //INPUT -> HIDDEN
        let input = Matrix.arrayToMatrix(arr);    // transforma o array de entrada em uma matriz
        let hidden = Matrix.multiply(this.weights_ih, input); // multiplica a matriz de entrada pela matriz de pesos entre a camada de entrada e a camada escondida
        hidden = Matrix.add(hidden, this.bias_ih); // adiciona o bias da camada escondida
        hidden.map(sigmoid); // aplica a função de ativação

        //HIDDEN -> OUTPUT
        let output = Matrix.multiply(this.weights_ho, hidden); // multiplica a matriz de entrada pela matriz de pesos entre a camada escondida e a camada de saída
        output = Matrix.add(output, this.bias_ho); // adiciona o bias da camada de saída
        output.map(sigmoid); // aplica a função de ativação

        output.print();
    }
}