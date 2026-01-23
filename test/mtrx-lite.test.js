const { expect } = require('chai');
const { MtrxLite } = require('../src/mtrx-lite');

describe('TDD: мінімальна бібліотека операцій над матрицями (MtrxLite)', function () {

  describe('Створення матриці', function () {
    it('повинна створювати матрицю заданого розміру, заповнену нулями за замовчуванням', function () {
      const m = MtrxLite.zeros(2, 3);

      expect(m.rows).to.equal(2);
      expect(m.cols).to.equal(3);
      expect(m.data).to.deep.equal([
        [0, 0, 0],
        [0, 0, 0]
      ]);
    });

    it('повинна кидати помилку, якщо розміри некоректні', function () {
      expect(() => MtrxLite.zeros(0, 3)).to.throw();
      expect(() => MtrxLite.zeros(2, -1)).to.throw();
      expect(() => MtrxLite.zeros('2', 3)).to.throw();
    });
  });

  describe('Додавання матриць', function () {
    it('повинно додавати дві матриці однакового розміру (елемент до елемента)', function () {
      const a = new MtrxLite([[1, 2], [3, 4]]);
      const b = new MtrxLite([[10, 20], [30, 40]]);

      const c = a.add(b);

      expect(c.data).to.deep.equal([[11, 22], [33, 44]]);
    });

    it('повинно кидати помилку при спробі додати матриці різних розмірів', function () {
      const a = new MtrxLite([[1, 2], [3, 4]]);
      const b = new MtrxLite([[1, 2, 3], [4, 5, 6]]);

      expect(() => a.add(b)).to.throw();
    });
  });

  describe('Транспонування', function () {
    it('повинно транспонувати матрицю (рядки стають стовпцями)', function () {
      const a = new MtrxLite([[1, 2, 3], [4, 5, 6]]);
      const t = a.transpose();

      expect(t.rows).to.equal(3);
      expect(t.cols).to.equal(2);
      expect(t.data).to.deep.equal([[1, 4], [2, 5], [3, 6]]);
    });
  });

});
