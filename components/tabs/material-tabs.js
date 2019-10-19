import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-tabs');
/** */
  export default class MaterialTabs extends Material {
  /** */
    constructor() {
      super(component);
    }

  /** */
    mount(content) {
      this; // !
      const root = content.querySelector('div.root');
      const links = root.querySelector('#links');

      const tabs  = content.querySelector('slot').assignedNodes().filter(e => e.caption);
      tabs.forEach(item => {
        const caption = item.name || item.caption;
        const radio = createRadio(caption);
        prepend(root, radio);
        const label = createLabel(caption, item.caption);
        links.appendChild(label);
        // items.appendChild(item.cloneNode(true));
        radio.addEventListener('change', _ => changeTab(links, tabs, caption));
      });

      const selected = tabs.findIndex(e => e.classList.contains('selected'))[0] || 0;
      const caption = tabs[selected].name || tabs[selected].caption;
      changeTab(links, tabs, caption);
    }

  /** */
    select(name) {
      const node = this.shadowRoot;
      const links = node.querySelector('#links');
      const tabs  = node.querySelector('slot').assignedNodes().filter(e => e.caption);
      changeTab(links, tabs, name);
    }
  }

Material.define(component, MaterialTabs);

// #region [Private]
/** */
  function changeTab(links, tabs, caption) {
    const selector = `[for="tab-${caption.replace(/\s+/, '-')}"]`;

    onceClass([...links.children], links.querySelector(selector), 'selected');
    onceClass(tabs,  tabs.filter(e => (e.name || e.caption) === caption)[0], 'selected');
  }

/** */
  function prepend(root, node) {
    return root.insertBefore(node, root.firstChild); // node?
  }

/** */
  function createRadio(caption) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'tabs';
    input.id   = 'tab-' + caption.replace(/\s+/, '-');
    return input;
  }

/** */
  function createLabel(caption, text) {
    const label = document.createElement('label');
    label.setAttribute('for', 'tab-' + caption.replace(/\s+/, '-'));
    label.innerText = text;
    return label;
  }

/** */
  function onceClass(items, item, ...classNames) {
    items.forEach(node => node.classList.remove(...classNames));
    item.classList.add(...classNames);
  }
// #endregion
