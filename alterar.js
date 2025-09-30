document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')

  form.addEventListener('submit', event => {
    event.preventDefault() // Evita recarregar a página

    const cpf = document.getElementById('cpf-nota').value.trim()
    const disciplina = document.getElementById('disciplina-nota').value.trim()
    const nota = parseFloat(document.getElementById('nota-nova').value)
    const motivo = document.getElementById('motivo-alteracao').value.trim()

    // Validações
    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/
    if (!cpfRegex.test(cpf)) {
      alert('CPF inválido. Use o formato 000.000.000-00 ou apenas números.')
      return
    }
    if (disciplina.length < 2) {
      alert('Informe uma disciplina válida.')
      return
    }
    if (isNaN(nota) || nota < 0 || nota > 10) {
      alert('A nota deve estar entre 0 e 10.')
      return
    }
    if (motivo.length < 5) {
      alert('Explique melhor o motivo da alteração (mínimo 5 caracteres).')
      return
    }

    // Recupera notas já salvas do localStorage de forma segura
    let notas = []
    try {
      const notasSalvas = localStorage.getItem('notas')
      if (notasSalvas) {
        notas = JSON.parse(notasSalvas)
        if (!Array.isArray(notas)) notas = [] // garante que seja array
      }
    } catch (e) {
      console.error('Erro ao ler localStorage, limpando dados antigos:', e)
      notas = []
      localStorage.removeItem('notas')
    }

    // Verifica se já existe esse aluno+disciplina
    const index = notas.findIndex(
      item =>
        item.cpf === cpf &&
        item.disciplina.toLowerCase() === disciplina.toLowerCase()
    )

    if (index !== -1) {
      // Atualiza nota existente
      notas[index].nota = nota
      notas[index].motivo = motivo
    } else {
      // Cria nova entrada
      notas.push({ cpf, disciplina, nota, motivo })
    }

    // Salva no localStorage de forma segura
    try {
      localStorage.setItem('notas', JSON.stringify(notas))
      alert('Nota salva/alterada com sucesso!')
      console.log('Notas armazenadas:', notas)
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e)
      alert(
        'Erro ao salvar a nota. Verifique se o armazenamento está disponível.'
      )
    }

    form.reset() // limpa o formulário
  })
})
