/*
 * Pickle store custom components.
 * - <pickle-slider>: horizontal scroll-snap carousel with prev/next buttons
 * - <pickle-tabs>: accessible tabs (WAI-ARIA tabs pattern)
 * - <pickle-reel>: muted autoplay video that pauses off-screen, with a sound toggle
 * - <pickle-back-to-top>: floating button that appears after scrolling
 */

if (!customElements.get('pickle-slider')) {
  class PickleSlider extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('[data-track]');
      this.prev = this.querySelector('[data-prev]');
      this.next = this.querySelector('[data-next]');
      if (!this.track) return;

      this.onScroll = this.updateButtons.bind(this);
      this.track.addEventListener('scroll', this.onScroll, { passive: true });
      this.prev?.addEventListener('click', () => this.scrollByPage(-1));
      this.next?.addEventListener('click', () => this.scrollByPage(1));

      this.resizeObserver = new ResizeObserver(() => this.updateButtons());
      this.resizeObserver.observe(this.track);
      this.updateButtons();
    }

    disconnectedCallback() {
      this.track?.removeEventListener('scroll', this.onScroll);
      this.resizeObserver?.disconnect();
    }

    scrollByPage(direction) {
      const item = this.track.querySelector('[data-item]');
      const gap = parseFloat(getComputedStyle(this.track).columnGap) || 0;
      const itemWidth = item ? item.getBoundingClientRect().width + gap : this.track.clientWidth;
      const perPage = Math.max(1, Math.floor((this.track.clientWidth + gap) / itemWidth));
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.track.scrollBy({ left: direction * perPage * itemWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    updateButtons() {
      const maxScroll = this.track.scrollWidth - this.track.clientWidth - 2;
      const overflowing = maxScroll > 0;
      this.classList.toggle('is-static', !overflowing);
      if (this.prev) this.prev.disabled = this.track.scrollLeft <= 2;
      if (this.next) this.next.disabled = this.track.scrollLeft >= maxScroll;
    }
  }
  customElements.define('pickle-slider', PickleSlider);
}

if (!customElements.get('pickle-tabs')) {
  class PickleTabs extends HTMLElement {
    connectedCallback() {
      this.tabs = Array.from(this.querySelectorAll('[role="tab"]'));
      this.panels = Array.from(this.querySelectorAll('[role="tabpanel"]'));
      this.tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => this.select(index));
        tab.addEventListener('keydown', (event) => this.onKeydown(event, index));
      });
    }

    onKeydown(event, index) {
      const last = this.tabs.length - 1;
      let target = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = index === last ? 0 : index + 1;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = index === 0 ? last : index - 1;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = last;
      if (target === null) return;
      event.preventDefault();
      this.select(target);
      this.tabs[target].focus();
    }

    select(index) {
      this.tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', selected);
        tab.tabIndex = selected ? 0 : -1;
        this.panels[i]?.toggleAttribute('hidden', !selected);
      });
      // Pause any video in panels that were hidden
      this.panels.forEach((panel) => {
        if (panel.hidden) panel.querySelectorAll('video').forEach((video) => video.pause());
      });
    }
  }
  customElements.define('pickle-tabs', PickleTabs);
}

if (!customElements.get('pickle-reel')) {
  class PickleReel extends HTMLElement {
    connectedCallback() {
      this.video = this.querySelector('video');
      this.soundButton = this.querySelector('[data-sound]');
      if (!this.video) return;

      this.video.muted = true;
      this.video.playsInline = true;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !reduceMotion) {
              this.video.play().catch(() => {});
            } else {
              this.video.pause();
            }
          });
        },
        { threshold: 0.4 }
      );
      this.observer.observe(this);

      this.soundButton?.addEventListener('click', () => {
        const unmute = this.video.muted;
        // Only one reel plays sound at a time
        if (unmute) {
          document.querySelectorAll('pickle-reel').forEach((reel) => reel !== this && reel.mute());
        }
        this.video.muted = !unmute;
        if (unmute) this.video.play().catch(() => {});
        this.soundButton.setAttribute('aria-pressed', unmute);
        this.classList.toggle('is-unmuted', unmute);
      });
    }

    mute() {
      if (!this.video) return;
      this.video.muted = true;
      this.soundButton?.setAttribute('aria-pressed', 'false');
      this.classList.remove('is-unmuted');
    }

    disconnectedCallback() {
      this.observer?.disconnect();
    }
  }
  customElements.define('pickle-reel', PickleReel);
}

if (!customElements.get('pickle-back-to-top')) {
  class PickleBackToTop extends HTMLElement {
    connectedCallback() {
      this.button = this.querySelector('button');
      this.onScroll = () => this.classList.toggle('is-visible', window.scrollY > 600);
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.button?.addEventListener('click', () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        document.querySelector('#MainContent')?.focus({ preventScroll: true });
      });
      this.onScroll();
    }

    disconnectedCallback() {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
  customElements.define('pickle-back-to-top', PickleBackToTop);
}
