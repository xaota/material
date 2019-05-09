import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-input-slider');
const updateAttribute = {
  /** */
    value(root, value) { Material.updateChildrenAttribute(root,   'input[type="range"]', 'value',    value) },
  /** */
    disabled(root, value) { Material.updateChildrenProperty(root, 'input[type="range"]', 'disabled', value) }
};

/** Ползунок @class MaterialInputSlider @extends {Material}
  */
  export default class MaterialInputSlider extends Material {
  /**
    *
    */
    constructor() {
      super(component, 'closed');
    }

  /** */
    mount(content) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](content, this[attribute]));
      const input = content.querySelector('input[type="range"]');
      input.addEventListener('input', _ => {
        const value = input.value;
        this.value = value;
        Material.cssVariable(this, 'value', value + '%');
      });
      Material.cssVariable(this, 'value', this.value + '%');
    }

  /** */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** */
    attributeChangedCallback(attribute, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[attribute](root, current);
    }


  /** Является ли узел элементом {MaterialInputSlider} / is @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialInputSlider
    */
    static is(node) {
      return Material.is(node, MaterialInputSlider);
    }
  }


Material.attributes(MaterialInputSlider, 'value');
Material.properties(MaterialInputSlider, 'disabled');
Material.define(component, MaterialInputSlider);
