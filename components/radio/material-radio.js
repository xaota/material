import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-radio');
const updateAttribute = {
/** */
  checked(root, value) {
    Material.updateChildrenElement(root, '#checkbox', 'checked', [true, ''].includes(value));
  },

/** */
  disabled(root, value) {
    Material.updateChildrenElement(root, '#checkbox', 'disabled', [true, ''].includes(value));
  }
};

/** Поле переключателя @class MaterialRadio @extends {Material}
  */
  export default class MaterialRadio extends Material {
  /** Создание компонента {MaterialRadio} @constructor
    * @param {string} label название поля
    */
    constructor(label) {
      super(component);
      if (label) this.innerHTML = label;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return [...Object.keys(updateAttribute), 'right', 'disabled'];
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialRadio} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const checkbox = node.querySelector('#checkbox');
      checkbox.addEventListener('change', _ => {
        this.checked = checkbox.checked;
        this.event('change');
      });
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

  /** Является ли узел элементом {MaterialRadio} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialRadio
    */
    static is(node) {
      return Material.is(node, MaterialRadio);
    }
  }

// Material.attributes(MaterialRadio, 'value');
Material.properties(MaterialRadio, 'checked', 'right', 'disabled');
Material.define(component, MaterialRadio);

// #region [Private]

// #endregion
