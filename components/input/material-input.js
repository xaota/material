import Material, {drawRipple, pointerOffset} from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-input');
/** @class MaterialInput @extends {Material}
  */
  export default class MaterialInput extends Material {
  /**
    *
    */
    constructor() {
      super(component, 'closed');
    }

  /**
    *
    */
    ready(content) {
      this;
      const root = content.querySelector('div.root');
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        root.style.setProperty('--position', position.x + 'px');
        drawRipple.call(root, position);
      });
      const input = content.querySelector('div.root > input');
      input.addEventListener('blur', _ => {
        root.style.setProperty('--position', '50%');
      });
    }

  /** */
    static get observedAttributes() {
      return ['value', 'placeholder'];
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {
      const shadow = this.shadowRoot;
      // console.log('content', content);
      // const input = $('div.root > input', content);
      const input = shadow.querySelector('div.root > input');
      // console.log(shadow, input, attribute, previous, current)
      current
        ? input[attribute] = current
        : input[attribute] = '';
    }

  /** */
    get value() {
      return this.getAttribute('value');
    }

  /** */
    set value(value = '') {
      value
        ? this.setAttribute('value', value)
        : this.removeAttribute('value');
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
  }

Material.define(component, MaterialInput);

// #region [Private]

// #endregion
