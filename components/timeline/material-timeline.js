import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-timeline');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/**
  *
  */
  export default class MaterialTimeline extends Material {
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

  /** Является ли узел элементом {MaterialTimeline} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialTimeline
    */
    static is(node) {
      return Material.is(node, MaterialTimeline);
    }
  }

Material.attributes(MaterialTimeline);
// Material.properties(MaterialTimeline);
Material.define(component, MaterialTimeline);
