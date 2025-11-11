import i18n from '../language';
export const applyLanguage = (lang: string) => {
  void i18n.changeLanguage(lang);
};
