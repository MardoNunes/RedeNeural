class Matrix{
    //inicializa a matriz com valores aleatórios
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for(let i = 0; i < this.rows; i++){
            let arr = [];
            for(let j = 0; j < this.cols; j++){
                arr.push(0);
            }
            this.data.push(arr);
        }
    }

    //aplica uma função a cada elemento da matriz
    static map(a, func){ 
        let matrix = new Matrix(a.rows, a.cols);
        
        matrix.data = a.data.map((arr, i) => {
            return arr.map((num,j) => {
                return func(num,i,j);
            })
        })
        return matrix;
    }

    map(func){ 
        this.data = this.data.map((arr, i) => {
            return arr.map((num,j) => {
                return func(num,i,j);
            })
        })
        return this;
    }

    //soma de duas matrizes
    static add(a,b){
        var matrix = new Matrix(a.rows, a.cols);
        matrix.map((num, i, j) => {
            return a.data[i][j] + b.data[i][j];
        });
         return matrix;
    }

    //multiplicação de duas matrizes
    static multiply(a,b){
        var matrix = new Matrix(a.rows, b.cols);
        matrix.map((num, i, j) => {
            let sum = 0;
            for(let k = 0; k < a.cols; k++){
                let elm1 = a.data[i][k];
                let elm2 = b.data[k][j];
                sum += elm1 * elm2;
            }
           return sum; 
        });
       
        return matrix;
    }

    

    randomize(){
        this.map((num, i, j) => {
            return Math.random() * 2 - 1;
        })
    }

    print(){
        console.table(this.data);
    }

    static MatrixToArray(obj) {
        let arr = []
        obj.map((elm, i, j) => {
            arr.push(elm);
        })
        return arr;
    }

    static  arrayToMatrix(arr){
        let matrix = new Matrix(arr.length, 1);
        matrix.map((num, i, j) => {
            return arr[i];
        });
        return matrix;
    }

    //produto hadamard
    static hadamard(a,b){
        var matrix = new Matrix(a.rows, a.cols);
        matrix.map((num, i, j) => {
            return a.data[i][j] * b.data[i][j];
        });
         return matrix;
    }

    //prudot de uma matriz por um escalar
    static escalar_multiply(a, escalar){
        var matrix = new Matrix(a.rows, a.cols);
        matrix.map((num, i, j) => {
            return a.data[i][j] * escalar;
        });
         return matrix;
    }

    //trnaposicao de uma matriz
    static transpose(a){
        var matrix = new Matrix(a.cols, a.rows);
        matrix.map((num, i, j) => {
            return a.data[j][i];
        });
         return matrix;
    }

    //subtracao de duas matrizes
    static subtract(a,b){
        var matrix = new Matrix(a.rows, a.cols);
        matrix.map((num, i, j) => {
            return a.data[i][j] - b.data[i][j];
        });
         return matrix;
    }

}