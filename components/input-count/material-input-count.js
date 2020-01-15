
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
      const {append, remove, input} = elements(content);
      append.addEventListener('click', _ => this.value += this.step);
      remove.addEventListener('click', _ => this.value -= this.step);
      setValue(input, this.value, this.value, this.max, this.min);

      input.addEventListener('input', _ => this.value = input.value);
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
        case 'value'      : setValue(input, current, this.value, this.max, this.min);
      }
    }

  /** */
    get value() {
      return parseInt(this.getAttribute('value')) || 0;
    }

  /** */
    set value(value) {
      if (isValidValue(value, this.min, this.max)) {
      this.setAttribute('value', value);
      }
    }

  /** */
    get placeholder() {
      return this.getAttribute('placeholder');
    }

  /** */
    set placeholder(value) {
      value
        ? this.setAttribute('placeholder', value)
        : this.removeAttribute('placeholder');
    }

  /** */
    get min() {
      return parseInt(this.getAttribute('min')) || -Infinity;
    }

  /** */
    set min(value = '') {
      value
        ? this.setAttribute('min', value)
        : this.removeAttribute('min');
    }

  /** */
    get max() {
      return parseInt(this.getAttribute('max')) || Infinity;
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

  /** */
    function setValue(input, value, current, max, min) {
      if (!input) return;
      if (!isValidValue(input, min, max)) return;
      value = parseValue(value, current, max, min);
      input.value = value;
    }

  /** */
    function isValidValue(input, min, max) {
      return !(input < min || input > max);
    }
// #endregion
