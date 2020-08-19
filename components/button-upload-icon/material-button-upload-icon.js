import Material             from '../../script/Material.js';
import MaterialButtonUpload from '../button-upload/material-button-upload.js';
import MaterialIcon         from '../icon/material-icon.js';

const component = Material.meta(import.meta.url, 'material-button-upload-icon');
const updateAttribute = {
  /** */
      text(root, value) { Material.updateChildrenAttribute(root, 'material-button-upload', 'text',     value) },
  /** */
      mode(root, value) { Material.updateChildrenAttribute(root, 'material-button-upload',  'mode',     value) },
  /** */
  disabled(root, value) { Material.updateChildrenProperty(root, 'material-button-upload', 'disabled', value) },
  /** */
    accept(root, value) { Material.updateChildrenAttribute(root, 'material-button-upload', 'accept',   value) },
  /** */
  multiple(root, value) { Material.updateChildrenProperty(root, 'material-button-upload', 'multiple', value) }
};

/** {MaterialButtonTooltip} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialButtonUploadIcon extends Material {
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
      return Material.is(node, MaterialButtonUploadIcon);
    }
  }

Material.attributes(MaterialButtonUploadIcon, 'text', 'accept');
Material.properties(MaterialButtonUploadIcon, 'multiple', 'disabled');
Material.define(component, MaterialButtonUploadIcon);
