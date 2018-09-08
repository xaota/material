import Material from '../../script/Material.js'
const element = 'material-tooltip';

/** {MaterialTooltip} @class @default @export
  *
  */
  export default class MaterialTooltip extends Material {
  /** {MaterialTooltip} @constructor
    *
    */
    constructor() {
      super(element);
    }

  /**
    *
    */
    init() { // ready
      const content = this.content;
      content.querySelector('div.root').innerHTML = this.getAttribute('content')
      return this;
    }

  /** Является ли узел элементом {MaterialTooltip} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialTooltip
    */
    static is(node) {
      return Material.is(node, element);
    }
  }

window.customElements.define(element, MaterialTooltip);

// #region [Private]

// #endregion
