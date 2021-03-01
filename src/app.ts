const [command] = process.argv.slice(2);

if (command === "set") {
  console.log("Vamos a la playa!");
} else if (command === "get") {
  console.log("Let's go shopping!");
}
