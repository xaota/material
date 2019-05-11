import Material from '../../script/Material.js'
import MaterialDrop from '../drop/material-drop.js';

const component = Material.meta(import.meta.url, 'material-drop-root');
/**
  *
  */
  export default class MaterialDropRoot extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** */
    mount(root) {
      const drop = [...root.querySelector('slot').assignedNodes()].filter(e => MaterialDrop.is(e));
      if (drop.length === 0) return this;
      root.addEventListener('click', _ => drop.forEach(e => e.style.display = 'block'), {once: true});
      return this;
    }
  }

Material.define(component, MaterialDropRoot);

// #region [Private]

// #endregion
