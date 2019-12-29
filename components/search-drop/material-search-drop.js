import Material from '../../script/Material.js'

import '../search/material-search.js';
import '../drop/material-drop.js';
import '../drop-root/material-drop-root.js';
import '../list/material-list.js';
import '../list-item/material-list-item.js';

const component = Material.meta(import.meta.url, 'material-search-drop');
/**
  *
  */
  export default class MaterialSearchDrop extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** */
    mount(content) {
      // console.log(shadow.querySelectorAll('*'));
      const input = content.querySelector('material-search');
      // console.log(input);
      // console.log(shadow, input, attribute, previous, current);
      // if (!input) return; //
      input.innerHTML = this.label;

      this.addEventListener('click-ListItem', event => {
        const text = event.target.innerText;
        input.value = text;
      });

      setRight(this.right, this);
      // setValue(this.value, this);
    }

  /** */
    static get observedAttributes() {
      return ['label', 'right'];
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      switch (name) {
        case 'label': setLabel(current, this); break;
        case 'right': setRight(current, this); break;
        // case 'value': setValue(current, this); break;
      }
    }

  /** */
    get label() {
      return this.getAttribute('label');
    }

  /** */
    set label(value) {
      value
        ? this.setAttribute('label', value)
        : this.removeAttribute('label');
    }

  /** */
    get right() {
      return this.hasAttribute('right');
    }

  /** */
    set right(value) {
      value
        ? this.setAttribute('right', '')
        : this.removeAttribute('right');
    }

  /** Является ли узел элементом {MaterialSearchDrop} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialSearchDrop
    */
    static is(node) {
      return Material.is(node, MaterialSearchDrop);
    }
  }

Material.define(component, MaterialSearchDrop);

// #region [Private]
  /** */
    function setRight(value, host) {
      const content = host.shadowRoot;
      if (!content) return; // !
      const input = content.querySelector('material-search');
      if (!input) return;
      if (!value) {
        // host.removeAttribute('right');
        input.removeAttribute('right');
        return;
      }
      // host.setAttribute('right', '');
      input.setAttribute('right', '');
    }

  /** */
    function setLabel(value, host) {
      const content = host.shadowRoot;
      if (!content) return; // !
      const input = content.querySelector('material-search');
      if (!input) return; //
      input.innerHTML = current;
    }
// #endregion
