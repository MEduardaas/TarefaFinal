const nome = document.getElementById('nome-aluno')
const ra = document.getElementById('ra-aluno')

let alunoLogado = localStorage.getItem('alunoLogado')
if (alunoLogado) {
  let alunoData = JSON.parse(localStorage.getItem(alunoLogado))
  nome.innerText = `Nome: ${alunoData.nome}`
  ra.innerText = `RA: ${alunoData.ra}`
}
