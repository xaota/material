import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-switch');
const updateAttribute = {
/** */
  checked(root, value) {
    Material.updateChildrenProperty(root, '#checkbox', 'checked', [true, ''].includes(value))
  },

/** */
  disabled(root, value) {
    Material.updateChildrenElement(root, '#checkbox', 'disabled', [true, ''].includes(value));
  }
};

/** Поле-выключатель @class MaterialSwitch @extends {Material}
  *
  */
  export default class MaterialSwitch extends Material {
  /** Создание элемента {MaterialSwitch}
    *
    */
    constructor() {
      super(component, 'closed');
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return [...Object.keys(updateAttribute), 'right', 'disabled'];
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialSwitch} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const checkbox = node.querySelector('#checkbox');
      checkbox.addEventListener('change', _ => {
        this.checked = checkbox.checked;
        this.event('change');
      });
      // node.addEventListener('click', _ => checkbox.dispatchEvent(new MouseEvent('click'))); // .checked = !.checked
      return this;
    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && name in updateAttribute) updateAttribute[name].call(this, root, current);
    }

  /** Является ли узел элементом {MaterialSwitch} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof {MaterialSwitch}
    */
    static is(node) {
      return Material.is(node, MaterialSwitch);
    }
  }

Material.properties(MaterialSwitch, 'checked', 'right', 'disabled');
Material.define(component, MaterialSwitch);

// #region [Private]

// #endregion
