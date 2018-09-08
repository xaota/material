import Material from '../../script/Material.js'
const element = 'material-select-option';

/**
  *
  */
  export default class MaterialSelectOption extends Material {
  /**
    *
    */
    constructor() {
      super(element);
    }

  /**
    *
    */
    init() {
      const content = this.content;

    }

  /** Является ли узел элементом {MaterialSelectOption} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialSelectOption
    */
    static is(node) {
      return Material.is(node, element);
    }
  }

customElements.define(element, MaterialSelectOption);

// #region [Private]

// #endregion
