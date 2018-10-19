
import Material, {drawRipple, pointerOffset} from '../../script/Material.js';
import MaterialButton from '../button/material-button.js';
import MaterialIcon from '../icon/material-icon.js';
import MaterialInput from '../input/material-input.js';

const component = Material.meta(import.meta.url, 'material-input-count');
/** @class MaterialInput @extends {Material}
  */
  export default class MaterialInputCount extends Material { // MaterialInput?
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** */
    mount(content) {
      const {append, remove} = elements(content);
      append.addEventListener('click', _ => this.value += this.step);
      remove.addEventListener('click', _ => this.value -= this.step);
    }

  /** */
    static get observedAttributes() {
      return ['value', 'placeholder', 'min', 'max', 'step'];
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {
      const content = this.shadowRoot;
      const {input} = elements(content);
      switch (attribute) {
        case 'placeholder': input.placeholder = this.placeholder; break;
      }
    }

  /** */
    get value() {
      return parseInt(this.getAttribute('value')) || this.min;
    }

  /** */
    set value(value = '') {
      if (value === '') return this.removeAttribute('value');
      const content = this.shadowRoot;
      const current = this.value;
      const {input} = elements(content);
      value = parseValue(value, current, this.max, this.min);
      if (value === current) return;
      input.setAttribute('value', value);
      this.setAttribute('value', value);
      // event('change')
    }

  /** */
    get placeholder() {
      return this.getAttribute('placeholder');
    }

  /** */
    set placeholder(value = '') {
      value
        ? this.setAttribute('placeholder', value)
        : this.removeAttribute('placeholder');
    }

  /** */
    get min() {
      return parseInt(this.getAttribute('min')) || 0;
    }

  /** */
    set min(value = '') {
      value
        ? this.setAttribute('min', value)
        : this.removeAttribute('min');
    }

  /** */
    get max() {
      return parseInt(this.getAttribute('max')) || 0;
    }

  /** */
    set max(value = '') {
      value
        ? this.setAttribute('max', value)
        : this.removeAttribute('max');
    }

  /** */
    get step() {
      return parseInt(this.getAttribute('step')) || 1;
    }

  /** */
    set step(value = '') {
      value
        ? this.setAttribute('step', value)
        : this.removeAttribute('step');
    }
  }

Material.define(component, MaterialInputCount);

// #region [Private]
  /** */
    function elements(content) {
      const append = content.querySelector('#append');
      const remove = content.querySelector('#remove');
      const input  = content.querySelector('material-input');
      return {append, remove, input};
    }

  /** */
    function parseValue(value, current, max, min) {
      value = parseInt(value);
      if (isNaN(value)) return current;
      if (value > max) return current;
      if (value < min) return current;
      return value;
    }
// #endregion
