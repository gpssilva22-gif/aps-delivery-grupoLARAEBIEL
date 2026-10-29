
const {
  autenticar,
  forcaSenha,
  podeLogar,
  calcularFrete,
  aplicarCupom
} = require('./delivery');

const usuarios = [
  {
    email: 'ana@delivery.com',
    senha: 'Ana12345',
    ativo: true
  },
  {
    email: 'bruno@delivery.com',
    senha: 'Bruno#2024',
    ativo: false
  }
];

test('CT-01: credenciais válidas autentica o usuário', () => {
  expect(autenticar(usuarios, 'ana@delivery.com', 'Ana12345')).toBe(true);
});

test('CT-02: senha incorreta retorna false', () => {
  expect(autenticar(usuarios, 'ana@delivery.com', 'senhaerrada')).toBe(false);
});

test('CT-03: e-mail inexistente retorna false', () => {
  expect(autenticar(usuarios, 'ninguem@delivery.com', 'Ana12345')).toBe(false);
});

test('CT-04: conta inativa retorna false', () => {
  expect(autenticar(usuarios, 'bruno@delivery.com', 'Bruno#2024')).toBe(false);
});

test('CT-05: senha curta é fraca', () => {
  expect(forcaSenha('Ab1')).toBe('fraca');
});

test('CT-06: senha de 8 dígitos é média', () => {
  expect(forcaSenha('12345678')).toBe('media');
});

test('CT-07: senha com minúsculas e maiúsculas é média', () => {
  expect(forcaSenha('Abcdefgh')).toBe('media');
});

test('CT-08: senha com quatro tipos é forte', () => {
  expect(forcaSenha('Abcdef1!')).toBe('forte');
});

test('CT-09: usuário ativo sem falhas pode logar', () => {
  expect(podeLogar({ status: 'ativo', falhas: 0 })).toBe(true);
});

test('CT-10: usuário ativo com duas falhas pode logar', () => {
  expect(podeLogar({ status: 'ativo', falhas: 2 })).toBe(true);
});

test('CT-11: usuário com três falhas não pode logar', () => {
  expect(podeLogar({ status: 'ativo', falhas: 3 })).toBe(false);
});

test('CT-12: usuário bloqueado não pode logar', () => {
  expect(podeLogar({ status: 'bloqueado', falhas: 0 })).toBe(false);
});

test('CT-13: frete para dois quilômetros custa 5', () => {
  expect(calcularFrete(2)).toBe(5);
});

test('CT-14: frete para três quilômetros custa 5', () => {
  expect(calcularFrete(3)).toBe(5);
});

test('CT-15: frete para cinco quilômetros custa 8', () => {
  expect(calcularFrete(5)).toBe(8);
});

test('CT-16: distância negativa lança erro', () => {
  expect(() => calcularFrete(-2)).toThrow('Distância inválida');
});

test('CT-17: pedido sem cupom mantém o valor original', () => {
  expect(aplicarCupom(80, null)).toBe(80);
});

test('CT-18: cupom PRIMEIRA10 dá 10% de desconto', () => {
  expect(aplicarCupom(100, 'PRIMEIRA10')).toBe(90);
});

test('CT-19: cupom VIP20 dá 20% de desconto', () => {
  expect(aplicarCupom(50, 'VIP20')).toBe(40);
});

test('CT-20: cupom desconhecido lança erro', () => {
  expect(() => aplicarCupom(80, 'CUPOM123')).toThrow('Cupom inválido');
});
