import { PUBLISHABLE_KEY, API_URL } from "../js/dados.js";

        const produtoForm = document.querySelector('#produtoForm');
        const produtoId = document.querySelector('#produtoId');
        const produtoNome = document.querySelector('#produtoNome');
        const produtoDesc = document.querySelector('#produtoDesc');
        const produtoPorcao = document.querySelector('#produtoPorcao');
        const produtoPreco = document.querySelector('#produtoPreco');
        const submitBtn = document.querySelector('#submitBtn');
        const produtosContainer = document.querySelector('#produtosContainer');
        const mensagem = document.querySelector('#mensagem');

        produtoForm.addEventListener('submit', updatedProduto);

        //Json com os dados do servidor será armazenado nesta variável
        let localProdutos = [];

        // 1. READ - Buscar as produtos *********
        async function buscarProdutos() {
            try {
                const response = await fetch(`${API_URL}`, {
                    headers: {
                        apikey: PUBLISHABLE_KEY
                    }
                });
                localProdutos = await response.json();
                renderProdutos();
            } catch (error) {
                produtosContainer.innerHTML = 'Erro ao carregar os dados.';
            }
        }

        // Renderizar os elementos na tela
        function renderProdutos() {
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
                            <button class="btn-edit" onclick="prepararEdit(${produto.id})">Editar</button>
                        </div>
                    </div>
                `;
            });
        }


        // Preenche o formulário com os dados da produto selecionada para edição
       window.prepararEdit =  async function (id) {
            const produto = localProdutos.find(n => n.id === id);
            if (produto) {
                produtoForm.classList.remove('oculto');
                produtosContainer.classList.add('oculto');
                mensagem.innerHTML = 'Informe os dados que serão alterados';

                produtoId.value = produto.id;
                produtoNome.value = produto.nome;
                produtoDesc.value = produto.desc;
                produtoPorcao.value = produto.porcao;
                produtoPreco.value = produto.preco;
            }
        }

        // 3. UPDATE - Função que envia o PUT para a API *********
        async function updatedProduto(e) {
            e.preventDefault(); // Impede o HTML de recarregar a página inteira
            
            const id = produtoId.value;
            const produtoData = {
                nome: produtoNome.value,
                desc: produtoDesc.value,
                porcao: produtoPorcao.value,
                preco: produtoPreco.value
            };

            try {
                const url = new URL(`${API_URL}`)
                url.searchParams.set('id', `eq.${id}`)
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {    
                    apikey: PUBLISHABLE_KEY,
                    'Content-Type': 'application/json',  
                    Prefer:'return=representation'
            },
                    body: JSON.stringify(produtoData)
                });
                const updatedProduto = await response.json();
                
                produtoForm.classList.add('oculto');
                produtosContainer.classList.remove('oculto');
                mensagem.innerHTML = `Produto alterado com sucesso!<br>
                                    Escolha outro produto para editar.`;
                buscarProdutos(); // Atualiza a lista de notícias após a alteração
            } catch (error) {
                console.error('Erro ao alterar produto:', error);
            }
        }

        buscarProdutos(); // Carrega as notícias ao iniciar a página