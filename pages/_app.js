import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20xmlns:xlink=%22http://www.w3.org/1999/xlink%22%20aria-hidden=%22true%22%20role=%22img%22%20width=%2224%22%20height=%2224%22%20preserveAspectRatio=%22xMidYMid%20meet%22%20viewBox=%220%200%2024%2024%22%3E%3Cpath%20fill=%22currentColor%22%20d=%22m10%2017.55l-1.77%201.72a2.47%202.47%200%200%201-3.5-3.5l4.54-4.55a2.46%202.46%200%200%201%203.39-.09l.12.1a1%201%200%200%200%201.4-1.43a2.75%202.75%200%200%200-.18-.21a4.46%204.46%200%200%200-6.09.22l-4.6%204.55a4.48%204.48%200%200%200%206.33%206.33L11.37%2019A1%201%200%200%200%2010%2017.55ZM20.69%203.31a4.49%204.49%200%200%200-6.33%200L12.63%205A1%201%200%200%200%2014%206.45l1.73-1.72a2.47%202.47%200%200%201%203.5%203.5l-4.54%204.55a2.46%202.46%200%200%201-3.39.09l-.12-.1a1%201%200%200%200-1.4%201.43a2.75%202.75%200%200%200%20.23.21a4.47%204.47%200%200%200%206.09-.22l4.55-4.55a4.49%204.49%200%200%200%20.04-6.33Z%22/%3E%3C/svg%3E" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
