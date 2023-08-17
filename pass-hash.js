const bcrypt = require('bcryptjs');

async function hashPassword () {
  const password = "Bene @37151@";
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
}

hashPassword();
