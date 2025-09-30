function salvar(alunos) {
  localStorage.setItem("alunos", JSON.stringify(alunos));
}
function cadastrarAluno(event) {
  //função para salvar aluno
  event.preventDefault(); // evita o reload da página

  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const ra = document.getElementById("ra").value;
  const turma = document.getElementById("turma").value;
  const ano = document.getElementById("ano_escolar").value;

  if (!nome || !cpf || !ra || !turma || !ano) {
    alert("Preencha todos os campos!");
    return;
  }

  let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  //verifica se já existe aluno com o cpf

  if (alunos.some((aluno) => aluno.cpf === cpf)) {
    alert("CPF existente");
    return;
  }
  //criar novo aluno
  const novoAluno = { nome, cpf, ra, turma, ano };
  alunos.push(novoAluno);

  localStorage.setItem("alunos", JSON.stringify(alunos));

  alert("Aluno cadastrado com sucesso");

  event.target.reset(); //limpa formulário

  listarAlunos();
}
function listarAlunos(filtroCpf = null) {
  const tbody = document.querySelector("#listarAlunos tbody");
  tbody.innerHTML = ""; // limpa tabela;

  const alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  alunos
    .filter((aluno) => (filtroCpf ? aluno.cpf === filtroCpf : true))
    .forEach((aluno) => {
      const tr = document.createElement("tr");
      tr.innerHTML = ` <td>${aluno.cpf}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.ra}</td>
        <td>${aluno.turma}</td>
        <td>${aluno.ano}</td>
        
        <td>
        <button onclick="removerAluno($'{aluno.cpf}')">Excluir </button>
        </td>`;
      tbody.appendChild(tr);
    });
}

function listarBuscas(aluno) {
  const historico = document.getElementById("historico-buscas");

  historico.innerHTML = "";

  const li = document.createElement("li");
  li.textContent = `Nome: ${aluno.nome} | RA: ${aluno.ra} | CPF: ${aluno.cpf} | Turma: ${aluno.turma} | Ano: ${aluno.ano}`;
  historico.appendChild(li);

 //localStorage.clear();
}


//fnção para remover aluno
function removerAluno(cpf) {
  let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

  alunos = alunos.filter((aluno) => aluno.cpf !== cpf);

  salvar(alunos);

  listarAlunos();
}
function buscarAluno(event) {
  event.preventDefault();
  const cpf = document.getElementById("buscar-cpf").value;
const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  const aluno = alunos.find(a => a.cpf === cpf);

  if (!aluno) {
    alert("Aluno não encontrado!");
    return;
  }
  
  listarBuscas(aluno); // envia o objeto aluno inteiro

  // localStorage.clear();
}
document.addEventListener("DOMContentLoaded", () => {
  const formas = document.querySelectorAll("form");
  formas[0].addEventListener("submit", cadastrarAluno);
  formas[1].addEventListener("submit", buscarAluno);

  listarAlunos();
});
