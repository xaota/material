import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-brick');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Кирпич @class
  * @description Элемент, скрывающий за собой абстракцию по конкретной тематике
  */
  export default class MaterialBrick extends Material {
  /** Создание компонента {MaterialBrick} @constructor
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
    * @return {Material} @this {MaterialBrick} элемент
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

  /** Является ли узел элементом {MaterialBrick} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialBrick
    */
    static is(node) {
      return Material.is(node, MaterialBrick);
    }
  }

Material.attributes(MaterialBrick);
// Material.properties(MaterialBrick);
Material.define(component, MaterialBrick);
