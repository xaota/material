import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-fieldset');
const updateAttribute = {
  /** */
    caption: (root, value) => Material.updateChildrenText(root, 'header', value)
};

/**
  *
  */
  export default class MaterialFieldset extends Material {
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

      const header = root.querySelector('header');
      header.addEventListener('click', _ => this.fold = !this.fold);
    }

  /** */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialFieldset} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialFieldset
    */
    static is(node) {
      return Material.is(node, MaterialFieldset);
    }
  }

Material.attributes(MaterialFieldset, 'caption');
Material.properties(MaterialFieldset, 'fold');
Material.define(component, MaterialFieldset);
