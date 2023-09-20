import { html, css, LitElement } from "lit";

export class BotonComponente extends LitElement {
  static get styles() {
    return css`
      .btn {
        margin-top: 5px;
        display: block;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html` <button class="btn">Archive Done</button> `;
  }
}
