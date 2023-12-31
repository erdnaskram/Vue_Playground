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
        {
          name: "Datum",
          type: "builders-field-date",
        },
      ],
      inputFields: [
        {
          name: "DropIT",
          type: "builders-field-dropdown",
          options: [
            { name: "Optionen", type: "text", value: "tester; bla; lala;" },
          ],
          showBuildersOption: true,
        },
        {
          name: "Vorname",
          type: "builders-field-input",
          options: [
            { name: "min", type: "number", value: 3 },
            { name: "max", type: "number", value: 20 },
          ],
          showBuildersOption: false,
        },
        {
          name: "Next Date",
          type: "builders-field-date",
          options: [
            { name: "min", type: "date", value: "2022-01-01" },
            { name: "max", type: "date", value: "2025-01-01" },
          ],
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
    moveField(index, direction) {
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < this.inputFields.length) {
        const inputField = this.inputFields[index];
        this.inputFields.splice(index, 1);
        this.inputFields.splice(newIndex, 0, inputField);
      }
    },
    removeField(field) {
      const index = this.inputFields.indexOf(field);
      if (index !== -1) {
        this.inputFields.splice(index, 1);
      }
    },
  },
});

app.component("builders-option", {
  template: `
  <li>
    <strong>Art:</strong>
    <select v-model="parameters.type">
      <option v-for="inputType in input_types" :value="inputType.type">{{ inputType.name }}</option>
    </select><br/>
    Titel:
    <input v-model="parameters.name" type="text" />
    <div v-if="parameters.options.length > 0">

      <p v-for="option in parameters.options">
        <builders-option-regexgenerator v-if="option.type == 'regex'">
        </builders-option-regexgenerator>

        <a v-else >{{ option.name }}:
          <input v-model="option.value" :type="option.type" />
        </a>
      </p>
    </div>
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
      default: () => ({}),
    },
    input_types: {
      type: Array,
      required: true,
    },
    removeField: {
      type: Function,
      required: true,
    },
  },
  methods: {
    deleteDetail() {
      // Rufe die "removeField" Methode auf, die als Prop übergeben wurde
      this.removeField(this.parameters);
    },
  },
  watch: {
    type(newType) {
      this.$emit("update:type", newType);
    },
    "parameters.type"(newType) {
      console.log(newType);
      switch (newType) {
        case "builders-field-input":
          this.parameters.options = [
            { name: "RegEx", type: "regex", value: "" },
          ];
          break;
        case "builders-field-dropdown":
          this.parameters.options = [
            { name: "Optionen", type: "text", value: "" },
          ];
          break;
        case "builders-field-radio":
          this.parameters.options = [
            { name: "Multiselect", type: "bool", value: true },
            { name: "Optionen", type: "list", value: [] },
          ];
          break;
        case "builders-field-button":
          this.parameters.options = [
            { name: "Button Text", type: "text", value: "Button" },
          ];
          break;
        case "builders-field-date":
          this.parameters.options = [
            { name: "min", type: "date", value: "" },
            { name: "max", type: "date", value: "" },
          ];
          break;
      }
    },
  },
});

app.component("builders-field", {
  template: `
  <li>
    <button @click="toggelBuildersOptions" class="options-button">&vellip;</button>
    <!-- Pass the parameters prop to the builders-option component using the .sync modifier -->
    <builders-option
      v-show="parameters.showBuildersOption"
      :parameters.sync="parameters"
      :input_types.sync="input_types"
      @update:type="updateType"
      :remove-field="removeField"
    ></builders-option>
    <slot></slot>
  </li>
  `,
  data() {
    return {
      type: "",
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    input_types: {
      type: Array,
      required: true,
      default: () => [],
    },
    removeField: {
      type: Function,
      required: true,
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
    },
    updateType(newType) {
      this.type = newType;
    },
  },
  mounted() {
    this.type = this.parameters.type;
  },
});

app.component("builders-field-input", {
  template: `
        <h3>{{ parameters.name }}</h3>
        <input type="text" v-model="input_data"
        :class="{ 'valid': input_dataState, 'invalid': !input_dataState }"/>
    `,
  data() {
    return {
      titel: "Geben sie ihren Namen ein",
      input_data: "Hellno",
      showValidation: true,
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  computed: {
    input_dataState() {
      if (this.showValidation) return this.input_dataValidation;
      return null;
    },
    input_dataValidation() {
      return false;
      //return this.input_data.test(this.regex);
    },
    regex() {
      const regexOption = this.parameters.options.find(
        (option) => option.name === "regex"
      );
      return regexOption ? regexOption.value : null;
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
});

app.component("builders-field-dropdown", {
  template: `
      <h3>{{ parameters.name }}</h3>
      <select name="cars" id="cars">
        <option v-for="option in options" :value="option">{{ option }}</option>
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
  computed: {
    options() {
      console.log(
        this.parameters.options.find((option) => option.name === "Optionen")
          .value
      );
      return this.parameters.options
        .find((option) => option.name === "Optionen")
        .value.split(";")
        .filter(function (opt) {
          return opt != "";
        }); // split the options string into an array and remove empty options
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

app.component("builders-field-date", {
  template: `
      <h3>{{ parameters.name }}</h3>
      <input type="date" id="start" name="start"
       :min="minDate" :max="maxDate">
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
  computed: {
    minDate() {
      const minOption = this.parameters.options.find(
        (option) => option.name === "min"
      );
      return minOption ? minOption.value : null;
    },
    maxDate() {
      const maxOption = this.parameters.options.find(
        (option) => option.name === "max"
      );
      return maxOption ? maxOption.value : null;
    },
  },
});

app.component("code-generator", {
  template: `
    <li>
    <button @click="generateCode">Generate Code</button>
    <br>
    <a v-if="generatedCode != ''">{{ generatedCode }}</a>
    </li>
      `,
  data() {
    return {
      generatedCode: "",
    };
  },
  props: {
    parameters: {
      type: Object,
      required: true,
    },
  },
  methods: {
    generateCode() {
      this.generatedCode = this.generateFieldSectionCode();
      console.log(this.parameters);
    },
    generateFieldSectionCode() {
      let code = "";
      this.parameters.forEach((field) => {
        code += this.generateFieldCode(field);
      });
      return code;
    },
    generateFieldCode(field) {
      switch (field.type) {
        case "builders-field-input":
          return this.generateInputFieldCode(field);
        case "builders-field-dropdown":
          return this.generateDropdownFieldCode(field);
        case "builders-field-radio":
          return this.generateRadioFieldCode(field);
        case "builders-field-button":
          return this.generateButtonFieldCode(field);
        case "builders-field-date":
          return this.generateDateFieldCode(field);
      }
    },
    generateInputFieldCode(field) {
      let code = `<li :class="input_field"><h3>$title</h3>
      <input type="text" v-model="input_data"
      /></li>`;

      code = code.replace("$title", field.name);

      return code;
    },
    generateDropdownFieldCode(field) {
      let optionsCode = "";
      let code = `<li :class="input_field"><h3>$title</h3>
      <select>
        $options
      </select></li>`;
      let options = field.options
      .find((option) => option.name === "Optionen")
      .value.split(";")
      .filter(function (opt) {
        return opt != "";
      }); // split the options string into an array and remove empty options

      options.forEach((option) => {
        optionsCode += `<option value="${option}">${option}</option>`;
      });

      code = code.replace("$title", field.name);
      code = code.replace("$options", optionsCode);

      return code;
    },
    generateRadioFieldCode(field) {
      return `<builders-field-radio></builders-field-radio>`;
    },
    generateButtonFieldCode(field) {
      return `<builders-field-button></builders-field-button>`;
    },
    generateDateFieldCode(field) {
      let code = `<li :class="date_field"><<h3>$title</h3>
      <input type="date" id="start" name="start"
       :min="$min" :max="$max"></li>`;
       let min = field.options
      .find((option) => option.name === "min");
      let max = field.options
     .find((option) => option.name === "max");

     code = code.replace("$title", field.name);
     code = code.replace("$min", min.value);
     code = code.replace("$max", max.value);

      return code;
    },
  },
  watch: {
    //$Watch
  },
  computed: {
    //$Computed
  },
});

app.component("builders-option-regexgenerator", {
  template: `
  <div>
  <h3>Noch fehlerhafter RegEx Generator</h3>
    <div>
      <label>
        <input type="checkbox" v-model="options.uppercase" />
        Uppercase
      </label>
      <label>
        <input type="checkbox" v-model="options.lowercase" />
        Lowercase
      </label>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="options.numbers" />
        Numbers
      </label>
      <label>
        <input type="checkbox" v-model="options.whitespaces" />
        Whitespaces
      </label>
    </div>
    <div>
      <label>
        Characters:
        <input type="text" v-model="options.characters" />
      </label>
    </div>
    <div v-if="!options.ignoreMinLength">
      <label>
        Min length:
        <input type="number" v-model="options.minLength" />
      </label>
    </div>
    <div v-if="!options.ignoreMaxLength">
      <label>
        Max length:
        <input type="number" v-model="options.maxLength" />
      </label>
    </div>
    <div>
      <label>
        Ignore min length:
        <input type="checkbox" v-model="options.ignoreMinLength" />
      </label>
    </div>
    <div>
      <label>
        Ignore max length:
        <input type="checkbox" v-model="options.ignoreMaxLength" />
      </label>
    </div>
    <div>
      <button @click="generateRegex">Generate Regex</button>
    </div>
    <div v-if="regex">
      <label>Generated Regex:</label>
      <pre>{{ regex }}</pre>
    </div>
  </div>
  `,
  data() {
    return {
      options: {
        uppercase: false,
        lowercase: false,
        numbers: false,
        whitespaces: false,
        characters: "",
        minLength: null,
        maxLength: null,
        ignoreMinLength: true,
        ignoreMaxLength: true,
      },
      regex: null,
    };
  },
  methods: {
    generateRegex() {
      let regex = "^[";
      if (this.options.uppercase) {
        regex += "A-Z";
      }
      if (this.options.lowercase) {
        regex += "a-z";
      }
      if (this.options.numbers) {
        regex += "0-9";
      }
      if (this.options.whitespaces) {
        regex += "\\s";
      }
      if (this.options.characters) {
        regex += this.options.characters;
      }
      regex += "]{";
      if (this.options.ignoreMinLength) {
        regex += "0,";
      } else {
        regex += this.options.minLength + ",";
      }
      if (this.options.ignoreMaxLength) {
        regex += "}";
      } else {
        regex += this.options.maxLength + "}";
      }
      regex += "$";
      this.regex = regex;
    },
  },
});

app.mount("#app");
