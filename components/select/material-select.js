import Material from '../../script/Material.js'
const element = 'material-select';

/**
  *
  */
  export default class MaterialSelect extends Material {
  /**
    *
    */
    constructor() {
      super(element);
    }

  /**
    *
    */
    init() {
      const content = this.content;
    }

  /** */
    mount() {
      const shadow = this.shadow;
      // console.log(shadow.querySelectorAll('*'));
      const input = shadow.querySelector('material-input');
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
      const shadow = this.shadow;
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
      return Material.is(node, element);
    }
  }

customElements.define(element, MaterialSelect);

// #region [Private]

// #endregion
