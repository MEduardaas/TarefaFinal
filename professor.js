const formCadastroAlunos = document.getElementById('formCadastroAlunos')

async function cadastrarAluno(e) {
  e.preventDefault()
  let cpf = document.getElementById('cpf').value
  let nome = document.getElementById('nome').value
  let turma = document.getElementById('turma').value
  let ra = document.getElementById('ra').value
  let anoEscolar = document.getElementById('ano_escolar').value

  if (ra.length !== 7) {
    console.log('RA deve ter 7 caracteres.')
    return
  }

  if (isNaN(ra)) {
    console.log('RA deve ser numérico.')
    return
  }

  const senhaGerada = gerarSenha()
  document.getElementById('newSenha').innerText += senhaGerada
  const senhaHash = await hashPassword(senhaGerada)
  localStorage.setItem(
    ra,
    JSON.stringify({ cpf, nome, turma, ra, anoEscolar, password: senhaHash })
  )
  console.log('Aluno cadastrado com sucesso:', {
    cpf,
    nome,
    turma,
    ra,
    anoEscolar,
    password: senhaHash
  })
}

async function hashPassword(str) {
  const enc = new TextEncoder()
  const data = enc.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

function gerarSenha() {
  const senha = Math.random().toString(36).slice(-8)
  console.log('Senha gerada: ' + senha)
  return senha
}

formCadastroAlunos.addEventListener('submit', cadastrarAluno)
