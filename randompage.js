const survivalItems = [
  'Wooden Pickaxe', 'Stone Pickaxe', 'Iron Pickaxe', 'Diamond Pickaxe', 'Netherite Pickaxe',
  'Wooden Sword', 'Stone Sword', 'Iron Sword', 'Diamond Sword', 'Netherite Sword',
  'Wooden Axe', 'Stone Axe', 'Iron Axe', 'Diamond Axe', 'Netherite Axe',
  'Wooden Shovel', 'Stone Shovel', 'Iron Shovel', 'Diamond Shovel', 'Netherite Shovel',
  'Wooden Hoe', 'Stone Hoe', 'Iron Hoe', 'Diamond Hoe', 'Netherite Hoe',
  'Crafting Table', 'Furnace', 'Chest', 'Bed', 'Torch', 'Coal', 'Iron Ingot',
  'Diamond', 'Stick', 'Bow', 'Arrow', 'Shield', 'Bucket', 'Water Bucket',
  'Lava Bucket', 'Food (e.g., Bread, Cooked Porkchop)', 'Flint and Steel',
  'Obsidian', 'Ender Pearl', 'Eye of Ender', 'Blaze Powder', 'Blaze Rod',
  'Nether Wart', 'Potion of Healing', 'Potion of Strength', 'Potion of Fire Resistance',
  'Golden Apple', 'Enchanted Golden Apple', 'Bookshelf', 'Enchanting Table',
  'Anvil', 'Iron Armor', 'Diamond Armor', 'Netherite Armor'
];

function generateRandomItemWithAnimation() {
  const itemDisplay = document.getElementById('item-display');
  itemDisplay.classList.add('animate');

  // สุ่มไอเท็มและเปลี่ยนสีข้อความระหว่างการสุ่ม
  let animationInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * survivalItems.length);
    itemDisplay.textContent = survivalItems[randomIndex];

    // เปลี่ยนสีข้อความแบบสุ่ม
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    itemDisplay.style.color = randomColor;

    // เพิ่มเอฟเฟกต์การขยาย/ย่อขนาดข้อความ
    const randomScale = 1 + Math.random() * 0.5; // ขยายขนาด 1x ถึง 1.5x
    itemDisplay.style.transform = `scale(${randomScale})`;
  }, 100);

  // หยุด Animation หลังจาก 2 วินาที และแสดงผลลัพธ์สุดท้าย
  setTimeout(() => {
    clearInterval(animationInterval);
    const finalIndex = Math.floor(Math.random() * survivalItems.length);
    itemDisplay.textContent = survivalItems[finalIndex];
    itemDisplay.style.color = '#fff'; // คืนค่ากลับเป็นสีขาว
    itemDisplay.style.transform = 'scale(1)'; // คืนค่าขนาดปกติ
    itemDisplay.classList.remove('animate');
  }, 2000);
}

async function sendToDiscord(message) {
  const webhookUrl = 'https://discord.com/api/webhooks/1354775752742142094/Ohjo1uxRh5IRZ6Yqp3j3v85GDw9njyE-7U-_HmfUI63luL7J7nU9nT5USJJh05EAu83d';
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });
    console.log('Message sent to Discord!');
  } catch (error) {
    console.error('Error sending message to Discord:', error);
  }
}

document.getElementById('generate-button').addEventListener('click', async () => {
  const username = localStorage.getItem('minecraftUsername'); // ดึงชื่อผู้เล่นจาก Local Storage
  if (!username) {
    alert('Please login first!');
    window.location.href = 'login.html';
    return;
  }

  const randomItem = survivalItems[Math.floor(Math.random() * survivalItems.length)];
  document.getElementById('item-display').textContent = randomItem;

  // ส่งคำสั่งไปยัง Backend เพื่อแจกไอเท็มให้ผู้เล่น
  try {
    const response = await fetch('http://localhost:3000/send-command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: `give ${username} ${randomItem} 1` }), // ส่งคำสั่ง /give พร้อมชื่อผู้เล่น
    });
    const data = await response.json();
    console.log('Server Response:', data.response);
  } catch (error) {
    console.error('Error sending command:', error);
  }

  // ส่งข้อความไปยัง Discord
  await sendToDiscord(`Random Item: ${randomItem} (Given to ${username})`);
});