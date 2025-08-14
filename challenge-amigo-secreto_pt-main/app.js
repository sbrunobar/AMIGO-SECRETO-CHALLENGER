let participantes = [];

// Adicionar participante
function adicionarParticipante() {
    const nomeInput = document.getElementById('amigoNome').value.trim();

    if (!nomeInput) {
        alert('Por favor, preencha um nome.');
        return;
    }

    if (participantes.some(p => p.nome === nomeInput)) {
        alert('Nome já cadastrado.');
        return;
    }

    participantes.push({ nome: nomeInput });
    document.getElementById('amigoNome').value = '';
    atualizarLista();
}

// Atualizar lista de participantes
function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    participantes.forEach((p, index) => {
        const li = document.createElement('li');
        li.textContent = p.nome;

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => {
            participantes.splice(index, 1);
            atualizarLista();
        };

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

// Sortear amigos secretos e gerar links autossuficientes
function sortearComLinks() {
    if (participantes.length < 2) {
        alert('É necessário pelo menos 2 participantes.');
        return;
    }

    const disponiveis = [...participantes];
    const sorteioFinal = [];

    participantes.forEach(p => {
        const possiveis = disponiveis.filter(a => a.nome !== p.nome);
        const sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
        sorteioFinal.push({ nome: p.nome, amigo: sorteado.nome });

        const index = disponiveis.findIndex(a => a.nome === sorteado.nome);
        disponiveis.splice(index, 1);
    });

    gerarLinks(sorteioFinal);
}

// Gerar links autossuficientes
function gerarLinks(sorteioFinal) {
    const ul = document.getElementById('listaLinks');
    ul.innerHTML = '';

    sorteioFinal.forEach(p => {
        const li = document.createElement('li');
        const link = document.createElement('a');

        // Passa o nome do amigo secreto no link
        const amigoCodificado = encodeURIComponent(p.amigo);
        link.href = `${window.location.pathname}?amigo=${amigoCodificado}`;
        link.target = '_blank';
        link.textContent = `${p.nome}: clique aqui para ver seu amigo secreto`;

        li.appendChild(link);
        ul.appendChild(li);
    });

    alert('Links gerados! Envie para cada participante.');
}

// Mostrar amigo secreto do link
function mostrarAmigoPorLink() {
    const params = new URLSearchParams(window.location.search);
    const amigo = params.get('amigo');
    if (!amigo) return;

    const resultado = document.getElementById('resultadoAmigo');
    resultado.textContent = `Seu amigo secreto é: ${decodeURIComponent(amigo)} 🎁`;
}

// Executa ao carregar a página
window.onload = mostrarAmigoPorLink;
