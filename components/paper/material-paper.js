import Material from '../../script/Material.js'
const element = 'material-paper';

/** 
  * 
  */
  class MaterialPaper extends Material {
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
  }

customElements.define(element, MaterialPaper);

// #region [Private]

// #endregion
