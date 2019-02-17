import Material from '../../script/Material.js';
import MaterialPaper from '../paper/material-paper.js';

const component = Material.meta(import.meta.url, 'material-drawer-item');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/**
  *
  */
  export default class MaterialDrawerItem extends Material {
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

  /** Является ли узел элементом {MaterialDrawer} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialDrawer
    */
    static is(node) {
      return Material.is(node, MaterialDrawerItem);
    }
  }

Material.attributes(MaterialDrawerItem, 'icon', 'content', 'x', 'y');
Material.properties(MaterialDrawerItem, 'expand');
Material.define(component, MaterialDrawerItem);
