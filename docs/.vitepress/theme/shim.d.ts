declare module '*.vue' {
  import {DefineComponent} from 'vue';
  const component: DefineComponent<null, null, any>;
  export default component;
}