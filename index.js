require("dotenv").config();

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const { NewMessage } = require("telegram/events");

const { sendNewsToAdmins } = require("./telegramBot");
const { cleanText } = require("./textCleaner");


const apiId = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;


const stringSession = new StringSession(
  process.env.STRING_SESSION || ""
  );


  const sourceChannels = [
    "Rise_of_Iran_2",
      "NE_WG"
      ];


      (async () => {

        console.log("Connecting user account...");


          const client = new TelegramClient(
              stringSession,
                  apiId,
                      apiHash,
                          {
                                connectionRetries: 5,
                                    }
                                      );


                                        await client.start({

                                            phoneNumber: async () =>
                                                  process.env.PHONE_NUMBER,

                                                      password: async () =>
                                                            await input.text(
                                                                    "Password (if enabled): "
                                                                          ),

                                                                              phoneCode: async () =>
                                                                                    await input.text(
                                                                                            "Telegram code: "
                                                                                                  ),

                                                                                                      onError: (err) =>
                                                                                                            console.log(err)

                                                                                                              });



                                                                                                                console.log(
                                                                                                                    "User account connected!"
                                                                                                                      );


                                                                                                                        console.log(
                                                                                                                            "Save this STRING_SESSION:"
                                                                                                                              );

                                                                                                                                console.log(
                                                                                                                                    client.session.save()
                                                                                                                                      );



                                                                                                                                        client.addEventHandler(
                                                                                                                                            async (event) => {


                                                                                                                                                  try {

                                                                                                                                                          const message =
                                                                                                                                                                    event.message;


                                                                                                                                                                            if (!message.message)
                                                                                                                                                                                      return;



                                                                                                                                                                                              const chat =
                                                                                                                                                                                                        await message.getChat();



                                                                                                                                                                                                                if (!chat.username)
                                                                                                                                                                                                                          return;



                                                                                                                                                                                                                                  if (
                                                                                                                                                                                                                                            !sourceChannels.includes(
                                                                                                                                                                                                                                                        chat.username
                                                                                                                                                                                                                                                                  )
                                                                                                                                                                                                                                                                          )
                                                                                                                                                                                                                                                                                    return;



                                                                                                                                                                                                                                                                                            const cleaned =
                                                                                                                                                                                                                                                                                                      cleanText(
                                                                                                                                                                                                                                                                                                                  message.message
                                                                                                                                                                                                                                                                                                                            );



                                                                                                                                                                                                                                                                                                                                    if (!cleaned)
                                                                                                                                                                                                                                                                                                                                              return;



                                                                                                                                                                                                                                                                                                                                                      await sendNewsToAdmins(
                                                                                                                                                                                                                                                                                                                                                                cleaned
                                                                                                                                                                                                                                                                                                                                                                        );


                                                                                                                                                                                                                                                                                                                                                                                console.log(
                                                                                                                                                                                                                                                                                                                                                                                          "News sent:",
                                                                                                                                                                                                                                                                                                                                                                                                    chat.username
                                                                                                                                                                                                                                                                                                                                                                                                            );


                                                                                                                                                                                                                                                                                                                                                                                                                  } catch (err) {

                                                                                                                                                                                                                                                                                                                                                                                                                          console.log(
                                                                                                                                                                                                                                                                                                                                                                                                                                    "Error:",
                                                                                                                                                                                                                                                                                                                                                                                                                                              err
                                                                                                                                                                                                                                                                                                                                                                                                                                                      );

                                                                                                                                                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                },

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    new NewMessage({})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      );



                                                                                                                                                                                                                                                                                                                                                                                                                                                                        console.log(
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            "News listener is running..."
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              );


                                                                                                                                                                                                                                                                                                                                                                                                                                                                              })();