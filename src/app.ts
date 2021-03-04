import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
import { printNoAccess, printWelcomeMessage } from "./messages";
import {
  askForAction,
  askForCredentials,
  askForPasswordValue,
} from "./questions";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  readPasswordDoc,
  updatePasswordDoc,
  updatePasswordValue,
} from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "pw-manager-clara");

    printWelcomeMessage();

    const credentials = await askForCredentials();
    if (!hasAccess(credentials.masterPassword)) {
      printNoAccess();
      run();
      return;
    }

    const action = await askForAction();
    switch (action.command) {
      case "set":
        await handleSetPassword(action.passwordName);
        break;
      case "get":
        await handleGetPassword(action.passwordName);
        break;
    }

    // await updatePasswordValue("Clara", "1110");
    // await deletePasswordDoc("Clara");
    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();

// case "set":
//         console.log(await createPasswordDoc(handleSetPassword(action.passwordName)));
//         break;
//       case "get":
//         console.log(await readPasswordDoc(handleGetPassword(action.passwordName)));
//         break;
