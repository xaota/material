import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-tooltip');
/** {MaterialTooltip} @class @default @export
  *
  */
  export default class MaterialTooltip extends Material {
  /** {MaterialTooltip} @constructor
    *
    */
    constructor() {
      super(component);
    }

  /**
    *
    */
    ready(content) {
      content.querySelector('div.root').innerHTML = this.getAttribute('content');
      return this;
    }

  /** Является ли узел элементом {MaterialTooltip} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialTooltip
    */
    static is(node) {
      return Material.is(node, MaterialTooltip);
    }
  }

Material.define(component, MaterialTooltip);

// #region [Private]

// #endregion
