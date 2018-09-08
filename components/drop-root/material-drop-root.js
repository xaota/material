import Material from '../../script/Material.js'
import MaterialDrop from '../drop/material-drop.js';
const element = 'material-drop-root';

/**
  *
  */
  export default class MaterialDropRoot extends Material {
  /**
    *
    */
    constructor() {
      super(element);
    }

  /**
    *
    */
    mount() {
      const shadow = this.shadow;
      const root = shadow.querySelector('div.root');
      const slot = shadow.querySelector('slot');
      const nodes = [...slot.assignedNodes()];
      const drop = nodes.filter(e => MaterialDrop.is(e))[0];
      if (!drop) return this;
      root.addEventListener('click', () => {
        drop.visible = !drop.visible;
      });
      return this;
    }
  }

customElements.define(element, MaterialDropRoot);

// #region [Private]

// #endregion
