import DefaultTheme from 'vitepress/theme';
import './custom.css';
import ZoomableImage from './components/ZoomableImage.vue';
import { generateSchema } from './schema.js';
import Feedback from './components/Feedback.vue' // Import the file for feedback widget
import Layout from './Layout.vue' // Import new layout file


export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Feedback', Feedback)
    // Register ZoomableImage component globally
    // This ensures it's available for markdown rendering
    if (!app.component('ZoomableImage')) {
      app.component('ZoomableImage', ZoomableImage)
    }
  }
}