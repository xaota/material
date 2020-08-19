import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-icon');
/**
  *
  */
  export default class MaterialIcon extends Material {
  /**
    *
    */
    constructor(name) {
      super(component);
      if (name) this.innerHTML = name;
    }

  /** */
    mount(content) {
      const slot = content.querySelector('slot');
      const root = content.querySelector('img');
      const theme = 'light';
      slot.addEventListener('slotchange', _ => {
        const self = slot.assignedNodes()[0];
        const value = self instanceof HTMLSlotElement
          ? self.assignedNodes()[0].nodeValue
          : self && self.nodeValue;
        if (!value) return;
        const icon = value.trim();
        root.setAttribute('alt', icon);
        root.src = MaterialIcon.src(icon, theme);
      });
      return this;
    }

  /** */
    static src(icon, theme = 'light') {
      return new URL(`../../icons/${theme}/${icon}.svg`, component.base);
    }
  }

Material.define(component, MaterialIcon);
