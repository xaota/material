import Material from '../../script/Material.js';

import '../input/material-input.js';
import '../drop/material-drop.js';
import '../drop-root/material-drop-root.js';
import '../list/material-list.js';
import MaterialListItem from '../list-item/material-list-item.js';

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
      const list  = content.querySelector('material-list');
      // console.log(input);
      // console.log(shadow, input, attribute, previous, current);
      // if (!input) return; //
      input.innerHTML = this.label;

      list.addEventListener('click', event => {
        const path = event.composedPath();
        const item = path
          .slice(0, path.indexOf(list))
          .filter(e => MaterialListItem.is(e))
          .reverse()[0];
        if (!item) return;
        const text = item.innerText;

        input.value = text;
        this.setAttribute('value', item.value || text);
        this.event('change');
      });
    }

  /** */
    static get observedAttributes() {
      return ['label'];
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      if (name !== 'label') return;
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

  /** */
    get value() {
      return this.getAttribute('value');
    }

  /** */
    get text() {
      const node = this.shadowRoot;
      const input = node.querySelector('material-input');
      return input.value;
    }

  /** */
    select(value) {
      const node = this.shadowRoot;
      const slot  = node.querySelector('slot');
      if (!slot) return;
      const list = [...slot.assignedNodes()];
      const item = list.find(e => e.value === value);
      if (!item) return;
      item.click();
    }

  /** */
    // set value(value = '') {
    //   value
    //     ? this.setAttribute('value', value)
    //     : this.removeAttribute('value');
    // }

  /** Является ли узел элементом {MaterialSelect} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialSelect
    */
    static is(node) {
      return Material.is(node, MaterialSelect);
    }
  }

Material.define(component, MaterialSelect);

// #region [Private]

// #endregion
