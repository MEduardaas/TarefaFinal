// Função para gerar senha aleatória
function gerarSenha() {
  const senha = Math.random().toString(36).slice(-8);
  console.log('Senha gerada: ' + senha);
  return senha;
}

// Função para gerar hash da senha
async function hashPassword(str) {
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Função para cadastrar aluno
async function cadastrarAluno(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const ra = document.getElementById('ra').value;
  const turma = document.getElementById('turma').value;
  const anoEscolar = document.getElementById('ano_escolar').value;

  if (!nome || !cpf || !ra || !turma || !anoEscolar) {
    alert('Preencha todos os campos!');
    return;
  }

  if (ra.length !== 7) {
    alert('RA deve ter 7 caracteres.');
    return;
  }

  if (isNaN(ra)) {
    alert('RA deve ser numérico.');
    return;
  }

  // Verifica se já existe aluno com o mesmo CPF ou RA
  let alunos = [];
  for (let i = 0; i < localStorage.length; i++) {
    try {
      const aluno = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (aluno && aluno.cpf && aluno.ra) {
        alunos.push(aluno);
      }
    } catch {}
  }
  if (alunos.some(aluno => aluno.cpf === cpf)) {
    alert('CPF existente');
    return;
  }
  if (alunos.some(aluno => aluno.ra === ra)) {
    alert('RA existente');
    return;
  }

  const senhaGerada = gerarSenha();
  document.getElementById('newSenha').innerText = 'Nova Senha: ' + senhaGerada;
  const senhaHash = await hashPassword(senhaGerada);

  const novoAluno = { nome, cpf, ra, turma, anoEscolar, password: senhaHash };
  localStorage.setItem(ra, JSON.stringify(novoAluno));

  alert('Aluno cadastrado com sucesso!');
  event.target.reset();
  listarAlunos();
}

// Função para listar alunos
function listarAlunos(filtroCpf = null) {
  const tbody = document.querySelector('#listarAlunos tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  let alunos = [];
  for (let i = 0; i < localStorage.length; i++) {
    try {
      const aluno = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (aluno && aluno.cpf && aluno.ra) {
        alunos.push(aluno);
      }
    } catch {}
  }
  alunos
    .filter(aluno => (filtroCpf ? aluno.cpf === filtroCpf : true))
    .forEach(aluno => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${aluno.cpf}</td>
        <td>${aluno.nome}</td>
        <td>${aluno.ra}</td>
        <td>${aluno.turma}</td>
        <td>${aluno.anoEscolar}</td>
        <td><button onclick="removerAluno('${aluno.ra}')">Excluir</button></td>
      `;
      tbody.appendChild(tr);
    });
}

// Função para remover aluno
function removerAluno(ra) {
  localStorage.removeItem(ra);
  listarAlunos();
}

// Função para buscar aluno por CPF
function buscarAluno(event) {
  event.preventDefault();
  const cpf = document.getElementById('buscar-cpf').value;
  let alunos = [];
  for (let i = 0; i < localStorage.length; i++) {
    try {
      const aluno = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (aluno && aluno.cpf && aluno.ra) {
        alunos.push(aluno);
      }
    } catch {}
  }
  const aluno = alunos.find(a => a.cpf === cpf);
  if (!aluno) {
    alert('Aluno não encontrado!');
    return;
  }
  listarBuscas(aluno);
}

// Função para listar buscas
function listarBuscas(aluno) {
  const historico = document.getElementById('historico-buscas');
  if (!historico) return;
  historico.innerHTML = '';
  const li = document.createElement('li');
  li.textContent = `Nome: ${aluno.nome} | RA: ${aluno.ra} | CPF: ${aluno.cpf} | Turma: ${aluno.turma} | Ano: ${aluno.anoEscolar}`;
  historico.appendChild(li);
}

// Adiciona eventos aos formulários
document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('formCadastroAlunos');
  const forms = document.querySelectorAll('form');
  let formBusca = null;
  if (forms.length > 1) formBusca = forms[1];
  if (formCadastro) formCadastro.addEventListener('submit', cadastrarAluno);
  if (formBusca) formBusca.addEventListener('submit', buscarAluno);
  listarAlunos();
});
