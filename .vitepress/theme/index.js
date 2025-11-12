import DefaultTheme from 'vitepress/theme';
import './custom.css';
// import ZoomableImage from './components/ZoomableImage.vue';
import { generateSchema } from './schema.js';

export default {
  extends: DefaultTheme,
  enhanceAppWithTabs({ app }) {
    // Add global SEO enhancements
  }
};