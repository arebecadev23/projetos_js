
let tarefas = [];

let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("Título deve ter, no mínimo, cinco caracteres");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Prioridade deve estar entre 1 e 3");
  }
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorDeCodigo++;

  let novaTarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução (não concluída)
  };

  tarefas.push(novaTarefa);
}

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(codigoTarefa) {
  const tarefa = tarefas.find((item) => item.codigo === codigoTarefa);

  if (!tarefa) {
    throw new Error("Código da tarefa não encontrado");
  }

  return tarefa;
}


function concluirTarefa(codigoTarefa) {
  const tarefa = buscarTarefa(codigoTarefa);

  if (tarefa.status === false) {
    throw new Error("A tarefa já estava concluída");
  }

  tarefa.status = false; // false = tarefa concluída
}


function alterarPrioridade(codigoTarefa, novaPrioridade) {
  const tarefa = buscarTarefa(codigoTarefa);

  // Reaproveita a validação usando o título que a tarefa já possui
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}



cadastrarTarefa("Estudar JavaScript", 1);
cadastrarTarefa("Fazer exercícios da aula", 2);
cadastrarTarefa("Revisar arrays e objetos", 3);


console.log(listarTarefas());

concluirTarefa(1);

alterarPrioridade(3, 1);

console.log(listarTarefas());

// cadastrarTarefa("Ler", 1);               // Erro: título menor que 5 caracteres
// cadastrarTarefa("Arrumar o quarto", 5);  // Erro: prioridade fora de 1 a 3
// concluirTarefa(1);                       // Erro: tarefa já estava concluída
// alterarPrioridade(99, 2);                // Erro: código não encontrado
// alterarPrioridade(2, 0);                 // Erro: prioridade inválida
