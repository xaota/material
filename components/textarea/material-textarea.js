import Material, {drawRipple, pointerOffset} from '../../script/Material.js';
import MaterialIcon from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-textarea');
const updateAttribute = {
// disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
/** */
        value(root, value) { Material.updateChildrenElement(root, 'textarea', 'value', value) },
/** */
  placeholder(root, value) { Material.updateChildrenElement(root, 'textarea', 'placeholder', value) },
/** */
         icon(root, value) { setIcon(value, root) }
};

/** Область ввода текста @class MaterialTextarea @extends {Material}
  */
  export default class MaterialTextarea extends Material {
  /** Создание элемента
    * @param {string} label название поля
    */
    constructor(label) {
      super(component);
      if (label) this.innerHTML = label;
    }

  /** Создание элемента в DOM (DOM не доступен) / ready @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialTextarea} @this
    */
    ready(node) {
      const root = node.querySelector('div.root');
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        root.style.setProperty('--position', position.x + 'px');
        drawRipple.call(root, position);
      });
      const textarea = node.querySelector('div.root > textarea');
      textarea.addEventListener('blur', _ => {
        root.style.setProperty('--position', '50%');
      });
      return this;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialTextarea} @this
    */
    mount(node) {
      const root     = node.querySelector('div.root');
      const textarea = node.querySelector('textarea');
      super.mount(root, updateAttribute);

      textarea.addEventListener('input', _ => this.value = textarea.value);
      textarea.addEventListener('change', _ => this.event('change'));
      this.addEventListener('focus', _ => textarea.focus());
      return this;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      // return ['value', 'placeholder', 'icon', 'right'];
      return [...Object.keys(updateAttribute), 'right', 'disabled'];
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

  /** Является ли узел элементом {MaterialTextarea} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialTextarea
    */
    static is(node) {
      return Material.is(node, MaterialTextarea);
    }
  }

Material.attributes(MaterialTextarea, ...Object.keys(updateAttribute));
Material.properties(MaterialTextarea, 'right', 'disabled');
Material.define(component, MaterialTextarea);

// #region [Private]
/** */
  function setIcon(icon, root) {
    if (!root || !root.style) return;
    if (!icon) return root.style.backgroundImage = 'none';
    const href = MaterialIcon.src(icon);
    root.style.backgroundImage = `url(${href.toString()})`;
  }
// #endregion
