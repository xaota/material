import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-button-upload');
const updateAttribute = {
  /** */
      text(root, value) { Material.updateChildrenAttribute(root, 'material-button',  'text',     value) },
  /** */
  disabled(root, value) { Material.updateChildrenAttribute(root, 'material-button',  'disabled', value) },
  /** */
    accept(root, value) { Material.updateChildrenAttribute(root, 'input[type="file"]', 'accept', value) }
};

/** {MaterialButtonTooltip} Кнопка с подсказкой @class @extends {Material}
  */
  export default class MaterialButtonUpload extends Material {
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
      const input = root.querySelector('input[type="file"]');
      input.addEventListener('change', e => this.event('files', e.target.files));
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
      return Material.is(node, MaterialButtonUpload);
    }
  }

Material.attributes(MaterialButtonUpload);
Material.define(component, MaterialButtonUpload);