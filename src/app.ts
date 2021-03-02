import { handleGetPassword, handleSetPassword, hasAccess } from "./commands";
import { printNoAccess, printWelcomeMessage } from "./messages";
import { askForAction, askForCredentials } from "./questions";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });

    console.log("Connected to DB!");

    const db = await client.db("pw-manager-clara");

    await db.collection("inventory").insertOne({
      dessert: "cake",
      variety: ["carrot cake", "marble cake", "apple pie"],
      tags: ["contains gluten", "not vegan"],
    });
    client.close();
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
