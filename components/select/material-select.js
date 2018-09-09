import Material from '../../script/Material.js';

import '../input/material-input.js';
import '../drop/material-drop.js';
import '../drop-root/material-drop-root.js';
import '../list/material-list.js';
import '../list-item/material-list-item.js';

const component = Material.meta(import.meta.url, 'material-select');
/**
  *
  */
  export default class MaterialSelect extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** */
    mount(content) {
      // console.log(shadow.querySelectorAll('*'));
      const input = content.querySelector('material-input');
      // console.log(input);
      // console.log(shadow, input, attribute, previous, current);
      // if (!input) return; //
      input.innerHTML = this.label;

      this.addEventListener('click-ListItem', event => {
        const text = event.target.innerText;
        // console.log(input, shadow)
        input.value = text;
      });
    }

  /** */
    static get observedAttributes() {
      return ['label'];
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {
      if (attribute !== 'label') return;
      const shadow = this.shadowRoot;
      const input = shadow.querySelector('material-input');
      // console.log(shadow, input, attribute, previous, current);
      if (!input) return; //
      input.innerHTML = current;
    }

  /** */
    get label() {
      return this.getAttribute('label');
    }

  /** */
    set label(value = '') {
      value
        ? this.setAttribute('label', value)
        : this.removeAttribute('label');
    }

  /** Является ли узел элементом {MaterialSelect} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialSelect
    */
    static is(node) {
      return Material.is(node, component);
    }
  }

Material.define(component, MaterialSelect);

// #region [Private]

// #endregion
