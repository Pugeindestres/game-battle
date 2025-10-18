const readline = require('readline');
const chalk = require('chalk');
const { RACES } = require('../person/person.js');

// Функция для печати текста по букве с задержкой
function typeWriter(text, delay = 50) {
    return new Promise((resolve) => {
        let i = 0;
        const timer = setInterval(() => {
            process.stdout.write(text[i]);
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                console.log();
                resolve();
            }
        }, delay);
    });
}

// Функция для печати с цветом по букве
function typeWriterColor(text, color, delay = 50) {
    return new Promise((resolve) => {
        let i = 0;
        const timer = setInterval(() => {
            process.stdout.write(color(text[i]));
            i++;
            if (i >= text.length) {
                clearInterval(timer);
                console.log();
                resolve();
            }
        }, delay);
    });
}

function createGameInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function askQuestion(rl, question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

// Цвета для рас
const RACE_COLORS = {
    orc: chalk.green,
    human: chalk.white,
    vampire: chalk.blue,
    elf: chalk.magenta,
    dwarf: chalk.yellow
};

async function startGame() {
    const rl = createGameInterface();
    
    // Анимированное приветствие
    await typeWriter("Добро пожаловать в игровое сражение");
    await typeWriter("Ты готов показать кто тут лучший боец?", 40);
    
    // Выбор расы с анимацией
    await typeWriter('\n=== ВЫБОР РАСЫ ===', 30);
    await typeWriter('Доступные расы:', 30);
    
    // Вывод рас с цветами и анимацией
    for (const race of Object.keys(RACES)) {
        const color = RACE_COLORS[race];
        const stats = RACES[race];
        const raceText = `- ${race} (${stats.health} HP, ${stats.damage} DMG)`;
        await typeWriterColor(raceText, color, 20);
    }
    
    let playerRace;
    while (true) {
        const input = await askQuestion(rl, '\nВыберите расу: ');
        playerRace = input.toLowerCase();
        
        if (RACES[playerRace]) {
            break;
        } else {
            await typeWriterColor('❌ Неправильная раса! Попробуйте еще раз.', chalk.red, 10);
        }
    }
    
    const playerStats = RACES[playerRace];
    const playerColor = RACE_COLORS[playerRace];
    
    // Анимированный вывод выбора игрока
    await typeWriter('\n✅ Ваш выбор:', 20);
    await typeWriterColor(`${playerRace}`, playerColor, 30);
    await typeWriterColor(`❤️  Здоровье: ${playerStats.health}`, chalk.red, 20);
    await typeWriterColor(`⚔️  Урон: ${playerStats.damage}`, chalk.cyan, 20);
    
    // Финальное сообщение
    await typeWriterColor(`\n🎯 Игрок "${playerRace}" готов к битве!`, playerColor, 25);
    
    rl.close();
}

module.exports = {
    startGame,
    createGameInterface,
    askQuestion,
    typeWriter,
    typeWriterColor
};