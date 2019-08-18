import Material from '../../script/Material.js';
import MaterialIcon from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-rating');

const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
  /** */
  value(root, value) { setValue(root, parseFloat(value)); }
};

/** Рейтинг {MaterialRating} @class
  * Элемент для отображения или изменения оценки чего-либо
  */
  export default class MaterialRating extends Material {
  /** Создание элемента {MaterialRating} @constructor
    */
    constructor() {
      super(component);
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} root ShadowRoot узел элемента
    * @return {MaterialRating} @this
    */
    mount(root) {
      super.mount(root, updateAttribute);
      return this;
    }

  /** Изменение отследживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialRating} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialRating
    */
    static is(node) {
      return Material.is(node, MaterialRating);
    }
  }

Material.attributes(MaterialRating);
// Material.properties(MaterialRating, 'disabled');
Material.define(component, MaterialRating);

// #region [Private]
/** */
  function setValue(root, value) {

  }
// #endregion
