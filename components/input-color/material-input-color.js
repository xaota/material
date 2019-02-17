import Material from '../../script/Material.js';
import '../paper/material-paper.js';
import '../drop/material-drop.js';
import '../drop-root/material-drop-root.js';
import '/material/components/tabs/material-tabs.js';
import MaterialTabsItem from '/material/components/tabs-item/material-tabs-item.js';

const component = Material.meta(import.meta.url, 'material-input-color');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/**
  *
  */
  export default class MaterialInputColor extends Material {
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

  /** Является ли узел элементом {MaterialInputColor} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialInputColor
    */
    static is(node) {
      return Material.is(node, MaterialInputColor);
    }
  }

Material.attributes(MaterialInputColor);
// Material.properties(MaterialInputColor);
Material.define(component, MaterialInputColor);
