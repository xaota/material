import Material from '../../script/Material.js';
import '/material/components/button-upload/material-button-upload.js';
import '/material/components/tooltip/material-tooltip.js';

const component = Material.meta(import.meta.url, 'material-button-upload-tooltip');
const updateAttribute = {
  /** */
      text(root, value) { Material.updateChildrenAttribute(root, 'material-button-upload',  'text',     value) },
  /** */
  disabled(root, value) { Material.updateChildrenProperty(root, 'material-button-upload',  'disabled', value) },
  /** */
    accept(root, value) { Material.updateChildrenAttribute(root, 'material-button-upload',  'accept', value) },
  /** */
  multiple(root, value) { Material.updateChildrenProperty(root, 'material-button-upload', 'multiple', value) },
  /** */
   content(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'content',  value) },
  /** */
         x(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'x',        value) },
  /** */
         y(root, value) { Material.updateChildrenAttribute(root, 'material-tooltip', 'y',        value) }
};

/** {MaterialButtonTooltip} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialButtonUploadTooltip extends Material {
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

  /** Является ли узел элементом {MaterialButtonTooltip} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialButtonTooltip
    */
    static is(node) {
      return Material.is(node, MaterialButtonUploadTooltip);
    }
  }

Material.attributes(MaterialButtonUploadTooltip, 'text', 'accept', 'content', 'x', 'y');
Material.properties(MaterialButtonUploadTooltip, 'multiple', 'disabled');
Material.define(component, MaterialButtonUploadTooltip);

