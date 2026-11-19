import { PUBLISHABLE_KEY, API_URL } from "../js/dados.js";

const produtosContainer = document.querySelector('#produtosContainer');
const mensagem = document.querySelector('#mensagem');

//Json com os dados do servidor será armazenado nesta variável
let localProdutos = [];


// READ - Buscar as produtos *********
async function buscarProdutos() {
    try {
        const response = await fetch(`${API_URL}`, {
            headers: {
                apikey: PUBLISHABLE_KEY
            }
        });
        localProdutos = await response.json();
        renderprodutos();
    } catch (error) {
        produtosContainer.innerHTML = 'Erro ao carregar os dados.';
    }
}

// Renderizar os elementos na tela
function renderprodutos() {
    if (localProdutos.length === 0) {
        produtosContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
        return;
    }

    produtosContainer.innerHTML = '';
    localProdutos.forEach(produto => {
        produtosContainer.innerHTML += `
            <div class="produto-card" id="produto-${produto.id}">
                        <h3>${produto.nome}</h3>
                        <p><strong>Contém:</strong> ${produto.desc}</p> 
                        <p><strong>Porção:</strong> ${produto.porcao}</p> 
                        <p><strong>Preço:</strong> ${produto.preco}</p> 
                <div class="actions">
                    <button class="btn-delete" onclick="deletarProduto(${produto.id})">Deletar</button>
                </div>
            </div>
        `;
    });
}

//  DELETE - Função que envia o DELETE para a API *********
window.deletarProduto= async function(id) {

    if (!confirm('Deseja realmente excluir este produto?')) return;

    try {
        const url = new URL(`${API_URL}`)
url.searchParams.set('id', `eq.${id}`)
        let resposta = await fetch(url, {
            headers: {
                apikey: PUBLISHABLE_KEY
            },
            method: 'DELETE'
        });
       mensagem.innerHTML = `Produto excluído com sucesso! <br>
                            Escolha outro produto para excluir.`;       
       buscarProdutos(); // Atualiza a lista de produtos após a exclusão   
                        } catch (error) {
        console.error('Erro ao excluir produto:', error);
    }
}
buscarProdutos(); // Carrega as produtos ao iniciar a página    