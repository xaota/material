import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-timepicker');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/**
  *
  */
  export default class MaterialTimepicker extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /**
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /**
    * @param {HTMLElement} root ShadowRoot узел элемента
    */
    mount(root) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](root, this[attribute]));
    }

  /**
    * @param {HTMLElement} root ShadowRoot узел элемента
    */
    ready(root) {

    }

  /** */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialTimepicker} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialTimepicker
    */
    static is(node) {
      return Material.is(node, MaterialTimepicker);
    }
  }

Material.attributes(MaterialTimepicker);
// Material.properties(MaterialTimepicker);
Material.define(component, MaterialTimepicker);
