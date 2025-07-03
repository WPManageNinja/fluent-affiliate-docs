<template>
  <div class="image-wrapper">
    <div class="image-container" :class="{ clicked: isZoomed }" @click.stop="toggleZoom">
      <div class="image-padding-wrapper">
        <img 
          :src="src" 
          :alt="alt"
          ref="img"
        />
      </div>
    </div>
    <div v-if="isZoomed" class="overlay" @click.stop="toggleZoom"></div>
  </div>
</template>

<script>
export default {
  name: 'ZoomableImage',
  props: {
    src: String,
    alt: String
  },
  data() {
    return {
      isZoomed: false,
      justOpened: false
    }
  },
  methods: {
    toggleZoom(e) {
      e.stopPropagation();
      
      if (this.isZoomed) {
        this.closeZoom();
      } else {
        this.openZoom();
      }
    },
    openZoom() {
      this.isZoomed = true;
      this.justOpened = true;
      
      this.$nextTick(() => {
        this.centerImageInViewport();
        // Prevent scroll-close for a short time after opening to avoid layout-triggered closes
        setTimeout(() => {
          this.justOpened = false;
        }, 200);
      });
    },
    closeZoom() {
      this.isZoomed = false;
      this.justOpened = false;
      
      // Reset transform when closing
      if (this.$refs.img) {
        this.$refs.img.style.transform = '';
      }
    },
    centerImageInViewport() {
      if (!this.$refs.img) return;
      
      const img = this.$refs.img;
      const imgRect = img.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Use different scale factors for mobile and desktop
      const isMobile = viewportWidth <= 767;
      const scaleFactor = isMobile ? 2.05 : 2.1;
      
      // Calculate the center of the viewport
      const viewportCenterY = viewportHeight / 2;
      const viewportCenterX = viewportWidth / 2;
      
      // Calculate the offset needed to center the scaled image in viewport
      const translateY = viewportCenterY - (imgRect.top + imgRect.height / 2);
      const translateX = viewportCenterX - (imgRect.left + imgRect.width / 2);
      
      // Apply transform with scale and translate
      img.style.transform = `scale(${scaleFactor}) translate(${translateX / scaleFactor}px, ${translateY / scaleFactor}px)`;
    },
    handleScroll() {
      // Don't close if the image just opened (prevents layout-triggered scroll from closing)
      if (this.isZoomed && !this.justOpened) {
        this.closeZoom();
      }
    },
    handleClickOutside(e) {
      if (this.isZoomed && !this.$el.contains(e.target)) {
        this.closeZoom();
      }
    },
    handleResize() {
      if (this.isZoomed) {
        this.centerImageInViewport();
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style>
.image-wrapper {
  position: relative;
  width: 100%;
  margin: 16px 0;
}

.image-container {
  position: relative;
  z-index: 1;
}

.image-padding-wrapper {
  padding: 0;
  transition: padding 0.3s ease;
}

.image-container img {
  height: auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
  margin: 0 auto;
  cursor: zoom-in;
  transform-origin: center center;
}

.image-container.clicked {
  z-index: 999999;
  position: relative;
}

.image-container.clicked .image-padding-wrapper {
  padding: 50px;
}

.image-container.clicked img {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: zoom-out;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999998;
  transition: opacity 0.3s ease;
}

@media (max-width: 767px) {
  .image-container.clicked .image-padding-wrapper {
    padding: 20px; /* Less padding on mobile for better visibility */
  }
}
</style>