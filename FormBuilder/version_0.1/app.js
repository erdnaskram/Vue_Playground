const app = Vue.createApp({
  data() {
    return {
      input: "",
      inputTypes: [
        {
          name: "Input",
          type: "builders-field-input",
        },
        {
          name: "Dropdown",
          type: "builders-field-dropdown",
        },
        {
          name: "Radio",
          type: "builders-field-radio",
        },
        {
          name: "Button",
          type: "builders-field-button",
        },
      ],
      inputFields: [
        {
          name: "Vorname",
          type: "builders-field-input",
          options: [],
        },
        {
          name: "NaTextme",
          type: "builders-field-input",
          options: [],
        },
      ],
    };
  },
  methods: {
    addField() {
      this.inputFields.push({
        name: "-",
        type: "builders-field-input",
        options: [],
      });
    }
  },
});

app.component("builders-option", {
  template: `
      <li>
      <strong>Art:</strong>
        <select v-model="parameters.type">
          <option value="builders-field-input">Input</option>
          <option value="builders-field-select">Dropdown</option>
          <option value="builders-field-radio">Radio</option>
          <option value="builders-field-button">Button</option>
        </select><br/>
        Titel:
        <input v-model="parameters.name" type="text" />
      <br><br><button @click="deleteDetail">Löschen</button>
      </li>
    `,
  data() {
    return {
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
});

app.component("builders-field", {
  template: `
    <li :key="friend.id">
        <h2>{{ friend.name }}</h2>
        <button @click="toggleDetails">
            {{ detailsAreVisible ? 'Hide' : 'Show'}} Details
        </button>
        <ul v-if="detailsAreVisible">
            <li><strong>Phone:</strong> {{ friend.phone }}</li>
            <li><strong>Email:</strong> {{ friend.email }}</li>
        </ul>
    </li>
    `,
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: "susan",
        name: "Susan Lee",
        phone: "+49 162 45678901",
        email: "susan.lee@outlook.com",
      },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
});

app.component("builders-field-input", {
  template: `
        <h3>{{ parameters.name }}</h3>
        <input type="text" />
    `,
  data() {
    return {
      titel: "Geben sie ihren Namen ein",
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
});

app.component("builders-field-select", {
  template: `
      <h3>{{ parameters.name }}</h3>
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    `,
  data() {
    return {
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
});

app.component("builders-field-radio", {
  template: `
    <h3>{{ parameters.name }}</h3>
      <input type="radio" id="yes" value="true">
      <label for="yes">Ja</label>
      <input type="radio" id="no" value="false">
      <label for="no">Nein</label>
    `,
  data() {
    return {
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
});

app.component("builders-field-button", {
  template: `
      <h3>{{ parameters.name }}</h3>
      <button @click="toggleDetails">Submit</button>
    `,
  data() {
    return {
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
});

app.mount("#app");
