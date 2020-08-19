import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-slider-item');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Галерея @class
  * @description Слайдер для переключения каких-либо элементов, например, изображений
  */
  export default class MaterialSliderItem extends Material {
  /** Создание компонента {MaterialSliderItem} @constructor
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
    * @return {MaterialSliderItem} @this
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

  /** Является ли узел элементом {MaterialSliderItem} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialSliderItem
    */
    static is(node) {
      return Material.is(node, MaterialSliderItem);
    }
  }

Material.attributes(MaterialSliderItem);
// Material.properties(MaterialSliderItem);
Material.define(component, MaterialSliderItem);
