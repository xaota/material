import Material     from '../../script/Material.js';
import MaterialIcon from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-fab');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Floating Action Button (FAB) @class
  * @description Кнопка, предназначенная для целевого действия на экране приложения
  */
  export default class MaterialFAB extends Material {
  /** Создание компонента {MaterialFAB} @constructor
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
    * @return {MaterialFAB} @this
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

  /** Является ли узел элементом {MaterialFAB} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialFAB
    */
    static is(node) {
      return Material.is(node, MaterialFAB);
    }
  }

Material.attributes(MaterialFAB);
// Material.properties(MaterialFab);
Material.define(component, MaterialFAB);
