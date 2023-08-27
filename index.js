const mineflayer = require('mineflayer');

const express = require('express');
const app = express();

// Define a "ping" endpoint
app.get('/ping', (req, res) => {
  res.send('Ping received!');
});

function createBot() {
  const bot = mineflayer.createBot({
    host: 'ir.skyblock.uz',
    username: 'Aiden2',
    viewDistance: 'tiny',
    version: '1.18',
  });

  let continue_digging = true;

  bot.once('spawn', () => {
    bot.chat('/login qwasqwas');
    setTimeout(() => {
      dig();
    }, 8000);
    setTimeout(() => {
        bot.chat('/is warp Aiden2');
    }, 5000);
  });

  bot.on('chat', (username, message) => {
    if (message === 'stopdig2') {
      continue_digging = false; // Stop digging
    }
  });

  bot.on('chat', (username, message) => {
    if (message === 'startdig2') {
      continue_digging = true; // Start digging
      dig();
    }
  });

  bot.once('end', () => {
    // Re-create the bot instance and log in again after it quits
    createBot();
  });

  async function dig() {
    if (!continue_digging) {
      return;
    }

    if (!bot.heldItem || !bot.heldItem.name.includes('pickaxe')) {
      var pickaxe = bot.inventory.items().filter(i => i.name.includes('pickaxe'))[0];
      if (pickaxe) await bot.equip(pickaxe, 'hand');
    }

    var block = bot.blockAtCursor(4);
    if (!block) {
      return setTimeout(function () {
        dig();
      }, 100);
    }

    await bot.dig(block, 'ignore');
    dig();
  }
}

// Start the bot initially
createBot();

// Add a function to stop digging
function stopDig() {
  continue_digging = false;
}

// Add a function to start digging
function startDig() {
  continue_digging = true;
  dig();
}

module.exports = {
  stopDig,
  startDig
};




// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});