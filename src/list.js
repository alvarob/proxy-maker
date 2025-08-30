import fs from 'fs';

export function lineToCard(line) {
    const errorText = `Invalid format: "${line}". Format must be: "3x card name"`;

    const [quantityText, fullName] = line.split('x');

    if (!fullName) throw new Error(errorText);

    const quantity = Number(quantityText.trim());
    const cardName = fullName.trim();

    if (isNaN(quantity) || quantity <= 0 || !cardName.length)
        throw new Error(errorText);

    return [quantity, cardName];
}

async function firstFile(cardName, imagePath) {
    const files = fs.readdirSync(imagePath);
    const match = files.find(f => f.startsWith(`${cardName}.`));
    
    if (!match)
        throw new Error(`No file found for "${cardName}" under "${imagePath}"`);
    
    return match;
}

async function read(path) {
    const data = fs.readFileSync(path, 'utf8');
    return data.split('\n')
        .map((x) => lineToCard(x.trim()));
}

export default { read, firstFile };