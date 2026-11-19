class MyFooter extends HTMLElement {
  
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
    <footer>
          <h5>&copy 2026 Felis Kingdom. </h5> 
      </footer>
    `;    
  }
}      
customElements.define('my-footer', MyFooter);
export default MyFooter;