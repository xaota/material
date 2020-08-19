import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-keyboard-line');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Клавиатура @class
  * @description Набор строк кнопок и других элементов для совершения действий
  */
  export default class MaterialKeyboardLine extends Material {
  /** Создание компонента {MaterialKeyboardLine} @constructor
    * @param {array} items список элементов клавиатуры
    */
    constructor(...items) {
      super(component);
      if (items.length) items.forEach(item => this.appendChild(item));
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} root ShadowRoot узел элемента
    * @return {MaterialKeyboardLine} @this
    */
    mount(root) {
      return super.mount(root, updateAttribute);
    }

  /** Обновление отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name     Название атрибута
    * @param {string} previous Предыдущее значение ?null
    * @param {string} current  Устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialKeyboardLine} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialKeyboardLine
    */
    static is(node) {
      return Material.is(node, MaterialKeyboardLine);
    }
  }

Material.attributes(MaterialKeyboardLine);
// Material.properties(MaterialKeyboardLine);
Material.define(component, MaterialKeyboardLine);
