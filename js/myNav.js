class MyNav extends HTMLElement {

  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
    <nav>

      <style>
          nav{
            display: flex;
            justify-content: center; /* Mantém os botões centralizados */
            flex-wrap: wrap;         /* Quebra linha em telas menores */
            gap: 10px;               /* Aumente ou diminua esse valor como preferir */
          }

          nav a{
          text-decoration: none;
          border: 1px solid rgb(30, 0, 72);
          color: rgb(62, 3, 118);
          background-color: rgb(255, 255, 255);
          border-radius: 20px;
          padding: 5px;
          
        }

        nav a:hover{
          color: rgba(188, 117, 255, 0.89);
        }
      </style>

      <a id="cons" href="./index.html"><b>Consulte o Produto</b></a>
      <a id="criar" href="./index1.html"><b>Criar Produto</b></a>
      <a id="alt" href="./index2.html"><b>Alterar Produto</b></a>
      <a id="exc" href="./index3.html"><b>Excluir Produto</b></a>
    </nav>
    `;
  }   
}
customElements.define('my-nav', MyNav);
export default MyNav;