import Material from '../../script/Material.js';
import '/material/components/chip/material-chip.js';
import '/material/components/tooltip/material-tooltip.js';

const component = Material.meta(import.meta.url, 'material-chip-tooltip');
const updateAttribute = {
  /** */
    content(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'content',  value) },
  /** */
          x(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'x',        value) },
  /** */
          y(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'y',        value) }
};

/** {MaterialButtonTooltip} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialChipTooltip extends Material {
  /** Создание элемента
    * @param {string} value текст на фишке
    * @param {string} tooltip текст подсказки на фишке
    */
    constructor(value, tooltip) {
      super(component);
      if (value)   this.innerHTML = value;
      if (tooltip) this.content = tooltip;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialChipTooltip} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      return this;
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialChipTooltip} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialChipTooltip
    */
    static is(node) {
      return Material.is(node, MaterialChipTooltip);
    }
  }

Material.attributes(MaterialChipTooltip);
// Material.properties(MaterialChipTooltip, 'disabled');
Material.define(component, MaterialChipTooltip);

// #region [Private]

// #endregion
