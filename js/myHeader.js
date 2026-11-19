
class MyHeader extends HTMLElement {
  constructor() {
    super(); 
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
    <style>
      header{
        text-align: center;
          font-family: "Momo Signature", cursive;
          font-weight: 400;
          font-style: normal;   
          color: rgb(31, 13, 79);         
      }
    </style>
      <header>
        <h1>
          Felis Kingdom
        </h1>   
      </header>
    `;
  }
}
customElements.define('my-header', MyHeader);

export default MyHeader;