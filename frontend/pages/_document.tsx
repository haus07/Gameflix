import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <div id="hover-layer"></div> {/* Portal layer cho hover card */}
        <NextScript />
      </body>
    </Html>
  );
}
