import Button from './button/index';
import SFCButton from './SFCButton/index.vue';
import JSXButton from './JSXButton/index';
import {App} from 'vue';

export {Button, SFCButton, JSXButton};

export default {
  install(app: App) {
    app.component(Button.name, Button);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
  },
};
