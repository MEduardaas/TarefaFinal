let professores = [
  { username: 'prof1@NovaGenesis.edu.br', password: 'pass1' },
  { username: 'prof2@NovaGenesis.edu.br', password: 'pass2' }
]

// hashSHA-256 para uso consistente entre cadastro e login
async function hashPassword(str) {
  const enc = new TextEncoder()
  const data = enc.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

const formLogin = document.getElementById('loginForm')

async function login(e) {
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

  let hashedPassword = await hashPassword(password)

  // Recupera e valida o objeto do localStorage
  let alunoJson = localStorage.getItem(username)
  let aluno = alunoJson ? JSON.parse(alunoJson) : null

  if (aluno && aluno.password === hashedPassword) {
    console.log('Login bem-sucedido como aluno!')
    window.location.href = 'Aluno.html'
  } else {
    console.log('Credenciais inválidas. Tente novamente.')
  }
}

formLogin.addEventListener('submit', login)
