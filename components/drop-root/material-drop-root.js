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

  /**
    *
    */
    mount(content) {
      const root = content.querySelector('div.root');
      const slot = content.querySelector('slot');
      const nodes = [...slot.assignedNodes()];
      const drop = nodes.filter(e => MaterialDrop.is(e))[0];
      if (!drop) return this;
      root.addEventListener('click', () => {
        drop.visible = !drop.visible;
      });
      return this;
    }
  }

Material.define(component, MaterialDropRoot);

// #region [Private]

// #endregion
