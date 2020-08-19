import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-diagram-pie');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/** Круговая Диаграмма @class
  * @description круг, разделенный на секторы, относительный размер которых пропорционален численным значениям
  */
  export default class MaterialDiagramPie extends Material {
  /** Создание компонента {MaterialDiagramPie} @constructor
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
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialDiagramPie} @this
    */
    mount(node) {
      return super.mount(node, updateAttribute);
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

  /** Является ли узел элементом {MaterialDiagramPie} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialDiagramPie
    */
    static is(node) {
      return Material.is(node, MaterialDiagramPie);
    }
  }

Material.attributes(MaterialDiagramPie);
// Material.properties(MaterialDiagramPie);
Material.define(component, MaterialDiagramPie);
