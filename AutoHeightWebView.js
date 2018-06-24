/**
 * Custom WebView with autoHeight feature
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop ...props
 *
 * @author Elton Jain
 * @author ManhNV
 * @version v1.0.2
 */

import React, { Component } from 'react';
import {
  View,
  Dimensions,
  WebView,
} from 'react-native';
import PropTypes from 'prop-types';

const injectedScript = function () {
  function waitForBridge() {
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 200);
    }
    else {
      let height = 0;
      if (document.documentElement.clientHeight > document.body.clientHeight) {
        height = document.documentElement.clientHeight
      }
      else {
        height = document.body.clientHeight
      }
      postMessage(height)
    }
  }
  waitForBridge();
};

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



export default class AutoHeightWebView extends Component {
  state = {
    webViewHeight: Number
  };

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onExpired: PropTypes.func.isRequired,
    defaultHeight: PropTypes.number,
    autoHeight: PropTypes.bool,
    url: PropTypes.string.isRequired,
    siteKey: PropTypes.string.isRequired
  }

  static defaultProps = {
    autoHeight: true,
    onError: () => null,
    onExpired: () => null,
    onSuccess: () => null
  }

  constructor(props) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight
    }
    this._onMessage = this._onMessage.bind(this);
  }

  _onMessage(e) {
    if (e && e.nativeEvent && e.nativeEvent.data) {
      const val = e.nativeEvent.data;
      if (!isNaN(val)) {
        this.setState({
          webViewHeight: parseInt(val)
        });
      } else if (val === 'expired') {
        this.props.onExpired();
      } else if (val === 'error') {
        this.props.onError();
      } else {
        this.props.onSuccess(val);
      }
    }
  }

  stopLoading() {
    this.webview.stopLoading();
  }

  render() {
    const _w = this.props.width || Dimensions.get('window').width;
    const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        injectedJavaScript={'(' + String(injectedScript) + ')();' +
          'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');'}
        scrollEnabled={this.props.scrollEnabled || false}
        onMessage={this._onMessage}
        javaScriptEnabled
        automaticallyAdjustContentInsets
        /* {...this.props} */
        style={[{ width: _w }, this.props.style, { height: _h }]}
        source={{
          html: getWebviewContent(this.props.siteKey),
          baseUrl: this.props.url
        }}
      />
    )
  }
}