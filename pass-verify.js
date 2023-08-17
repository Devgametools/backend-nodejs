const bcrypt = require('bcryptjs');

async function verifyPassword () {
  const password = "Bene @37151@";
  const hashedPassword = "$2a$10$CTxq1kQ5gUZ81rbitR5RIOlTij8xSVj6A/IiesX7mM5vV3iAG/Tmm";
  const verifiedPassword = await bcrypt.compare(password, hashedPassword);
  return verifiedPassword;
}

verifyPassword();
