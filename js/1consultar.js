import { PUBLISHABLE_KEY, API_URL } from "../js/dados.js";

const produtosContainer = document.querySelector('#produtosContainer');

//O Json com os dados do servidor será armazenado nesta variável
let localProdutos = [];

// READ - Buscar as produtos *********
async function buscarProdutos() {
    try {
        const response = await fetch(`${API_URL}`,
            {
                headers: {
                apikey: PUBLISHABLE_KEY,
                Accept: 'application/json'
                }
            }
        );  
        localProdutos = await response.json();
        renderProdutos();
    } catch (error) {
        produtosContainer.innerHTML = 'Erro ao carregar os dados.';
    }
}

// Renderizar os elementos na tela
function renderProdutos() {
    if (localProdutos.length === 0) {
        produtosContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
        return;
    }

    localProdutos.forEach(produto => {
        produtosContainer.innerHTML += `
            <div class="produto-card" id="produto-${produto.id}">
                    <h3>${produto.nome}</h3>
                    <p><strong>Contém:</strong> ${produto.desc}</p> 
                    <p><strong>Porção:</strong> ${produto.porcao}</p> 
                    <p><strong>Preço:</strong> ${produto.preco}</p> 
            </div>
        `;
    });
}
buscarProdutos(); // Carrega as notícias ao iniciar a página