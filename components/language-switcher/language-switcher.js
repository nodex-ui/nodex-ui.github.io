import { Component, xml } from "nodexui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, Icon } from "nodexui";
import { currentLanguage, languages, loadCatalog, setLanguage, t } from "../../i18n.js";

await loadCatalog(import.meta.url);

/** An icon button for the page header that opens a list of languages; picking one reloads the page in it. */
export class LanguageSwitcher extends Component {
  static components = { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, Icon };
  static template = xml`
    <DropdownMenu>
      <DropdownMenuTrigger className="'btn-icon'">
        <Icon name="'languages'"/>
        <span class="visually-hidden" t-esc="t('Language')"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="'end'">
        <DropdownMenuRadioGroup value="current" onValueChange="(code) => this.changeLanguage(code)">
          <DropdownMenuRadioItem t-foreach="languages" t-as="item" t-key="item.code" value="item.code"><t t-esc="item.label"/></DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>`;

  t = t;
  languages = languages();
  current = currentLanguage();

  /** Remembers the chosen language and reloads, so every text is drawn again in it. */
  changeLanguage(code) {
    setLanguage(code);
  }
}
