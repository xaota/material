import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-checkbox');
/** */
  export default class MaterialCheckbox extends Material {
  /** */
    constructor() {
      super(component);
    }

  /** */
    mount(content) {
      const checkbox = content.querySelector('input[type="checkbox"]');
      checkbox.checked = this.checked;
      checkbox.addEventListener('change', _ => this.checked = checkbox.checked);
      content.addEventListener('click', _ => checkbox.dispatchEvent(new MouseEvent('click'))); // .checked = !.checked
    }

  /** */
    get checked() {
      return this.hasAttribute('checked');
    }

  /** */
    set checked(value) {
      const checkbox = this.shadowRoot.querySelector('#checkbox');
      if (checkbox) checkbox.checked = value;
      value
        ? this.setAttribute('checked', '')
        : this.removeAttribute('checked');
      this.event('change');
    }
  }
Material.define(component, MaterialCheckbox);

// #region [Private]

// #endregion
