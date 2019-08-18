import Material, {drawRipple, pointerOffset} from '../../script/Material.js';
import MaterialIcon from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-input');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
  /** */
    value(root, value) { Material.updateChildrenAttribute(root, 'input', 'value', value) },
  /** */
  placeholder(root, value) { Material.updateChildrenAttribute(root, 'input', 'placeholder', value) },
  /** */
    icon(root, value) { setIcon(value, root) }
};

/** Поле ввода текста @class MaterialInput @extends {Material}
  */
  export default class MaterialInput extends Material {
  /** Создание элемента
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
      const root  = content.querySelector('div.root');
      const input = content.querySelector('input');
      super.mount(root, updateAttribute);
      // Object
      //   .keys(updateAttribute)
        // .filter(attribute => attribute in updateAttribute)
        // .forEach(attribute => updateAttribute[attribute](root, this[attribute]));

      input.addEventListener('input', _ => this.value = input.value);
    }

  /** */
    static get observedAttributes() {
      return [...Object.keys(updateAttribute), 'right', 'disabled'];
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && attribute in updateAttribute) updateAttribute[attribute](root, current);
    }

  /** Является ли узел элементом {MaterialInput} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialInput
    */
    static is(node) {
      return Material.is(node, MaterialInput);
    }
  }

Material.attributes(MaterialInput, ...Object.keys(updateAttribute));
Material.properties(MaterialInput, 'right', 'disabled');
Material.define(component, MaterialInput);

// #region [Private]
/** */
  function setIcon(icon, root) {
    if (!root || !root.style) return;
    if (!icon) return root.style.backgroundImage = 'none';
    const href = MaterialIcon.src(icon);
    root.style.backgroundImage = `url(${href.toString()})`;
  }
// #endregion
