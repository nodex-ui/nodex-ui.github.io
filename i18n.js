import { init } from "nodexui/i18n";

// Sets up the shared Nodex UI i18n service for the examples app (its languages and where the choice is remembered),
// then hands the service to every example component, so they keep importing `t` and `loadCatalog` from one local file.
init({
  languages: [
    { code: "en", label: "English" },
    { code: "vi", label: "Tiếng Việt" },
  ],
  storageKey: "b-example-lang",
});

export * from "nodexui/i18n";
