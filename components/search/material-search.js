import Material from '../../script/Material.js'
import MaterialInput from '../input/material-input.js';

const component = Material.meta(import.meta.url, 'material-search');
/**
  *
  */
  export default class MaterialSearch extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** */
    mount() {
      setRight(this.right, this);
      setValue(this.value, this);
    }

  /** */
    static get observedAttributes() {
      return ['right', 'value'];
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {
      switch (attribute) {
        case 'right': setRight(current, this); break;
        case 'value': setValue(current, this); break;
      }
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

  /** */
    get fold() {
      return this.hasAttribute('fold');
    }

  /** */
    set fold(value) {
      value
        ? this.setAttribute('fold', '')
        : this.removeAttribute('fold');
    }

  /** */
    get value() {
      return this.getAttribute('value') || '';
    }

  /** */
    set value(value) {
      value
        ? this.setAttribute('value', value)
        : this.removeAttribute('value');
    }
  }

Material.define(component, MaterialSearch);

// #region [Private]
  /** */
    function setRight(value, host) {
      const content = host.shadowRoot;
      if (!content) return; // !
      const input = content.querySelector('material-input');
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
    function setValue(value, host) {
      const content = host.shadowRoot;
      if (!content) return; // !
      const input = content.querySelector('material-input');
      if (!input) return;
      input.value = value; // ?
    }
// #endregion
