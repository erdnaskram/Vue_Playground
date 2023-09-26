const app = Vue.createApp({
  data() {
    return {};
  },
  methods: {},
});

app.component("generated-form", {
  template: `
  <li :class="input_field"><h3>DropIT</h3> <select> <option value="tester">tester</option><option value=" bla"> bla</option><option value=" lala"> lala</option> </select></li><li :class="input_field"><h3>Vorname</h3> <input type="text" v-model="input_data" /></li><li :class="date_field"><<h3>Next Date</h3> <input type="date" id="start" name="start" :min="2022-01-01" :max="2025-01-01"></li>
    
  
  `,
  data() {
    return {
    };
  },
  methods: {
    //$Methods
  },
  watch: {
    //$Watch

  },
  computed: {
    //$Computed

  },
});

app.mount("#app");