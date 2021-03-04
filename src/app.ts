import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
import { printNoAccess, printWelcomeMessage } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  readPasswordDoc,
  updatePasswordDoc,
} from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "pw-manager-clara");
    await createPasswordDoc({ name: "Clara", value: "0110" });
    console.log(await readPasswordDoc("Clara"));
    await updatePasswordDoc("Clara", "0110");
    await deletePasswordDoc("Clara");
    await closeDB();
  } catch (error) {
    console.error(error);
  }
  // printWelcomeMessage();

  // const credentials = await askForCredentials();
  // if (!hasAccess(credentials.masterPassword)) {
  //   printNoAccess();
  //   run();
  //   return;
  // }

  // const action = await askForAction();
  // switch (action.command) {
  //   case "set":
  //     handleSetPassword(action.passwordName);
  //     break;
  //   case "get":
  //     handleGetPassword(action.passwordName);
  //     break;
  // }
};

run();
