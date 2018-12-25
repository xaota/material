import Material from '../../script/Material.js';
import '/material/components/icon/material-icon.js';
import '/material/components/tooltip/material-tooltip.js';

const component = Material.meta(import.meta.url, 'material-button-tooltip-icon');
const updateAttribute = {
      text(root, value) {Material.updateChildrenAttribute(root, 'material-button',  'text',     value)},
  disabled(root, value) {Material.updateChildrenAttribute(root, 'material-button',  'disabled', value)},
   content(root, value) {Material.updateChildrenAttribute(root, 'material-tooltip', 'content',  value)},
         x(root, value) {Material.updateChildrenAttribute(root, 'material-tooltip', 'x',        value)},
         y(root, value) {Material.updateChildrenAttribute(root, 'material-tooltip', 'y',        value)}
};

/** {MaterialButtonTooltipIcon} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialButtonTooltipIcon extends Material {
  /** Создание элемента
    */
    constructor() {
      super(component, 'closed');
    }

  /** */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** */
    mount(root) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](root, this[attribute]));
    }

  /** */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialButtonTooltipIcon} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialButtonTooltipIcon
    */
    static is(node) {
      return Material.is(node, MaterialButtonTooltipIcon);
    }
  }

Material.attributes(MaterialButtonTooltipIcon);
Material.define(component, MaterialButtonTooltipIcon);
