import { html, css, LitElement } from "lit";

export class InputComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      #entrada {
        padding: 8px 5px;
        border: none;
        border-bottom: dotted;
        width: 95%;
      }
    `;
  }
  static get properties() {
    return {
      entrada: { type: String },
    };
  }

  constructor() {
    super();
    this.entrada = "";
  }

  render() {
    return html`
      <input
        id="entrada"
        type="text"
        placeholder="Enter your wish here"
        @keydown="${this.enviar}"
      />
    `;
  }

  enviar(e) {
    if (e.key === "Enter") {
      this.entrada = e.target.value;
      this.dispatchEvent(
        new CustomEvent("entrada", {
          detail: this.entrada,
        })
      );
      e.target.value = "";
    }
  }
}
