import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-keyboard');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Клавиатура @class
  * @description Набор строк кнопок и других элементов для совершения действий
  */
  export default class MaterialKeyboard extends Material {
  /** Создание компонента {MaterialKeyboard} @constructor
    *
    */
    constructor() {
      super(component);
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} root ShadowRoot узел элемента
    * @return {MaterialKeyboard} @this
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

  /** Является ли узел элементом {MaterialKeyboard} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialKeyboard
    */
    static is(node) {
      return Material.is(node, MaterialKeyboard);
    }
  }

Material.attributes(MaterialKeyboard);
// Material.properties(MaterialKeyboard);
Material.define(component, MaterialKeyboard);
