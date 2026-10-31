import { Button, Component, Label, NativeSelect, useState } from "nodexui";
import { currentLanguage, languages, loadCatalog, setLanguage, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

/** Example for the i18n service: every visible text goes through t(), and picking a language reloads the page in it. */
export class I18nDemo extends Component {
  static components = { Button, Label, NativeSelect };
  static template = "examples.I18nDemo";

  t = t;
  languages = languages();
  current = currentLanguage();

  setup() {
    this.state = useState({ clicks: 0 });
  }

  /** Remembers the chosen language and reloads, so every text is drawn again in it. */
  changeLanguage(code) {
    setLanguage(code);
  }
}
