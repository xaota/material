import Material from '../../script/Material.js';
import '../panel/material-panel.js';
import MaterialDrawerItem from '../drawer-item/material-drawer-item.js';
import MaterialButtonIcon from '../button-icon/material-button-icon.js';
import MaterialButtonTooltipIcon from '../button-tooltip-icon/material-button-tooltip-icon.js';

const component = Material.meta(import.meta.url, 'material-drawer');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/**
  *
  */
  export default class MaterialDrawer extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /**
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /**
    * @param {HTMLElement} content ShadowRoot узел элемента
    */
    mount(content) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](content, this[attribute]));

      [...content.querySelectorAll('slot')].forEach(slot => {
        const items = slot.assignedNodes();
        items.forEach(item => {
          if (!MaterialDrawerItem.is(item)) return;
          const button = item.content
            ? new MaterialButtonTooltipIcon(item.icon, item.content, item.x, item.y)
            : new MaterialButtonIcon(item.icon);
          button.text = true;
          button.slot = item.slot;
          button.addEventListener('click', _ => {
            // TODO: скрыть другие слои
            item.expand = !item.expand;
          });
          item.parentNode.insertBefore(button, item);
        });
      });
    }

  /** */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialDrawer} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialDrawer
    */
    static is(node) {
      return Material.is(node, MaterialDrawer);
    }
  }

Material.attributes(MaterialDrawer);
// Material.properties(MaterialDrawer);
Material.define(component, MaterialDrawer);
