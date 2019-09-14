import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-chip');
/** */
  export default class MaterialChip extends Material {
    /** */
      constructor(value) {
        super(component);
        if (value) this.innerHTML = value;
      }
  }

Material.define(component, MaterialChip);

// #region [Private]

// #endregion
