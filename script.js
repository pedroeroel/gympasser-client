async function verificarAcesso() {
    const cpf = document.getElementById('cpf').value;
    const mensagem = document.getElementById('mensagem');

    if (cpf.length !== 11) {
      mensagem.textContent = 'CPF deve conter 11 números.';
      mensagem.style.color = 'red';
      return;
    }

    try {
      const resposta = await fetch(`https://sua-api.com/catraca?cpf=${cpf}`);
      const dados = await resposta.json();

      if (dados.status === 'ativo') {
        mensagem.textContent = 'Acesso Liberado!';
        mensagem.style.color = 'green';
      } else {
        mensagem.textContent = 'Procure a secretaria da academia.';
        mensagem.style.color = 'red';
      }
    } catch (error) {
      mensagem.textContent = 'Erro ao conectar com o servidor.';
      mensagem.style.color = 'red';
    }
  }