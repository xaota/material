import Material, {$} from '../../script/Material.js';

const element = 'material-expand';
customElements.define(element, class MaterialExpand extends Material {
  constructor() {
    super(element);
  }

  init() {
    const content = this.content;
    const root = $('div.root', this.content);
    $('header > p.summary',     root).innerText = this.summary;
    $('header > p.description', root).innerText = this.description;
    $('header', root).addEventListener('click', event => {
      const expanded = expand(root);
      event.stopPropagation();
      event.cancelBubble = true;
      event.preventDefault();
      this.event('expand-event', {content: expanded});
      return false;
    });
  }

  get summary() {
    return this.getAttribute("summary");
  }

  set summary(value) {
    !!value
      ? this.setAttribute("summary", value)
      : this.removeAttribute("summary");
  }

  get description() {
    return this.getAttribute("description");
  }

  set description(value) {
    !!value
      ? this.setAttribute("description", value)
      : this.removeAttribute("description");
  }

  /* get/set expand() {} */
});

// #region [Private]
  function expand(root) {
    const slot = $('slot', root);
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
