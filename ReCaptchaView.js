import React from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';

const getWebviewContent = (siteKey) => {
  const originalForm = '<!DOCTYPE html><html><head>' +
    '<style>  .text-xs-center { text-align: center; } .g-recaptcha { display: inline-block; } </style>' +
    '<script src="https://www.google.com/recaptcha/api.js"></script>' +
    '<script type="text/javascript"> var onloadCallback = function() { }; ' +
    'var onDataCallback = function(response) { window.postMessage(response);  }; ' +
    'var onDataExpiredCallback = function(error) {  window.postMessage("expired"); }; ' +
    'var onDataErrorCallback = function(error) {  window.postMessage("error"); } </script>' +
    '</head><body>' +
    '<div class="text-xs-center"><div class="g-recaptcha" ' +
    'data-sitekey="' + siteKey + '" data-callback="onDataCallback" ' +
    'data-expired-callback="onDataExpiredCallback" ' +
    'data-error-callback="onDataErrorCallback"></div></div></body></html>';
  return originalForm;
}

const ReCaptchaView = ({
  onSuccess,
  onExpired,
  onError,
  siteKey,
  containStyle,
  title,
  description,
  url
}) => (
    <WebView
      ref={(ref) => { this.webview = ref; }}
      mixedContentMode={'always'}
      onMessage={(event) => {
        if (!event) return;
        const data = event.nativeEvent.data;
        console.log(data);
        if (!data) return;
        if (data === 'expired') {
          onExpired();
        } else if (data === 'error') {
          onError();
        } else {
          onSuccess(data);
        }
      }}
      javaScriptEnabled
      automaticallyAdjustContentInsets
      style={[{ backgroundColor: 'transparent', height: 500 }]}
      source={{
        html: getWebviewContent(siteKey),
        baseUrl: url
      }}
    />
  );

ReCaptchaView.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  onExpired: PropTypes.func,
  siteKey: PropTypes.string.isRequired,
  containStyle: PropTypes.any,
  url: PropTypes.string
};

ReCaptchaView.defaultProps = {
  autoHeight: true,
  onError: () => { },
  onSuccess: () => { },
  onExpired: () => { },
  title: '',
  description: '',
  url: ''
};

export default ReCaptchaView;
