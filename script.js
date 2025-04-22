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
    mensagem.classList.remove('opacity-100');
    mensagem.classList.add('opacity-0');
    setTimeout(() => {
        cpfInput.value = '';
        mensagem.textContent = '';
        mensagem.className = 'mt-4 font-semibold opacity-0 transition-opacity duration-300';
    }, 300);
}

async function verificarAcesso() {
    const cpf = cpfInput.value;
    mensagem.className = 'mt-4 font-semibold text-red-500 opacity-0 transition-opacity duration-300';  

    if (cpf.length !== 11) {
      setTimeout(() => {
        mensagem.textContent = 'CPF deve conter 11 números.';
        mensagem.classList.add('opacity-100');
        }, 300);
        return;
    }

    mensagem.classList.remove('opacity-100');
    mensagem.classList.add('opacity-0');

    try {
        const resposta = await fetch(`https://gympasser-api.vercel.app/user/${cpf}`);
        const data = await resposta.json();

        console.log(data);

        setTimeout(() => {
            if (data.status === 'active') {
                mensagem.textContent = `Bem vindo ${data.user}!`;
                mensagem.className = 'mt-4 font-semibold text-green-500 opacity-0 transition-opacity duration-300';
            } else if (data.status === 'inactive') {
                mensagem.textContent = 'CPF bloqueado, procure a secretaria da academia.';
                mensagem.className = 'mt-4 font-semibold text-red-500 opacity-0 transition-opacity duration-300';
            } else {
                mensagem.textContent = 'CPF não encontrado.';
                mensagem.className = 'mt-4 font-semibold text-gray-500 opacity-0 transition-opacity duration-300';
            }
            mensagem.classList.add('opacity-100');
        }, 300);

    } catch (error) {
        setTimeout(() => {
            mensagem.textContent = 'Erro ao conectar com o servidor.';
            mensagem.className = 'mt-4 font-semibold text-red-500 opacity-0 transition-opacity duration-300';
            mensagem.classList.add('opacity-100');
        }, 300);
    }
}