import '../styles/globals.scss'
import 'antd/dist/antd.css';
import awsconfig from '../src/aws-exports';
import Amplify, { Auth } from 'aws-amplify';
import { persistedStore, store } from '../src/Redux/Store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Router } from 'next/dist/client/router';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure({ ...awsconfig, ssr: true });
NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}><Component {...pageProps} /></PersistGate></Provider>
}

export default withAuthenticator(MyApp)
