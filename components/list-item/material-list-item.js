import Material, {drawRipple, pointerOffset} from '../../script/Material.js';
const component = Material.meta(import.meta.url, 'material-list-item');
/**
  *
  */
  export default class MaterialListItem extends Material {
  /**
    *
    */
    constructor(value, html) {
      super(component);

      if (value) this.value = value;
      if (html)  this.innerHTML = html;
    }

  /** */
    static get observedAttributes() {
      return ['value', 'disabled', 'selected'];
    }

  /**
    *
    */
    mount(content) {
      this;
      const slot = content.querySelector('slot');
      slot.addEventListener('slotchange', () => {
        const nodes = [...slot.assignedNodes()];
        if (nodes.length === 1 && nodes[0] instanceof Text) {
          const span = document.createElement('span');
          span.textContent = nodes[0].nodeValue;
          nodes[0].parentNode.replaceChild(span, nodes[0]);
        }
      });

      const root = content.querySelector('div.root');
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        drawRipple.call(root, position);
      });
    }

  /** Является ли узел элементом {MaterialListItem} @static
    * @param {HTMLElament} node проверяемый узел
    * @return {boolean} node instanceof MaterialListItem
    */
    static is(node) {
      return Material.is(node, MaterialListItem);
    }
  }

Material.properties(MaterialListItem, 'disabled', 'selected');
Material.attributes(MaterialListItem, 'value');
Material.define(component, MaterialListItem);

// #region [Private]

// #endregion
