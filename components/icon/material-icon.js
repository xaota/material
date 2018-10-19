import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-icon');
/**
  *
  */
  export default class MaterialIcon extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

  /** */
    mount(content) {
      this;
      const slot = content.querySelector('slot');
      const root = content.querySelector('img');
      const theme = 'light';
      slot.addEventListener('slotchange', () => {
        const icon = slot.assignedNodes()[0].nodeValue.trim();
        root.setAttribute('alt', icon);
        root.src = MaterialIcon.src(icon, theme);
      });
    }

  /** */
    static src(icon, theme = 'light') {
      return new URL(`../../icons/${theme}/${icon}.svg`, component.base);
    }
  }

Material.define(component, MaterialIcon);
