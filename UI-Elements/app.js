const app = Vue.createApp({
  data() {
    return {
      abbo1: true,
      abbo2: true,
      imageSrc: '/UI-Elements/assets/img/505-200x200.jpg',
    };
  },
  methods: {
    toggleAbbo1() {
      this.abbo1 = !this.abbo1;
    },
    toggleAbbo2() {
      this.abbo2 = !this.abbo2;
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
});

app.mount('#app');
