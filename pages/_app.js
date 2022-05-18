import '../styles/globals.css';

const AmsExampleApp = ({ Component, pageProps }) => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Component {...pageProps} />
    </div>
  );
};

export default AmsExampleApp;
