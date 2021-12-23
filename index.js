import { registerRootComponent } from 'expo';
import App from './App';
registerRootComponent(App);

function registerRootComponent(component) {
    AppRegistry.registerComponent('main', () => component);
}