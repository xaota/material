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
      const src = this.src;
      update(content, src);
    }

    static get observedAttributes() {
      return ['src'];
    }

    attributeChangedCallback(name, previous, current) {
      update(this.shadowRoot, current);
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
  }

Material.define(component, MaterialAvatar);

function update(root, src) {
  const image = root.querySelector('img');
  if (!image) return;
  image.src = src;
}
