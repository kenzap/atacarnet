// parse backend error to frontend
// taking this structire for prototype http://i18njs.com/#language_files
export let i18n = {

    state: {
        locale: null,
    },
    init: (locale) => { 
    
        i18n.state.locale = locale;
    },
    __: (text) => {

        if(i18n.state.locale.values[text] === undefined) return text;

        return i18n.state.locale.values[text];
    }
}