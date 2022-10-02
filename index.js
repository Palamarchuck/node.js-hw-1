// const yargs = require("yargs")
// const {hideBin} = require("yargs/helpers")
const { program } = require("commander");
const contacts = require("./contacts")


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();



const invokeAction = async({ action, id, name, email, phone })=>{
  switch (action) {
    case "list":
          const allContacts = await contacts.listContacts()
          console.table(allContacts);
          break;

    case "get":
          const oneContact = await contacts.getContactById(id);
          console.log(oneContact);
      break;

    case "add":
          const newContact = await contacts.addContact({ name, email, phone })
          console.log(newContact);
      break;

    case "remove":
          const removeOneContact = await contacts.removeContact(id);
          console.log(removeOneContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "5" });
// invokeAction({ action: "add", name: "Mango", email:"mango@gmail.com",phone:"322-22-22"});
// invokeAction({ action: "remove", id: "t7NL77ka-sWkFutaftVgB" });

// const actionIndex = process.argv.indexOf("--action")

                     //YARGS//

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
invokeAction(argv);


                    //COMMANDER//
// const program = new Command();
// program
//   .option("-a, --action <type>", "choose action")
//   .option("-i, --id <type>", "user id")
//   .option("-n, --name <type>", "user name")
//   .option("-e, --email <type>", "user email")
//   .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);

// const argv = program.opts();
