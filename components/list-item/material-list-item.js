import Material from '../../script/Material.js'
// const element = 'material-list-item';
const component = Material.meta(import.meta.url, 'material-list-item');
/**
  *
  */
  export default class MaterialListItem extends Material {
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
      const slot = content.querySelector('slot');
      slot.addEventListener('slotchange', () => {
        const nodes = [...slot.assignedNodes()];
        if (nodes.length === 1 && nodes[0] instanceof Text) {
          const span = document.createElement('span');
          span.textContent = nodes[0].nodeValue;
          nodes[0].parentNode.replaceChild(span, nodes[0]);
        }
      });

      this.addEventListener('click', event => {
        // event.stopPropagation();
        this.event('click-ListItem');
      });
    }
  }

Material.define(component, MaterialListItem);

// #region [Private]

// #endregion
