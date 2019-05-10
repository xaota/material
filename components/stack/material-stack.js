import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-stack');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/**
  *
  */
  export default class MaterialStack extends Material {
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

  /** Является ли узел элементом {MaterialStack} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialStack
    */
    static is(node) {
      return Material.is(node, MaterialStack);
    }
  }

Material.attributes(MaterialStack);
// Material.properties(MaterialStack);
Material.define(component, MaterialStack);
