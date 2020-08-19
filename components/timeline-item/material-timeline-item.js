import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-timeline-item');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/**
  *
  */
  export default class MaterialTimelineItem extends Material {
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
    * @param {HTMLElement} root ShadowRoot узел элемента
    */
    mount(root) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](root, this[attribute]));

      // var observer = new MutationObserver(function(mutations) {
      //   mutations.forEach(function(mutation) {
      //     console.log('mutation', mutation);
      //     // debugger;
      //     //Detect <img> insertion
      //     // if (mutation.addedNodes.length)
      //     //   console.info('Node added: ', mutation.addedNodes[0])
      //   });
      // });

      // observer.observe(this, {childList: true});
    }

  /**
    * @param {HTMLElement} root ShadowRoot узел элемента
    */
    ready(root) {

    }

  /** Изменение отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name название изменяемого атрибута
    * @param {string} previous предыдущее значение ?null
    * @param {string} current устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialTimelineItem} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialTimelineItem
    */
    static is(node) {
      return Material.is(node, MaterialTimelineItem);
    }
  }

Material.attributes(MaterialTimelineItem);
// Material.properties(MaterialTimeline);
Material.define(component, MaterialTimelineItem);
