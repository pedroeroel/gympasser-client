const cpfInput = document.getElementById('cpfInput');
const mensagem = document.getElementById('mensagem');

function digitar(numero) {
  if (cpfInput.value.length < 11) {
    cpfInput.value += numero;
  }
}

function apagar() {
  cpfInput.value = cpfInput.value.slice(0, -1);
}

function limpar() {
  cpfInput.value = '';
}

async function verificarAcesso() {
  const cpf = cpfInput.value;

  if (cpf.length !== 11) {
    mensagem.textContent = 'CPF deve conter 11 números.';
    mensagem.className = 'mt-4 font-semibold text-red-500';
    return;
  }

  try {
    const resposta = await fetch(`https://gympasser-api.vercel.app/user/${cpf}`);
    const data = await resposta.json();

    console.log(data);

    if (data.status === 'active') {
      mensagem.textContent = `Bem vindo ${data.user}!`;
      mensagem.className = 'mt-4 font-semibold text-green-500';
    } else if (data.status === 'inactive') {
      mensagem.textContent = 'CPF bloqueado, procure a secretaria da academia.';
      mensagem.className = 'mt-4 font-semibold text-red-500';
    } else if (data.code >= 400) {
      mensagem.textContent = 'CPF inválido.';
      mensagem.className = 'mt-4 font-semibold text-red-500';  
    }
  } catch (error) {
    mensagem.textContent = 'Erro ao conectar com o servidor.';
    mensagem.className = 'mt-4 font-semibold text-red-500';
  }
}