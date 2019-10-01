import Material      from '../../script/Material.js';
import MaterialInput from '../input/material-input.js';
import MaterialChip  from '../chip/material-chip.js';

const component = Material.meta(import.meta.url, 'material-input-chips');

const updateAttribute = {
/** */
        label(root, value) { Material.updateChildrenHTML(root, 'material-input', value) },
/** */
    //  disabled(root, value) {Material.updateChildrenProperty(root, 'material-input', 'disabled', value)},
/** */
        value(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'value', value) },
/** */
  placeholder(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'placeholder', value) },
/** */
         icon(root, value) { Material.updateChildrenAttribute(root, 'material-input', 'icon', value) }
};

/** Поле ввода списка тегов @class {MaterialInputChips} @extends {Material}
  *
  */
  export default class MaterialInputChips extends Material {
  /** Создание элемента
    * @param {string} label название поля
    */
    constructor(label) {
      if (label) this.label = label;
      super(component);
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialInputChips} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const input = node.querySelector('material-input');
      const slot  = node.querySelector('slot');
      input.addEventListener('enter',     _ => calculateValue.call(this, input));
      input.addEventListener('change',    _ => calculateValue.call(this, input));
      slot.addEventListener('slotchange', _ => setTimeout(_ => calculateChips.call(this, input, slot), 100));
      return this;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name].call(this, root, current);
    }

  /** Является ли узел элементом {MaterialInputChips} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialInputChips
    */
    static is(node) {
      return Material.is(node, MaterialInputChips);
    }
  }

Material.attributes(MaterialInputChips);
// Material.properties(MaterialInputChips, 'disabled');
Material.define(component, MaterialInputChips);

// #region [Private]
/** */
  function calculateValue(input) {
    const value = input.value.trim();
    if (!value) return;
    input.value = ``;
    const chip = new MaterialChip(value, 'clear');
    chip.addEventListener('action', _ => chip.remove());
    this.appendChild(chip);
    this.event('change');
  }

/** */
  function calculateChips(input, chips) {
    const width = Math.ceil(chips.getBoundingClientRect().width);
    Material.cssVariable(input, 'padding-left', width + 'px');
  }
// #endregion
