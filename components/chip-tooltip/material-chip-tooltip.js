import Material from '../../script/Material.js';
import '/material/components/chip/material-chip.js';
import '/material/components/tooltip/material-tooltip.js';

const component = Material.meta(import.meta.url, 'material-chip-tooltip');
const updateAttribute = {
/** */
   action(root, value) { Material.updateChildrenAttribute(root, 'material-chip',    'action', value) },
/** */
    value(root, value) { Material.updateChildrenAttribute(root, 'material-chip',    'value',  value) },
/** */
  content(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'content', value) },
/** */
        x(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'x',       value) },
/** */
        y(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'y',       value) }
};

/** {MaterialChipTooltip} Фишка с подсказкой @class @extends {Material}
  */
  export default class MaterialChipTooltip extends Material {
  /** Создание элемента
    * @param {string} html текст на фишке
    * @param {string} content текст подсказки на фишке
    * @param {string} action иконка действия
    */
    constructor(html, content, action) {
      super(component);
      if (html)    this.innerHTML = html;
      if (content) this.content = content;
      if (action)  this.action = action;
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
      if (current !== previous && name in updateAttribute) updateAttribute[name].call(this, root, current);
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
