export const printWelcomeMessage = () => {
  console.log(`Welcome to pw-manager!🔐`);
};

export const printNoAccess = () => {
  console.warn("Wrong master password! Try again");
};

export const printPasswordSet = (passwordName: string) => {
  console.log(`You set a new ${passwordName} password.`);
};

export const printPassword = (passwordName: string, passwordValue: string) => {
  console.log(`Your ${passwordName} password is ${passwordValue}!`);
};
