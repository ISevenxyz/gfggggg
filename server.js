const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');

// Mengisi API ID, API Hash, dan String Session dari akun Telegram Anda
const apiId = '24679387';
const apiHash = 'ad9e119acbfc9de527e1da32fae2a866';
const stringSession = 'your_string_session'; // Anda dapat menghasilkan String Session dengan menjalankan kode di bawah ini

// Fungsi untuk menghasilkan String Session
async function generateStringSession() {
  const client = new TelegramClient(new StringSession(), apiId, apiHash);
  await client.start({
    botAuthToken: '',
  });
  console.log('String Session:', client.session.save());
}

// Fungsi untuk memulai bot Telegram
async function startBot() {
  const client = new TelegramClient(new StringSession(stringSession), apiId, apiHash);
  await client.start({
    botAuthToken: '',
  });

  console.log('Bot started.');

  // Tangani perintah /start
  client.onMessage(async (message) => {
    if (message.text === '/start') {
      await client.sendMessage(message.chat.id, 'Halo! Silakan pilih opsi di bawah ini:', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Commands', callback_data: 'commands' }],
            [{ text: 'Creator', callback_data: 'creator' }]
          ]
        }
      });
    }
  });

  // Tangani callback dari opsi menu
  client.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    switch (data) {
      case 'commands':
        await client.sendMessage(chatId, 'Berikut adalah daftar perintah yang tersedia:\n/command1 - Deskripsi perintah 1\n/command2 - Deskripsi perintah 2');
        break;
      case 'creator':
        await client.sendMessage(chatId, 'Bot ini dibuat oleh [Nama Anda](https://linkanda.com).');
        break;
    }
  });
}

// Memulai bot
startBot();