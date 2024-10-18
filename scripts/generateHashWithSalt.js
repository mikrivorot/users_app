const bcryptjs = require('bcryptjs');
const { createInterface } = require('readline');

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function hashPassword() {
    readline.question('Enter the password to hash: ', async (passwordFromTerminal) => {
        try {
            const hashedPassword = await bcryptjs.hash(passwordFromTerminal, await bcryptjs.genSalt());
            console.log('Hashed Password:', hashedPassword);
        } catch (error) {
            console.error('Error hashing password:', error);
        } finally {
            readline.close();
        }
    });
}
hashPassword();
