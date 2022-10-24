import { Provider } from "react-redux";
import Script from "next/script";
import Footer from "../components/Footer";
import Header from "../components/Header";
import store from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS});
        `}
      </Script>

      <Provider store={store}>
        <div>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
