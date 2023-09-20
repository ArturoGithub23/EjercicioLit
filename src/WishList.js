import { html, css, LitElement } from "lit";

export class WishList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--wish-list-text-color, #000);
      margin: auto;
    }
    h1 {
      margin: 0 0 20px 0;
    }
    .main {
      border: 1px solid blue;
      width: 250px;
      height: 300px;
      padding: 5px 20px;
    }
    fieldset {
      padding: 0;
      border: none;
    }
    .lista {
      margin-top: 5px;
      height: 130px;
      overflow: scroll;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    #checkbox {
      margin-right: 15px;
      transform: scale(1.3);
    }
    .chequed {
      text-decoration: line-through;
    }
  `;

  static get properties() {
    return {
      lista: { type: Array },
    };
  }

  constructor() {
    super();
    this.lista = [];
    this.minutos = [];
    this.labels = [];
  }

  get allLabels() {
    return this.shadowRoot.querySelectorAll("label");
  }

  get allCheckbox() {
    return this.shadowRoot.querySelectorAll("#checkbox");
  }

  addToList(e) {
    this.update();
    let entrada = e.detail;
    this.lista.push(entrada);
    console.log(this.lista);
    this.update();
    this.labels = this.allLabels;
  }

  ponerCheck(evento, indice) {
    console.log(evento);
    const checkBox = evento.target;
    if (!checkBox.checked) {
      this.labels[indice].style.textDecoration = "none";
      this.temporizador(indice);
    } else {
      this.labels[indice].style.color = "black";
      this.labels[indice].style.textDecoration = "line-through";
      this.labels[indice].style.background = "none";
      clearTimeout(this.minutos[indice].timeout1);
      clearTimeout(this.minutos[indice].timeout2);
      clearTimeout(this.minutos[indice].timeout3);
    }
  }

  temporizador(indice) {
    if (indice === this.lista.length - 1) {
      this.minutos[indice] = {
        timeout1: setTimeout(() => {
          this.labels[indice].style.background = "green";
        }, 30000), //120000
        timeout2: setTimeout(() => {
          this.labels[indice].style.background = "yellow";
        }, 60000), //300000
        timeout3: setTimeout(() => {
          this.labels[indice].style.background = "red";
          this.labels[indice].style.color = "white";
        }, 90000), //480000
      };
    }
  }

  resetTiempo(indice) {
    console.log(this.minutos[indice]);
  }

  eliminarMarcados() {
    let checkBox = this.allCheckbox;
    checkBox.forEach((check, indice) => {
      this.labels = this.allLabels;
      if (check.checked) {
        check.parentNode.removeChild(check);
        this.lista.splice(indice, 1);
        this.labels[indice].parentNode.removeChild(this.labels[indice]);
      }
    });
    console.log(this.lista);
  }

  render() {
    console.log("Render");
    var listaRender = [];
    this.lista.forEach((tarea, indice) => {
      console.log(tarea);
      listaRender.push(html`<li>
        <input
          id="checkbox"
          type="checkbox"
          @change="${(evento) => this.ponerCheck(evento, indice)}"
        /><label>${tarea}</label>
      </li>`);
      this.temporizador(indice);
    });
    console.log("lista render", listaRender);
    return html`
      <main class="main">
        <h1>My wishlist</h1>
        <form>
          <fieldset>
            <legend><span>New wish</span></legend>
            <input-component @entrada=${this.addToList}></input-component>
          </fieldset>
          <section class="lista">
            <ul>
              ${listaRender}
            </ul>
          </section>
          <boton-componente
            @click="${this.eliminarMarcados}"
          ></boton-componente>
        </form>
      </main>
    `;
  }
}
