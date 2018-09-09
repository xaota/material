import Material from '../../script/Material.js';

const component = Material.meta(import.meta.url, 'material-expand');
/** */
  export default class MaterialExpand extends Material {
  /** */
    constructor() {
      super(component);
    }

  /** */
    mount(content) {
      const root = content.querySelector('div.root');
      root.querySelector('header > p.summary')    .innerText = this.summary;
      root.querySelector('header > p.description').innerText = this.description;
      root.querySelector('header').addEventListener('click', event => {
        const expanded = expand(root);
        event.stopPropagation();
        event.cancelBubble = true;
        event.preventDefault();
        this.event('expand-event', {content: expanded});
        return false;
      });
    }

  /** */
    get summary() {
      return this.getAttribute("summary");
    }

  /** */
    set summary(value) {
      !!value
        ? this.setAttribute("summary", value)
        : this.removeAttribute("summary");
    }

  /** */
    get description() {
      return this.getAttribute("description");
    }

  /** */
    set description(value) {
      !!value
        ? this.setAttribute("description", value)
        : this.removeAttribute("description");
    }

  /* get/set expand() {} */
  }

Material.define(component, MaterialExpand);

// #region [Private]
  /** */
    function expand(root) {
      const slot = root.querySelector('slot');
      const className = 'expand';
      const expanded = root.classList.contains(className);
      root.classList.toggle(className);
      // const padding
      slot.style.maxHeight = expanded
        ? null
        : slot.scrollHeight + "px";
      return !expanded;
    }
// #endregion
