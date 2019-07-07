import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-timeline');

const updateAttribute = {
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
};

/**
  *
  */
  export default class MaterialTimeline extends Material {
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
    * @param {HTMLElement} content ShadowRoot узел элемента
    */
    mount(content) {
      Object
        .keys(updateAttribute)
        .forEach(attribute => updateAttribute[attribute](content, this[attribute]));

        // console.log('c', content, content.shadowRoot)
        // console.log('items', Material.items(content));

        // Material.onload(content.shadowRoot).then(nodes => {
        //   console.log(nodes);
        //   temp(content.shadowRoot);
        // });

        var observer = new ResizeObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            // console.log('mutation', mutation);
            // debugger;
            //Detect <img> insertion
            // if (mutation.addedNodes.length)
            //   console.info('Node added: ', mutation.addedNodes[0])
          });
          temp(content);
        });

        // observer.observe(this);
        // console.log('mti', this.getBoundingClientRect().height);

        const slot = content.querySelector('slot');
        slot.addEventListener('slotchange', _ => {
          // console.log('slotchange');
          // console.log('slot change', e);
          observer.disconnect();
          const nodes = [...slot.assignedNodes()].filter(node => node.nodeType === 1);
          nodes.forEach(node => observer.observe(node));
          // debugger;
          // console.log(nodes.map(e => e.scrollHeight));
          // const promises = nodes.map(async (node, i) => {
          //   // console.log('0', i);
          //   const promise = await Material.onload(node);
          //   // console.log('1', i);
          //   console.log(i, node, node.offsetHeight, node.scrollHeight, node.getBoundingClientRect().height, getComputedStyle(node).height);
          //   return promise;
          // });
          // Promise.all(promises).then(_ => temp(content));
        });
    }

  /** */
    unmount() {
      // observer.disconnect(); // !
      return this;
    }

  /**
    * @param {HTMLElement} root ShadowRoot узел элемента
    */
    ready(root) {

    }

  /** */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous) updateAttribute[name](root, current);
    }

  /** Является ли узел элементом {MaterialTimeline} @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialTimeline
    */
    static is(node) {
      return Material.is(node, MaterialTimeline);
    }
  }

Material.attributes(MaterialTimeline);
// Material.properties(MaterialTimeline);
Material.define(component, MaterialTimeline);

/** */
function temp(content) {
  // console.log(content);
  // debugger;
  const slot = content.querySelector('slot');
  // slot.addEventListener('slotchange', () => {
    const nodes = [...slot.assignedNodes()].filter(node => node.nodeType === 1);
    // console.log(nodes);
    // if (nodes.length === 1 && nodes[0] instanceof Text) {
    //   const span = document.createElement('span');
    //   span.textContent = nodes[0].nodeValue;
    //   nodes[0].parentNode.replaceChild(span, nodes[0]);
    // }
    var COL_COUNT = 2; // set this to however many columns you want
    var colHeights = [];
        // container = document.getElementById('block-contain');
    for (let i = 0; i <= COL_COUNT; i++) {
      colHeights.push(0);
    }
    for (let i = 0; i < nodes.length; i++) {
      var order = (i + 1) % COL_COUNT || COL_COUNT;
      // debugger;
      nodes[i].style.order = order;
      // debugger;
      const h = nodes[i].getBoundingClientRect().height + parseFloat(getComputedStyle(nodes[i]).marginTop) + parseFloat(getComputedStyle(nodes[i]).marginBottom);
      colHeights[order] += h; // parseFloat(getComputedStyle(nodes[i]).height) || 150; // parseFloat(nodes[i].style.height);
      nodes[i].removeAttribute('left');
      nodes[i].removeAttribute('right');
      nodes[i].setAttribute(order === 1 ? 'left' : 'right', '');
    }
    // debugger;
    var highest = Math.max(...colHeights);
    // console.log(content);
    // debugger;
    slot.style.height = highest + 'px';
  // });
}
