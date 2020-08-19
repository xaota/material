import Material             from '../../script/Material.js';
import MaterialButtonUpload from '../button-upload/material-button-upload.js';
import MaterialIcon         from '../icon/material-icon.js';
import MaterialTooltip      from '../tooltip/material-tooltip.js';

const component = Material.meta(import.meta.url, 'material-button-upload-tooltip-icon');
const updateAttribute = {
  /** */
      text(root, value) { Material.updateChildrenAttribute(root, 'material-button-upload', 'text', value) },
  /** */
      mode(root, value) { Material.updateChildrenAttribute(root, 'material-button-upload', 'mode', value) },
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

/** {MaterialButtonTooltipIcon} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialButtonUploadTooltipIcon extends Material {
  /** Создание элемента
    * @param {string} icon название иконки
    */
    constructor(icon, content, x, y) {
      super(component, 'closed');
      if (icon) this.innerText = icon;
      if (content) this.content = content;
      if (x) this.x = x;
      if (y) this.y = y;
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

  /** Является ли узел элементом {MaterialButtonTooltipIcon} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialButtonTooltipIcon
    */
    static is(node) {
      return Material.is(node, MaterialButtonUploadTooltipIcon);
    }
  }

Material.attributes(MaterialButtonUploadTooltipIcon, 'text', 'accept', 'content', 'x', 'y');
Material.properties(MaterialButtonUploadTooltipIcon, 'multiple', 'disabled');
Material.define(component, MaterialButtonUploadTooltipIcon);
