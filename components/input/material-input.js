import Material, {drawRipple, pointerOffset} from '../../script/Material.js';
import MaterialIcon from '../icon/material-icon.js';

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
    mount(content) {
      this;
      const root = content.querySelector('div.root');
      setIcon(this.icon, root);
    }

  /** */
    static get observedAttributes() {
      return ['value', 'placeholder', 'icon', 'right'];
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {
      const content = this.shadowRoot;
      const root =  content.querySelector('div.root');
      if (!root) return; // !
      const input = root   .querySelector('input');
      switch (attribute) {
        case 'value':
        case 'placeholder':
          current
            ? input[attribute] = current
            : input[attribute] = '';
          break;
        case 'icon':
          setIcon(current, root);
          break;

      }
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
    get icon() {
      return this.getAttribute('icon');
    }

  /** */
    set icon(value) {
      value
        ? this.setAttribute('icon', value)
        : this.removeAttribute('icon');
    }
  }

Material.define(component, MaterialInput);

// #region [Private]
  /** */
    function setIcon(icon, root) {
      if (!root) return;
      if (!icon) return root.style.backgroundImage = 'none';
      icon = MaterialIcon.src(icon);
      root.style.backgroundImage = `url(${icon})`;
    }
// #endregion
