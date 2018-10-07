export const profile = {
  firstName: {
    presence: {
      message: '^Le prénom ne peut pas être vide',
      allowEmpty: false
    }
  },
  lastName: {
    presence: {
      message: '^Le nom de famille ne peut pas être vide',
      allowEmpty: false
    }
  },
  email: {
    presence: {
      message: '^L\'email ne peut pas être vide',
      allowEmpty: false

    },
    email: {
      message: '^L\'email n\'est pas valide'
    }
  }
}
