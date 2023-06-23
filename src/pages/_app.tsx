import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Provider } from '../state';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-montserrat: ${montserrat.style.fontFamily};
          }
        `}
      </style>
      <Provider Component={Component} {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
