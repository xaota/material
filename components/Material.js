/** {Material} @class Создание WebComponent @extends {HTMLElement} @export @default
  * @property {DocumentImport} template html-шаблон компонента
  * @property {DocumentFragment} content готовое к вставке содержимое компонента
  * @property {string} basepath путь до компонента
  * @method init() инициализация содержимого компонента
  * @method mount() инициализация содержимого компонента (после рендеринга)
  * @method event(...) отправка события во внешний DOM
  * @method render() вставка содержимого компонента в shadowRoot
  */
  export default class Material extends HTMLElement {
  /**
   *Creates an instance of Material.
   * @param {*} id
   * @param {string} [mode='open']
   */
  constructor(id, mode = 'open') {
      super();
      this.shadow = this.attachShadow({mode});
      const {template, basepath} = include(id);
      stylesheet(template.content, basepath);
      this.template = template;
    }

  /** */
    render() {
      if (!this.ownerDocument.defaultView) return; // !
      this.content = this.template.content.cloneNode(true);
      this.init();
      this.shadow.appendChild(this.content);
      return this;
    }

  /** */
    event(event, detail = null) {
      const options = {bubbles: true, composed: true};
      event = new CustomEvent(event, {detail, ...options});
      return this.dispatchEvent(event);
    }

    // #region [Behavior] @verride
    /** */
      init() {
        return this;
      }

    /**
      *
      */
      mount() {
        return this;
      }

    /** */
      connectedCallback() {
        this.render();
        this.mount();
      }

      // static get observedAttributes() { return [...@string]; }
      // attributeChangedCallback(attrName, oldVal, newVal) {}

      // disconnectedCallback() {}

      // adoptedCallback() {}
    // #endregion
  }

/** */
  export function drawRipple({x, y}) { // Material design ripple animation.
    const div = document.createElement('div');
    div.classList.add('ripple');
    this.insertBefore(div, this.firstChild);
    div.style.top  = `${y - div.clientHeight / 2}px`;
    div.style.left = `${x - div.clientWidth / 2}px`;
    div.classList.add('run');
    div.addEventListener('transitionend', _ => div.remove());
  }

/** */
  export function pointerOffset(element, event) {
    const target = event.target;
    const root   = element.getBoundingClientRect();
    const host   =  target.getBoundingClientRect();
    return {
      x: event.offsetX + (host.left - root.left),
      y: event.offsetY + (host.top  - root.top)
    };
  }

// #region [Private]
/** */
  function include(id) {
    const url = basepath(document.baseURI);
    const doc = $('#' + id).import;
    return {
      template: doc.getElementById(id),
      basepath: basepath(doc.URL).slice(url.length)
    };
  }

/** */
  function basepath(url) {
    return url.substr(0, url.lastIndexOf('/') + 1);
  }

/** */
  function stylesheet(node, path) {
    const sheets = $(['link[rel="stylesheet"]:not([data-absolute])'], node);
    sheets.forEach(link => {
      const url = link.getAttribute('href');
      link.href = path + url;
      link.dataset.absolute = true;
    });
  }
// #endregion

/** */
  export function $(selector = '*', root = document) {
    const all = selector instanceof Array;
    if (all) selector = selector[0];

    let element = select(selector, root, all);
    if (empty(element, all) && root.shadowRoot) element = select(selector, element.shadowRoot, all);
    if (empty(element, all) ) {
      const children = [...root.children];
      for (let index = 0; index < children.length; ++index) {
        const shadow = children[index].shadowRoot;
        if (shadow) element = $(all ? [selector] : selector, shadow);
        if (!empty(element, all)) break;
      }
    }

    if (empty(element, all)) {
      const children = [...root.querySelectorAll('link')]
        .filter(link => link.import instanceof Document);

      for (let index = 0; index < children.length; ++index) {
        const imported = children[index].import;
        element = $(all ? [selector] : selector, imported);
        if (!empty(element, all)) break;
      }
    }

    return result(element, all);
  }

/** */
  function select(selector = '*', root = document, all = false) {
    return all
      ? root.querySelectorAll(selector)
      : root.querySelector(selector);
  }

/** */
  function empty(element, all) {
    return all
      ? element.length === 0
      : element === null;
  }

/** */
  function result(element, all) {
    return all
      ? empty(element, all)
        ? []
        : [...element]
      : empty(element, all)
        ? null
        : element;
  }


/*
// теоретически, было
get opened() {
    return this.getAttribute("opened") !== null;
}
set opened(value) {
    if (!!value) {
        this.setAttribute("opened", "");
    } else {
        this.removeAttribute("opened");
    }
}
// теоретически, стало
properties = {
    opened: {
        type: Boolean,
    },
}
*/
