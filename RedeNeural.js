
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

// derivada da função sigmoid
function dsigmoid(x){
    return x * (1 - x);

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

        

        this.learning_rate = 0.1;
    }

    

    // treina a rede neural
    train(arr, target){
    
        //FEEDFORWARD
        //INPUT -> HIDDEN
        let input = Matrix.arrayToMatrix(arr);    // transforma o array de entrada em uma matriz
        let hidden = Matrix.multiply(this.weights_ih, input); // multiplica a matriz de entrada pela matriz de pesos entre a camada de entrada e a camada escondida
        hidden = Matrix.add(hidden, this.bias_ih); // adiciona o bias da camada escondida
        hidden.map(sigmoid); // aplica a função de ativação

        //HIDDEN -> OUTPUT
        let output = Matrix.multiply(this.weights_ho, hidden); // multiplica a matriz de entrada pela matriz de pesos entre a camada escondida e a camada de saída
        output = Matrix.add(output, this.bias_ho); // adiciona o bias da camada de saída
        output.map(sigmoid); // aplica a função de ativação

        //BACKPROPAGATION
        //OUTPUT -> HIDDEN
        let expected = Matrix.arrayToMatrix(target); // transforma o array de saída esperada em uma matriz

        let output_error = Matrix.subtract(expected, output); // calcula o erro da camada de saída

        let d_output = Matrix.map(output, dsigmoid); // calcula a derivada da camada de saída

        let hidden_T = Matrix.transpose(hidden); // calcula a transposta da camada escondida

        let gradient = Matrix.hadamard(d_output, output_error); // calcula o gradiente

        gradient = Matrix.escalar_multiply(gradient, this.learning_rate); // multiplica o gradiente pela taxa de aprendizagem

        //adiciona os Bias
        this.bias_ho = Matrix.add(this.bias_ho, gradient); // ajusta o bias da camada de saída

        let weights_ho_deltas = Matrix.multiply(gradient, hidden_T); // multiplica o gradiente pela transposta da camada escondida

        this.weights_ho = Matrix.add(this.weights_ho, weights_ho_deltas); // ajusta os pesos da camada de saída

        //HIDDEN -> INPUT
        let who_t = Matrix.transpose(this.weights_ho); // calcula a transposta da matriz de pesos entre a camada escondida e a camada de saída

        let hidden_error = Matrix.multiply(who_t, output_error); // calcula o erro da camada escondida

        let d_hidden = Matrix.map(hidden, dsigmoid); // calcula a derivada da camada escondida

        let input_T = Matrix.transpose(input); // calcula a transposta da camada de entrada

        let gradient_H = Matrix.hadamard(d_hidden, hidden_error); // calcula o gradiente da camada escondida

        gradient_H = Matrix.escalar_multiply(gradient_H, this.learning_rate); // multiplica o gradiente pela taxa de aprendizagem

        //adiciona os Bias
        this.bias_ih = Matrix.add(this.bias_ih, gradient_H); // ajusta o bias da camada escondida

        let weights_ih_deltas = Matrix.multiply(gradient_H, input_T); // multiplica o gradiente pela transposta da camada de entrada
        
        this.weights_ih = Matrix.add(this.weights_ih, weights_ih_deltas); // ajusta os pesos da cakmada escondida

    }

    // prediz a saída da rede neural
    predict(arr){
        let input = Matrix.arrayToMatrix(arr); 
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid);

        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);
        output = Matrix.MatrixToArray(output);
        return output;
    }
}