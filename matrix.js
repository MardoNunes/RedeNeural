class Matrix{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for(let i = 0; i < this.rows; i++){
            let arr = [];
            for(let j = 0; j < this.cols; j++){
                arr.push(Math.floor(Math.random() * 10));
            }
            this.data.push(arr);
        }
    }

    static map(a, func){ 
        let matrix = new Matrix(a.rows, b.cols);
        
        matrix.data = matrix.data.map((arr, i) => {
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

    static add(a,b){
        var matrix = new Matrix(a.rows, a.cols);
        matrix.map((num, i, j) => {
            return a.data[i][j] + b.data[i][j];
        });
         return matrix;
    }

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

    static  arrayToMatrix(arr){
        var matrix = new Matrix(arr.length, 1);
        matrix.map((num, i, j) => {
            return arr[i];
        });
        return matrix;
    }

}