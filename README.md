# react-native-recaptcha
Implement ReCaptch google v2 to react-native project


## Usage:
### 1. ReCaptchaView
```
export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <ReCaptchaView
          onMessage={this.onMessage}
          siteKey="6LcxWV4UAAAAAMYZC7ge5gEgP_QWle44hyvCIARl"
          url='http://your-domain.com'
        />
      </View>
    );
  }

  onMessage = (event) => {
    if (!event) return;
    const data = event.nativeEvent.data;
    console.log(data);
    if (!data) return;
    if (data === 'expired') {
      // onExpired();
    } else if (data === 'error') {
      // onError();
    } else {
      // onSuccess(data);
    }
  }
}
```
### 2. AutoHeightWebView

```
export default class App extends Component {
  render() {
    return (
      <View style={{flex:1, paddingTop: 30}}>
        <AutoHeightWebView
          onSuccess={(val)=>{
              alert(val);
          }}
          onError={()=> {
              alert('Error');
          }}
          onExpired={()=>{
              alert('Expired');
          }}
          siteKey="6LcxWV4UAAAAAMYZC7ge5gEgP_QWle44hyvCIARl"
          url="http://your-domain.com"
        />
      </View>
    );
  }

  onMessage = (event) => {
    if (!event) return;
    const data = event.nativeEvent.data;
    console.log(data);
    if (!data) return;
    if (data === 'expired') {
      // onExpired();
    } else if (data === 'error') {
      // onError();
    } else {
      // onSuccess(data);
    }
  }
}
```
