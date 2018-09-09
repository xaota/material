const root = document.head;

/** */
  export default async function Template({name, href, base}, prefix = 'template-') {
    name = prefix + name;
    if (!has(name)) {
      const template = await web(href, base);
      stylesheets(template, base);
      add(name, template);
    }
    return get(name);
  }

// #region [Private]
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
    async function web(href, base) {
      href = path(href, base);
      const data = await fetch(href);
      const text = await data.text();
      const tree = new DOMParser();
      const html = tree.parseFromString(text, "text/html");
      return html.getElementsByTagName('template')[0];
    }

  /** */
    function add(name, template) {
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
