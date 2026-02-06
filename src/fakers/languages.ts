import shuffle from "lodash/shuffle";

export interface Language {
  name: string;
  code: string;
}

const fakers = {
  fakeLanguages() {
    const languages: Array<Language> = [
      { name: "English", code: "en" },
      { name: "Spanish", code: "es" },
      { name: "French", code: "fr" },
      { name: "German", code: "de" },
      { name: "Chinese", code: "zh" },
    ];

    return shuffle(languages);
  },
};

export default fakers;
