import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-slider');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Галерея @class
  * @description Слайдер для переключения каких-либо элементов, например, изображений
  */
  export default class MaterialSlider extends Material {
  /** Создание компонента {MaterialSlider} @constructor
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
    * @return {MaterialSlider} @this
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

  /** Является ли узел элементом {MaterialSlider} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialSlider
    */
    static is(node) {
      return Material.is(node, MaterialSlider);
    }
  }

Material.attributes(MaterialSlider);
// Material.properties(MaterialSlider);
Material.define(component, MaterialSlider);
