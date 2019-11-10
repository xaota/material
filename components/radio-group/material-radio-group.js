import Material from '../../script/Material.js';
import MaterialRadio from '../radio/material-radio.js';

const component = Material.meta(import.meta.url, 'material-radio-group');
const updateAttribute = {
/** */
  value(root, value) { setValue.call(this, root, value) }
};
/** */
  export default class MaterialRadioGroup extends Material {
  /** Создание компонента {MaterialRadioGroup} @constructor
    *
    */
    constructor() {
      super(component);
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return [...Object.keys(updateAttribute), 'name'];
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialRadioGroup} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);

      const listeners = [];
      const slot = node.querySelector('slot');
      slot.addEventListener('slotchange', () => {
        const nodes = [...slot.assignedElements()];
        const items = nodes.filter(item => MaterialRadio.is(item));

        const listener = e => {
          const checked = e.target.checked;
          if (!checked) return;
          const value = e.target.value;
          if (value !== undefined && this.value !== value) return this.value = value;
          change(items, e.target);
          this.event('change', {value: e.target.value});
        };

        items.forEach(item => {
          listeners.forEach(listener => item.removeEventListener('change', listener));
          item.addEventListener('change', listener);
        });

        listeners.push(listener);
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

  /** Является ли узел элементом {MaterialRadioGroup} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialRadioGroup
    */
    static is(node) {
      return Material.is(node, MaterialRadioGroup);
    }
  }


Material.attributes(MaterialRadioGroup, 'name', 'value');
// Material.properties(MaterialRadioGroup);
Material.define(component, MaterialRadioGroup);

// #region [Private]
/** */
  function change(items, target) {
    const temp = items.filter(item => item !== target && item.checked);
    temp.forEach(item => item.checked = false);
  }

/** */
  function setValue(root, value) {
    const slot = root.querySelector('slot');
    const items = [...slot.assignedElements()]
      .filter(item => MaterialRadio.is(item));
    const target = items.find(e => e.value == value);
    if (!target) return;

    target.checked = true;
    change(items, target);
    this.event('change', {value});
  }
// #endregion
