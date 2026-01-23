class MtrxLite {
  constructor(data) {
    
    if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0])) {
      throw new Error('Некоректні дані матриці: очікується масив масивів з хоча б одним рядком.');
    }

    const cols = data[0].length;
    if (cols === 0) {
      throw new Error('Некоректні дані матриці: рядок не може бути порожнім.');
    }

   
    for (const row of data) {
      if (!Array.isArray(row) || row.length !== cols) {
        throw new Error('Некоректні дані матриці: усі рядки повинні мати однакову довжину.');
      }
    }

    this.rows = data.length;
    this.cols = cols;

  
    this.data = data.map(r => r.slice());
  }

  static zeros(rows, cols) {
  
    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0) {
      throw new Error('Розміри матриці повинні бути додатними цілими числами.');
    }

    const data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
    return new MtrxLite(data);
  }

  add(other) {
    if (!(other instanceof MtrxLite)) {
      throw new Error('Операція додавання можлива лише з іншою матрицею MtrxLite.');
    }
    if (this.rows !== other.rows || this.cols !== other.cols) {
      throw new Error('Неможливо додати матриці різних розмірів.');
    }

    const result = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(this.data[i][j] + other.data[i][j]);
      }
      result.push(row);
    }

    return new MtrxLite(result);
  }

  transpose() {
    const result = [];
    for (let j = 0; j < this.cols; j++) {
      const row = [];
      for (let i = 0; i < this.rows; i++) {
        row.push(this.data[i][j]);
      }
      result.push(row);
    }
    return new MtrxLite(result);
  }
}

module.exports = { MtrxLite };
