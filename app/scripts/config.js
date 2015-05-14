var testAppConfig = {

  constants : {
    DEFAULT_TIMEOUT : 5000,
    PAGE_TITLE: "Subscribe Here",
    FIRST_NAME_LABEL_ENG: "First Name",
    LAST_NAME_LABEL_ENG: "Last Name",
    EMAIL_LABEL: "E-mail",
    MAX_LENGTH_ERROR: "The field entered is larger than 32 characters",
    MIN_LENGTH_ERROR: "The field entered is required",
    INVALID_EMAIL_ERROR: "Please enter a valid e-mail",
    INVALID_ERROR: "The field entered has invalid characters"

  },
  forms: {
    defaultPattern: /^[a-zA-Z0-9\s\-_#+.$!'()]+$/,
    secondaryTextPattern: /^$|^[a-zA-Z0-9\s\-_#+.$!'()]+$/
  },
  API_KEY : "d856fde946813715b61326ed34d6ad9b-us10", //really bad should not be exposed...
  LIST_ID: "c8cffd8845",
  PROXY_ENABLED: true,
  PROXY_URL: 'https://cors-anywhere.herokuapp.com/' //used to get by cors

};