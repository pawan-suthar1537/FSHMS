const Message = require("../models/message.model");
const Asyncawait = require("../utils/AsyncAwait");


exports.sendmsg = Asyncawait( async (req, res) => {
  try {
    const { firstname, lastname, email, phone, message } = req.body;
    if (!firstname || !lastname || !email || !phone || !message) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    //   const existing = await Message.findOne({ $or: [{ email }, { phone }] });
    //   if (existing) {
    //     return res.status(422).json({ error: "your message already exists" });
    //   }

    const msg = new Message({
      firstname,
      lastname,
      email,
      phone,
      message,
    });

    const savedMsg = await msg.save();

    if (!savedMsg) {
      return res.status(400).json({ error: "Failed to send message" });
    }

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: savedMsg,
    });
  } catch (error) {
    console.error("Error sending message:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});
