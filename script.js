async function verificarAcesso() {
    const cpf = document.getElementById('cpfInput').value;
    const mensagem = document.getElementById('mensagem');

    if (cpf.length !== 11) {
      mensagem.textContent = 'CPF deve conter 11 números.';
      mensagem.style.color = 'red';
      return;
    }
    
    const resposta = await fetch(`https://gympasser-api.vercel.app/user/${cpf}`);
    const data = resposta.json().then(data=>{

    try {
        console.log(data);
    
        if (data.status === 'active') {
          mensagem.textContent = `Bem vindo ${data.user}!`;
          mensagem.style.color = 'green';
        } else {
          mensagem.textContent = 'Procure a secretaria da academia.';
          mensagem.style.color = 'red';
        }
      } catch (error) {
        mensagem.textContent = 'Erro ao conectar com o servidor.';
        mensagem.style.color = 'red';
    }})
  
  }