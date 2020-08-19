import Material, {drawRipple, pointerOffset} from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-list-item');

/** Элемент списка {MaterialList} / @class {MaterialListItem} */
  export default class MaterialListItem extends Material {
  /** Создание элемента списка @constructor
    * @param {string} value значение атрибута value элемента списка
    * @param {string} html содержимое элемента списка
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

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialListItem} @this
    */
    mount(node) {
      const slot = node.querySelector('slot');
      slot.addEventListener('slotchange', () => {
        const nodes = [...slot.assignedNodes()];
        if (nodes.length === 1 && nodes[0] instanceof Text) {
          const span = document.createElement('span');
          span.textContent = nodes[0].nodeValue;
          nodes[0].parentNode.replaceChild(span, nodes[0]);
        }
      });

      const root = node.querySelector('#root');
      const ripple = root.querySelector('#ripple');
      root.addEventListener('click', event => {
        const position = pointerOffset(root, event);
        drawRipple.call(ripple, position);
      });

      return this;
    }

  /** Является ли узел элементом {MaterialListItem} @static
    * @param {HTMLElement} node проверяемый узел
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
