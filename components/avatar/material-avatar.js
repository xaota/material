import Material from '../../script/Material.js'

const component = Material.meta(import.meta.url, 'material-avatar');
/**
  *
  */
  export default class MaterialAvatar extends Material {
  /**
    *
    */
    constructor() {
      super(component);
    }

    mount(content) {
      update(content, this.src);
    }

    static get observedAttributes() {
      return ['src', 'size'];
    }

    attributeChangedCallback(name, previous, current) {
      if (name === 'src')  update(this.shadowRoot, current);
      if (name === 'size') resize(this, current);
    }

    /** */
      get src() {
        return this.getAttribute("src");
      }

    /** */
      set src(value) {
        !!value
          ? this.setAttribute("src", value)
          : this.removeAttribute("src");
      }

    /** */
      get size() {
        return this.getAttribute("size");
      }

    /** */
      set size(value) {
        !!value
          ? this.setAttribute("size", value)
          : this.removeAttribute("size");
      }
  }

Material.define(component, MaterialAvatar);

/** */
  function update(root, src) {
    const image = root.querySelector('img');
    if (!image) return;
    image.src = src;
  }

/** */
  function resize(root, size) {
    root.style.setProperty('--size', size);
  }
