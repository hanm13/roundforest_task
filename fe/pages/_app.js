import React, {useEffect} from 'react';
import App from 'next/app';
import Head from 'next/head';
import { create } from 'jss';
import { ThemeProvider as ScThemProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { jssPreset, StylesProvider } from '@material-ui/styles';
import { ThemeProvider} from '@material-ui/core/styles';
import { GlobalStyle } from '../styles/globalStyled';
import { Provider } from 'react-redux';
import store from "../../store/index";


// -------------------- I18n --------------------
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {i18nResources} from "../i18n/index";
import LanguageDetector from 'i18next-browser-languagedetector';
const langDetectorOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: '/', sameSite: 'strict' }
};


//I18n Init
i18n
.use(initReactI18next)
.use(LanguageDetector)
.init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: i18nResources,
    fallbackLng: "he",

    interpolation: {
    escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    detection: langDetectorOptions,
});

// -------------------- I18n --------------------

const jss = create({ plugins: [...jssPreset().plugins] });

function MyApp(pageProps) {

  const Component = pageProps.Component;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
    jssStyles.parentNode.removeChild(jssStyles);
    }

    // window.addEventListener('load', () => {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker
    //   .register('./sw.js')
    //   .then(registration => {
    //     console.log('service worker registration successful');
    //   })
    //   .catch(err => {
    //     console.warn('service worker registration failed', err.message);
    //   });
    // }
    // });

  }, []);

  return (
      <React.Fragment>
      <Head>
        <title>Dog Masters</title>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
      </Head>
      <Provider store={store}>
        <StylesProvider jss={jss}>
        {/* Styled components theme provider.*/}
        <ScThemProvider theme={theme}>
          {/* Mui theme provider.*/}
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </ScThemProvider>
        </StylesProvider>
      </Provider>
      </React.Fragment>
      );
}


export default MyApp;