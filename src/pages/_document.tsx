import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { initializeStore, AppState } from "../state";
import { getSnapshot } from "mobx-state-tree";

interface Props {
  initialState: AppState;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const store = initializeStore();
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      initialState: getSnapshot(store),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__=${JSON.stringify(
                this.props.initialState
              )};`,
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
