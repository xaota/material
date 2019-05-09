import Deferred from './Deferred.js'

const root = document.head;
const templates = Object.create(null);

/** */
  export default async function Template({name, href, base}, prefix = 'template-') {
    name = prefix + name;
    if (!has(name)) await load(name, href, base);
    return get(name);
  }

// #region [Private]
  /** */
    async function load(name, href, base) {
      if (name in templates) return await templates[name];
      const template = await web(href, base, name);
      stylesheets(template, base);
      add(name, template);
    }

  /** */
    function has(name) {
      return dom(name) !== null;
    }

  /** */
    function get(name) {
      const template = dom(name);
      return template.content.cloneNode(true);
    }

  /** */
    function dom(name) {
      return root.querySelector('#' + name);
    }

  /** */
    async function web(href, base, name) {
      href = path(href, base);
      templates[name] = new Deferred();
      const data = await fetch(href);
      const text = await data.text();
      const tree = new DOMParser();
      const html = tree.parseFromString(text, "text/html");
      templates[name].resolve(name);
      return html.getElementsByTagName('template')[0];
    }

  /** */
    function add(name, template) {
      if (has(name)) return; // !
      template.id = name;
      root.appendChild(template);
    }

  /** */
    function path(href, base) {
      return new URL(href, base).href;
    }

  /** */
    function stylesheets(template, base) {
      const selector = 'link[rel="stylesheet"]:not([data-absolute]):not([href^="/"])';
      const sheets = template.content.querySelectorAll(selector);
      sheets.forEach(sheet => {
        const href = sheet.getAttribute('href');
        const link = path(href, base);
        sheet.href = link;
        sheet.dataset.absolute = true;
      });
    }
// #endregion
