# react-native-recaptcha
Implement ReCaptch google v2 to react-native project


Usage:
```
<ReCaptchaView
    onSucess={(val) => console.log('success: ' + val)}
    onError={() => console.log('error')}
    onExpired={() => console.log('expired')}
    siteKey="6LcxWV4UAAAAAMYZC7ge5gEgP_QWle44hyvCIARl"
    url='http://your-domain.com'
/>
