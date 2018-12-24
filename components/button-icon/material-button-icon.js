import Material from '../../script/Material.js';
import '/material/components/icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-button-icon');

/** {MaterialButtonIcon} Кнопка-иконка @class @extends {Material}
  */
  export default class MaterialButtonIcon extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'closed');
    }

    mount(content) {
      update(content, this.text);
    }

    static get observedAttributes() {
      return ['text'];
    }

    attributeChangedCallback(name, previous, current) {
      if (name === 'text') update(this.shadowRoot, current);
    }

    /** */
      get text() {
        return this.getAttribute("text");
      }

    /** */
      set text(value) {
        value == null
          ? this.removeAttribute("text")
          : this.setAttribute("text", value);
      }
  }

Material.define(component, MaterialButtonIcon);

// #region [Private]
  function update(content, text) {
    const button = content.querySelector('material-button');
    if (!button) return;
    text == null
      ? button.removeAttribute('text')
      : button.setAttribute('text', text);
  }
// #endregion
