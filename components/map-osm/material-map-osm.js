import Material from '../../script/Material.js';

import LatLng from './LatLng.js';

const component = Material.meta(import.meta.url, 'material-map-osm');
const updateAttribute = {
  /** */
  // disabled(root, value) {Material.updateChildrenAttribute(root, '*', 'disabled', value)}
  /** */
    // zoom
};

/** OSM карта @class
  * @description Элемент для показа карты на основе данных OpenStreetMap
  */
  export default class MaterialMapOSM extends Material {
  /** Создание компонента {MaterialMapOSM} @constructor
    *
    */
    constructor() {
      super(component);
    }

  /** Отслеживаемые атрибуты / observedAttributes @readonly @static
    * @return {array} список изменяемых атрибутов компонента
    */
    static get observedAttributes() {
      // return [''];
      return Object.keys(updateAttribute);
    }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {HTMLElement} node ShadowRoot узел элемента
    * @return {MaterialMapOSM} @this
    */
    mount(node) {
      super.mount(node, updateAttribute);
      const root = node.querySelector('#map');
      const resizeObserver = new ResizeObserver(entries => {
        const height = this.getBoundingClientRect().height;
        root.style.height = height + 'px';
        const store = this.store();
        const map = store.map;
        if (!map) return;
        setTimeout(() => map.invalidateSize(), 400);
        // L.Map.invalidateSize();

      });
      resizeObserver.observe(this);

      const store = this.store();
      if (store.L) setTimeout(() => this.init(), 100);

      return this;
    }

  /** */
    init() {
      const store = this.store();
      const L = store.L;
      if (!L) return console.error('not L');
      console.log(L);
      const node = this.shadowRoot;
      const root = node.querySelector('#map');

      const position = new LatLng(this.latitude, this.longitude);
      const map = L.sm.map(root, {center: position.array, zoom: this.zoom});
      this.store({map});

      return this;
    }

  /** Обновление отслеживаемого атрибута / attributeChangedCallback @lifecycle
    * @param {string} name     Название атрибута
    * @param {string} previous Предыдущее значение ?null
    * @param {string} current  Устанавливаемое значение
    */
    attributeChangedCallback(name, previous, current) {
      const root = this.shadowRoot;
      if (current !== previous && (name in updateAttribute)) {
        updateAttribute[name].call(this, root, current, previous);
      }
    }

  /** Является ли узел элементом {MaterialMapOSM} / is @static
    * @param {HTMLElement} node проверяемый узел
    * @return {boolean} node instanceof MaterialMapOSM
    */
    static is(node) {
      return Material.is(node, MaterialMapOSM);
    }
  }

Material.attributes(MaterialMapOSM, 'zoom', 'latitude', 'longitude');
// Material.properties(MaterialMapOSM);
Material.define(component, MaterialMapOSM);
