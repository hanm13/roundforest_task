import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => ({
          ...sheet.collectStyles(<App {...props} />), ...sheets.collect(<App {...props} />)
        })
      });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
            <React.Fragment>
            {sheets.getStyleElement()}
            {sheet.getStyleElement()}
            {flush() || null}
            </React.Fragment>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
    <Html lang="en" dir="ltr">
    <Head>
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="Dog Trainers"></meta>
    {/* PWA primary color */}
    <meta name="theme-color" content={'#684eed'} />
    <meta property="og:image" content="./icons/favicon.ico" />
    <link rel="shortcut icon" href="./icons/favicon.ico" />
    <link rel="manifest" href="manifest.json" />
    <script async type="text/javascript" src={`errlog.js`} />
    </Head>
    <body dir="ltr">
    <Main />
    <NextScript />
    </body>
    </Html>
  );
  }
}

export default MyDocument;