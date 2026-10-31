// Sample page translated with the standalone i18n service: no Owl or component library is loaded.
// Run `npm run dev` and open /examples/i18n/ (or add ?lang=vi). Translations: ./i18n/vi.po.
import { init, t, loadCatalog, languages, currentLanguage, setLanguage, translateHead } from "nodexui/i18n";

init({ languages: [{ code: "en", label: "English" }, { code: "vi", label: "Tiếng Việt" }], storageKey: "b-example-lang" });
await loadCatalog(import.meta.url);

let clicks = 0;

// Fills the language list and marks the one in use.
function renderSwitcher() {
  const select = document.getElementById("language");
  select.innerHTML = languages()
    .map((item) => `<option value="${item.code}"${item.code === currentLanguage() ? " selected" : ""}>${item.label}</option>`)
    .join("");
  select.addEventListener("change", () => setLanguage(select.value));
}

// Writes every visible text through t(), so it follows the chosen language.
function renderTexts() {
  document.getElementById("language-label").textContent = t("Language");
  document.getElementById("title").textContent = t("Welcome to the i18n example");
  document.getElementById("greeting").textContent = t("Hello {name}, nice to meet you.", { name: "An" });
  document.getElementById("count").textContent = t("You clicked {count} times.", { count: clicks });
  document.getElementById("more").textContent = t("Click me");
}

translateHead();
renderSwitcher();
renderTexts();
document.getElementById("more").addEventListener("click", () => {
  clicks += 1;
  renderTexts();
});
