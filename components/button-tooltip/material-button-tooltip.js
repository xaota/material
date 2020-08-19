import Material        from '../../script/Material.js';
import MaterialButton  from '../button/material-button.js';
import MaterialTooltip from '../tooltip/material-tooltip.js';

const component = Material.meta(import.meta.url, 'material-button-tooltip');
const updateAttribute = {
      text(root, value) {Material.updateChildrenAttribute(root, 'material-button',  'text',     value)},
      mode(root, value) {Material.updateChildrenAttribute(root, 'material-button',  'mode',     value)},
  disabled(root, value) {Material.updateChildrenAttribute(root, 'material-button',  'disabled', value)},
   content(root, value) {Material.updateChildrenAttribute(root, 'material-tooltip', 'content',  value)},
         x(root, value) {Material.updateChildrenAttribute(root, 'material-tooltip', 'x',        value)},
         y(root, value) {Material.updateChildrenAttribute(root, 'material-tooltip', 'y',        value)}
};

/** {MaterialButtonTooltip} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialButtonTooltip extends Material {
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

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialButtonTooltip} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialButtonTooltip
    */
    static is(node) {
      return Material.is(node, MaterialButtonTooltip);
    }
  }

Material.attributes(MaterialButtonTooltip);
Material.define(component, MaterialButtonTooltip);

