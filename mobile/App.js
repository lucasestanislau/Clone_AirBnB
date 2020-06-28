import React from 'react';
import {YellowBox} from 'react-native';
import Routes from './src/routes';
/* tempo video mobile 1:01:58*/

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return <Routes />
}
 