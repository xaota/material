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

      const tabs  = content.querySelector('slot').assignedNodes().filter(e => e.chaption);
      tabs.forEach(item => {
        const chaption = item.chaption;
        const radio = createRadio(chaption);
        prepend(root, radio);
        const label = createLabel(chaption);
        links.appendChild(label);
        // items.appendChild(item.cloneNode(true));
        radio.addEventListener('change', _ => changeTab(links, tabs, chaption));
      });

      const selected = tabs.findIndex(e => e.classList.contains('selected'))[0] || 0;
      changeTab(links, tabs, tabs[selected].chaption);
    }
  }

Material.define(component, MaterialTabs);

// #region [Private]
/** */
  function changeTab(links, tabs, chaption) {
    const selector = `[for="tab-${chaption.replace(/\s+/, '-')}"]`;

    onceClass([...links.children], links.querySelector(selector), 'selected');
    onceClass(tabs,  tabs.filter(e => e.chaption === chaption)[0], 'selected');
  }

/** */
  function prepend(root, node) {
    return root.insertBefore(node, root.firstChild); // node?
  }

/** */
  function createRadio(chaption) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'tabs';
    input.id   = 'tab-' + chaption.replace(/\s+/, '-');
    return input;
  }

/** */
  function createLabel(chaption) {
    const label = document.createElement('label');
    label.setAttribute('for', 'tab-' + chaption.replace(/\s+/, '-'));
    label.innerText = chaption;
    return label;
  }

/** */
  function onceClass(items, item, ...classNames) {
    items.forEach(node => node.classList.remove(...classNames));
    item.classList.add(...classNames);
  }
// #endregion
