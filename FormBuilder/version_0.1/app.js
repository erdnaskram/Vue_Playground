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
          showBuildersOption: false,
        },
        {
          name: "NaTextme",
          type: "builders-field-input",
          options: [],
          showBuildersOption: true,
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
        showBuildersOption: false,
      });
    },
  },
});

app.component("builders-option", {
  template: `
  <li>
    <strong>Art:</strong>
    <select v-model="typeValue">
      <option value="builders-field-input">Input</option>
      <option value="builders-field-select">Dropdown</option>
      <option value="builders-field-radio">Radio</option>
      <option value="builders-field-button">Button</option>
    </select><br/>
    Titel:
    <input v-model="nameValue" type="text" />
    <br><br>
    <button @click="deleteDetail">Löschen</button>
  </li>
    `,
  data() {
    return {
      type: "",
      name: "",
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
      // Add the .sync modifier to the parameters prop
      // to enable two-way binding
      default: () => ({})
    },
  },
  methods: {
    deleteDetail() {
      // Implement delete functionality here
    },
  },
  computed: {
    typeValue() {
      return this.parameters ? this.parameters.type : "";
    },
    nameValue() {
      return this.parameters ? this.parameters.name : "";
    },
  },
});

app.component("builders-field", {
  template: `
  <li>
    <button @click="toggelBuildersOptions" class="options-button">&vellip;</button>
    <!-- Pass the parameters prop to the builders-option component using the .sync modifier -->
    <builders-option v-show="parameters.showBuildersOption"
    :parameters.sync="parameters"></builders-option>
    <slot></slot>
  </li>
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
      default: () => ({})
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
    toggelBuildersOptions() {
      console.log(this.parameters.showBuildersOption);
      this.parameters.showBuildersOption = !this.parameters.showBuildersOption;
      this.$forceUpdate();
    }
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
      this.$emit("input", event.target.value);
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
    return {};
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
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
    return {};
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
});

app.component("builders-field-button", {
  template: `
      <h3>{{ parameters.name }}</h3>
      <button @click="toggleDetails">Submit</button>
    `,
  data() {
    return {};
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
});

app.mount("#app");
