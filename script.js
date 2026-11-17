
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

const CHAVE_PESSOAS = "pessoas";
let proximoCodigo = 1;


function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

function classificarIMC(imc) {
  if (imc < 18.5) {
    return { texto: "Abaixo do peso", classe: "azul" };
  }
  if (imc < 25) {
    return { texto: "Peso normal", classe: "verde" };
  }
  if (imc < 30) {
    return { texto: "Sobrepeso", classe: "amarelo" };
  }
  return { texto: "Obesidade", classe: "vermelho" };
}

function formatar(valor, casasDecimais) {
  return valor.toFixed(casasDecimais).replace(".", ",");
}

function criarColuna(texto) {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

function criarLinha(pessoa) {
  const tr = document.createElement("tr");

  //  Cálculo do IMC e classificação
  const imc = calcularIMC(pessoa.peso, pessoa.altura);
  const classificacao = classificarIMC(imc);

  tr.appendChild(criarColuna(pessoa.nome));
  tr.appendChild(criarColuna(pessoa.idade));
  tr.appendChild(criarColuna(formatar(pessoa.altura, 2) + "m"));
  tr.appendChild(criarColuna(formatar(pessoa.peso, 1) + "KG"));
  tr.appendChild(criarColuna(formatar(imc, 1)));

  // 4. Criação da coluna de classificação com selo colorido
  const tdClassificacao = document.createElement("td");
  const selo = document.createElement("span");

  selo.classList.add("selo", classificacao.classe);
  selo.textContent = classificacao.texto;

  tdClassificacao.appendChild(selo);
  tr.appendChild(tdClassificacao);

  return tr;
}

function render() {
  tabelaPessoas.innerHTML = "";

  pessoas.forEach((pessoa) => {
    const linha = criarLinha(pessoa);
    tabelaPessoas.appendChild(linha);
  });
}


function lerFormulario() {
  return {
    nome: inputNome.value.trim(),
    idade: Number(inputIdade.value),
    altura: Number(inputAltura.value),
    peso: Number(inputPeso.value)
  };
}

function validarDados(dados) {
  if (dados.nome.length < 2) {
    return "Informe o nome com no mínimo duas letras.";
  }
  if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
    return "A idade deve ser um número inteiro entre 1 e 120.";
  }
  if (dados.altura < 0.5 || dados.altura > 2.5) {
    return "A altura deve estar entre 0,50m e 2,50m.";
  }
  if (dados.peso < 2 || dados.peso > 500) {
    return "O peso deve estar entre 2kg e 500kg.";
  }
  return "";
}

function mostrarErro(texto) {
  mensagemDeErro.textContent = texto;
  mensagemDeErro.hidden = false;
}

function limparErro() {
  mensagemDeErro.textContent = "";
  mensagemDeErro.hidden = true;
}


function adicionarPessoa(dados) {
  const novaPessoa = {
    id: proximoCodigo++,
    nome: dados.nome,
    idade: dados.idade,
    altura: dados.altura,
    peso: dados.peso
  };

  pessoas.push(novaPessoa);
}

function salvar() {
  localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
}

function carregarPessoas() {
  const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);

  if (dadosSalvos === null) {
    return [];
  }

  try {
    const lista = JSON.parse(dadosSalvos);
    if (Array.isArray(lista)) {
      return lista;
    }
    return [];
  } catch (erro) {
    console.error("Erro ao carregar dados do localStorage:", erro);
    return [];
  }
}

function ajustarContadorDeCodigo() {
  let maior = 0;

  pessoas.forEach((pessoa) => {
    if (pessoa.id > maior) {
      maior = pessoa.id;
    }
  });

  proximoCodigo = maior + 1;
}

formPessoa.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = lerFormulario();
  const erro = validarDados(dados);

  if (erro !== "") {
    mostrarErro(erro);
    return;
  }

  limparErro();
  adicionarPessoa(dados);
  salvar();

  formPessoa.reset();
  inputNome.focus();
  render();
});


let pessoas = carregarPessoas();
ajustarContadorDeCodigo();
render();
