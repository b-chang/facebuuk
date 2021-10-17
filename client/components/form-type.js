const FORM_TYPE = {
  LOGIN: {
    initialState: {
      email: '',
      password: ''
    },
    inputs: [
      ['email', 'email'],
      ['password', 'password'],
    ]
  },
  SIGN_UP: {
    initialState: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    inputs: [
      ['firstName', 'First Name'],
      ['lastName', 'Last Name'],
      ['email', 'email'],
      ['password', 'password'],
      ['confirmPassword', 'Confirm Password']
    ]
  }
}
export default FORM_TYPE;