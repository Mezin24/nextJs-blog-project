import fs from 'fs';
import path from 'path';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      return res.status(422).json({ message: 'Envalid date' });
    }
    const newMessage = {
      name,
      message,
      email,
    };

    const filePath = path.join(process.cwd(), 'data', 'messages-data.json');
    const messagesData = JSON.parse(fs.readFileSync(filePath));
    messagesData.push({ name, email, message });
    fs.writeFileSync(filePath, JSON.stringify(messagesData));
    return res.status(201).json({ status: 'success', message: newMessage });
  }
};

export default handler;
