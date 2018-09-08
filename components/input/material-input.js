import Material, {$, drawRipple, pointerOffset} from '../../script/Material.js';
const element = 'material-input';

/**
 *
 *
 * @class MaterialInput
 * @extends {Material}
 */
  class MaterialInput extends Material {
  /**
    *
    */
    constructor() {
      super(element, 'closed');
    }

  /**
    *
    */
    init() {
      const content = this.content;
      const root = $('div.root', content);
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        root.style.setProperty('--position', position.x + 'px');
        drawRipple.call(root, position);
      });
      const input = $('div.root > input', content);
      input.addEventListener('blur', event => {
        root.style.setProperty('--position', '50%');
      });
    }

  /** */
    static get observedAttributes() {
      return ['value', 'placeholder'];
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {
      const shadow = this.shadow;
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

customElements.define(element, MaterialInput);

// #region [Private]

// #endregion
