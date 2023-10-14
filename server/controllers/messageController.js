const Messages = require("../models/messageModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const allmessages = await Messages.find({
      "users.1": from
    }).sort({ updatedAt: 1 });
    //console.log(`form ${from}`);
     // console.log('to' , to);
    // console.log(allmessages)
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    // console.log(messages);
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        // formSelf: true,
        message: msg.message.text,
      };
    });
    const projectedallMessages = allmessages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        // formSelf: true,
        message: msg.message.text,
      };
    });
    // res.json(projectedMessages);
    res.json(projectedallMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};


module.exports.getallMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    console.log(messages);
    const projectedMessages = messages.map((msg) => {
      return {
        // fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
