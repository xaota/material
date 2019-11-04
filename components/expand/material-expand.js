import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-expand');
const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
  expand,
  /** */
      summary(root, value) { Material.updateChildrenText(root, 'header > p.summary', value) },
  /** */
  description(root, value) { Material.updateChildrenText(root, 'header > p.description', value) }
};

/** {MaterialExpand} Разворачивающаяся панель @class @extends {Material}
  */
  export default class MaterialExpand extends Material {
  /** Создание элемента
    * @param {string} summary название блока
    */
    constructor(summary) {
      super(component);
      if (summary) this.summary = summary;
    }

  /** Отслеживаемые атрибуты элемента / observedAttributes @readonly
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialExpand} @this
    */
    mount(node) {
      const root = node.querySelector('div.root');
      super.mount(root, updateAttribute);
      root.querySelector('header').addEventListener('click', event => {
        this.expand = !this.expand;
        event.stopPropagation();
        event.cancelBubble = true;
        event.preventDefault();
        return false;
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

  /** Является ли узел элементом {MaterialExpand} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialExpand
    */
    static is(node) {
      return Material.is(node, MaterialExpand);
    }
  }

Material.attributes(MaterialExpand, 'summary', 'description');
Material.properties(MaterialExpand, 'expand');
Material.define(component, MaterialExpand);

// #region [Private]
/** */
  function expand(root, value) {
    Material.updateChildrenClass(root, 'div.root', {expand: value === ''});

    const expanded = this.expand;
    this.event('expand', {expanded});
    this.event(expanded ? 'unfold' : 'fold');
  }
// #endregion
