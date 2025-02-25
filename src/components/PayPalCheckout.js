import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const PayPalCheckout = ({ amount, currency, onSuccess, onCancel }) => {
  const webViewRef = useRef(null);
  const client_Id = "AfFJu5pzS0Hr9b1yhEy8zdNAicYelsy11CdA5aq8xow4WhN_z72Pkpb2K-T9ZCHGmgrzKuQgSgwoFeAv";

  const htmlContent = `
    <html>
    <head>
      // <script src="https://www.paypal.com/sdk/js?client-id=${client_Id}&currency=${currency}"></script>
      <style>
        body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
        #paypal-button-container { width: 100%; max-width: 400px; }
      </style>
    </head>
    <body>
      <div id="paypal-button-container"></div>
      <script>
        paypal.Buttons({
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [{ amount: { value: '${amount}' } }]
            });
          },
          onApprove: function(data, actions) {
            actions.order.capture().then(function(details) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ status: "success", details }));
            });
          },
          onCancel: function(data) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ status: "cancel" }));
          }
        }).render('#paypal-button-container');
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        javaScriptEnabled
        style={styles.webview}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.status === "success") {
            onSuccess(data.details);
          } else if (data.status === "cancel") {
            onCancel();
          }
        }}
      />
    </View>
  );
};

export default PayPalCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
