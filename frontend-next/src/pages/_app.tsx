import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import ModalProvider from '~/components/Modal/ModalProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}
