    import { PUBLISHABLE_KEY, API_URL } from "../js/dados.js";
        
    const produtoForm = document.querySelector('#produtoForm');
    const produtoNome = document.querySelector('#produtoNome');
    const produtoDesc = document.querySelector('#produtoDesc');
    const produtoPorcao = document.querySelector('#produtoPorcao');
    const produtoPreco = document.querySelector('#produtoPreco');
    const mensagem = document.querySelector('#mensagem');
    
    //Ouvintes de eventos
    produtoForm.addEventListener('submit', criarProduto);
    
    async function criarProduto(e) {
        e.preventDefault(); 

        const produtoData = {
            nome: produtoNome.value,
            desc: produtoDesc.value,
            porcao: produtoPorcao.value,
            preco: produtoPreco.value
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                apikey: PUBLISHABLE_KEY,
                'Content-Type': 'application/json',
                Prefer: 'return=representation'
                },
                body: JSON.stringify(produtoData)
            });
            const newProduto = await response.json();
            mensagem.innerHTML = `Produto criado com sucesso!  <br>
                            Preencha o formulário novamente para criar outro produto.`;
            produtoForm.reset();
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        }
    }