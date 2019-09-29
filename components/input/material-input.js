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
    * @param {string} label название поля
    */
    constructor(label) {
      super(component, 'closed');
      if (label) this.innerHTML = label;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return [...Object.keys(updateAttribute), 'right', 'disabled'];
    }

  /** Создание элемента в DOM (DOM не доступен) / ready @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialInput} @this
    */
    ready(node) {
      const root = node.querySelector('div.root');
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        root.style.setProperty('--position', position.x + 'px');
        drawRipple.call(root, position);
      });
      const input = node.querySelector('div.root > input');
      input.addEventListener('blur', _ => {
        root.style.setProperty('--position', '50%');
      });
      return this;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialInput} @this
    */
    mount(node) {
      const root  = node.querySelector('div.root');
      const input = node.querySelector('input');
      super.mount(root, updateAttribute);
      // Object
      //   .keys(updateAttribute)
        // .filter(attribute => attribute in updateAttribute)
        // .forEach(attribute => updateAttribute[attribute](root, this[attribute]));

      input.addEventListener('input', _ => this.value = input.value);
      this.addEventListener('focus', _ => input.focus());
      return this;
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && name in updateAttribute) updateAttribute[name].call(this, root, current);
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
