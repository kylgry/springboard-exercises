function createAccount(pin, balance = 0) {

  return {
    
    checkBalance(inputPin) {
      if (inputPin === pin) { return `$${balance}` }
      else { return "Invalid PIN." }
    },

    deposit(inputPin, amount) {
      if (inputPin === pin) {
        balance += amount
        return `Succesfully deposited $${amount}. Current balance: $${balance}.`
      }
      else { return "Invalid PIN." }
    },

    withdraw(inputPin, amount) {
      if (inputPin === pin) {
        if (balance > amount) {
          balance -= amount
          return `Succesfully withdrew $${amount}. Current balance: $${balance}.`
        }
        else { return "Withdrawal amount exceeds account balance. Transaction cancelled." }
      }
      else { return "Invalid PIN." }
    },

    changePin(inputPin, newPin) {
      if (inputPin === pin) {
        pin = newPin
        return "PIN successfully changed!"
      }
      else { return "Invalid PIN." }
    }
  }

}

module.exports = { createAccount };
