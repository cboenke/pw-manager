import { createPasswordDoc, readPasswordDoc } from "./db";
import { printPassword, printPasswordSet } from "./messages";
import { askForPasswordValue } from "./questions";

export const hasAccess = (masterPassword: string): boolean =>
  masterPassword === "abc123";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();
  await createPasswordDoc({ name: passwordName, value: passwordValue });
  // ToDo use response.passwordValue to update password
  printPasswordSet(passwordName);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    console.log("No password found!");
    return;
  }
  printPassword(passwordDoc.name, passwordDoc.value);
};
