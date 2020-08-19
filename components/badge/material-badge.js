import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-badge');
const updateAttribute = {
/** */
  count(root, value, prev) {
    value = badge(root, value, this.max);
    const current = parseInt(this.count);
    if (isNaN(current) || current < 0) return this.count = value;
    Material.updateChildrenHTML(root, 'span', value);
  },

/** */
  max(root, value) { Material.updateChildrenHTML(root, 'span', badge(root, this.count, value)) }
};

/** Метка @class
  *
  */
  export default class MaterialBadge extends Material {
  /** Создание компонента {MaterialBadge} @constructor
    * @param {number} count число на метке
    */
    constructor(count) {
      super(component);
      // if (count) this.count = count;
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} root ShadowRoot узел элемента
    * @return {MaterialBadge} @this
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
      if (current !== previous && (name in updateAttribute)) {
        updateAttribute[name].call(this, root, current, previous);
      }
    }

  /** Является ли узел элементом {MaterialBadge} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialBadge
    */
    static is(node) {
      return Material.is(node, MaterialBadge);
    }
  }

Material.attributes(MaterialBadge, 'count', 'max');
Material.define(component, MaterialBadge);

// #region [Private]
/** */
  function badge(root, count = 0, max = 0) {
    count = parseInt(count);
    max   = parseInt(max);
    if (!max || isNaN(max) || max < 1) max = Infinity;
    if (isNaN(count) || count < 0) count = 0;
    return count <= max
      ? count.toString()
      : `${max}+`;
  }
// #endregion
