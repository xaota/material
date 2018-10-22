import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-tabs');
/** */
  export default class MaterialTabs extends Material {
  /** */
    constructor() {
      super(component);
    }

    mount(content) {
      const root = content.querySelector('div.root');
      const links = root.querySelector('#links');

      const tabs  = content.querySelector('slot').assignedNodes().filter(e => e.name);
      tabs.forEach(item => {
        const name = item.name;
        const radio = createRadio(name);
        prepend(root, radio);
        const label = createLabel(name);
        links.appendChild(label);
        // items.appendChild(item.cloneNode(true));
        radio.addEventListener('change', _ => changeTab(links, tabs, name));
      });

      const selected = tabs.findIndex(e => e.classList.contains('selected'))[0] || 0;
      changeTab(links, tabs, tabs[selected].name);
    }
  }

Material.define(component, MaterialTabs);

// #region [Private]
/** */
  function changeTab(links, tabs, name) {
    const selector = `[for="tab-${name.replace(/\s+/, '-')}"]`;

    onceClass([...links.children], links.querySelector(selector), 'selected');
    onceClass(tabs,  tabs.filter(e => e.name === name)[0], 'selected');
  }

/** */
  function prepend(root, node) {
    return root.insertBefore(node, root.firstChild); // node?
  }

/** */
  function createRadio(name) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'tabs';
    input.id   = 'tab-' + name.replace(/\s+/, '-');
    return input;
  }

/** */
  function createLabel(name) {
    const label = document.createElement('label');
    label.setAttribute('for', 'tab-' + name.replace(/\s+/, '-'));
    label.innerText = name;
    return label;
  }

/** */
  function onceClass(items, item, ...classNames) {
    items.forEach(node => node.classList.remove(...classNames));
    item.classList.add(...classNames);
  }
// #endregion
