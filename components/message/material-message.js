import Material from '../../script/Material.js';
import MaterialText from '../text/material-text.js';

const component = Material.meta(import.meta.url, 'material-message');
/**
  *
  */
  export default class MaterialMessage extends Material {
  /**
    * @param {string?} side сторона показа сообщения (left / right)
    */
    constructor(side) {
      super(component);
      if (side) this[side] = true;
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialCheckbox} @this
    */
    mount(node) {

      return this;
    }

  /** */
    content(...nodes) {
      nodes = nodes.map(toDOMelement);
      nodes.forEach(node => this.appendChild(node));
      return this;
    }

  /** */
    avatar() {
      return this;
    }

  /** */
    markup(...nodes) {
      nodes = nodes.map(toDOMelement);
      nodes.forEach(node => node.setAttribute('slot', 'markup'));
      nodes.forEach(node => this.appendChild(node));
      return this;
    }

  /** Является ли узел элементом {MaterialMessage} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialMessage
    */
    static is(node) {
      return Material.is(node, MaterialMessage);
    }
  }

Material.properties(MaterialMessage, 'left', 'right');
Material.define(component, MaterialMessage);

// #region [Private]
/** */
  function toDOMelement(node) {
    return typeof node !== 'object' || !('nodeType' in node)
      ? new MaterialText(node)
      : node;
  }
// #endregion
