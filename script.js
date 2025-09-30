let professores = [
  { username: 'prof1@NovaGenesis.edu.br', password: 'pass1' },
  { username: 'prof2@NovaGenesis.edu.br', password: 'pass2' }
]

let alunos = [
  {
    cpf: '1234567',
    nome: 'Aluno1',
    turma: 'A',
    ra: '7654321',
    anoEscolar: '1° Ano',
    password: 'aluno1pass'
  }
]

const form = document.getElementById('loginForm')

function cadastrarAluno() {
  let cpf = document.getElementById('newCpf').value
  let nome = document.getElementById('newNome').value
  let turma = document.getElementById('newTurma').value
  let ra = document.getElementById('newRa').value
  let anoEscolar = document.getElementById('newAnoEscolar').value

  if (ra.length !== 7) {
    console.log('RA deve ter 7 caracteres.')
    return
  }

  if (isNaN(ra)) {
    console.log('RA deve ser numérico.')
    return
  }

  let senha = document.getElementById('newSenha')
  senha.innerText = gerarSenha()
  alunos.push({ cpf, nome, turma, ra, anoEscolar, password: senha.value })
  console.log('Aluno cadastrado com sucesso:', {
    cpf,
    nome,
    turma,
    ra,
    anoEscolar,
    password: senha.value
  })
}

function gerarSenha() {
  let senha = Math.random().toString(36).slice(-8)
  document.getElementById('newSenha').value = senha
  console.log('Senha gerada: ' + senha)
  return senha
}

function login(e) {
  e.preventDefault()
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  let user = professores.find(
    u => u.username === username && u.password === password
  )

  if (user) {
    console.log('Login bem-sucedido como professor!')
    window.location.href = 'Professor.html'
    return
  }

  user = alunos.find(u => u.ra === username && u.password === password)
  if (user) {
    console.log('Login bem-sucedido como aluno!')
    window.location.href = 'Aluno.html'
  } else {
    console.log('Credenciais inválidas. Tente novamente.')
  }
}

form.addEventListener('submit', login)
