export const adjectives: string[] = [
    'Brilliant',
    'Innovative',
    'Visionary',
    'Dynamic',
    'Inspired',
    'Creative',
    'Empowered',
    'Fearless',
    'Bold',
    'Agile',
    'Radiant',
    'Optimistic',
    'Diligent',
    'Resilient',
    'Ingenious'
];

export const techNames: string[] = [
    'Turing',
    'Lovelace',
    'Gates', 
    'Jobs',  
    'Musk',  
    'Torvalds',
    'Knuth', 
    'Hopper',
    'Berners-Lee',
    'Shivon',
    'Zuckerberg',
    'Page',  
    'Brin',  
    'Ritchie',
    'Stroustrup'
];

export function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function generateTechName(): string {
    const adjective: string = getRandomElement(adjectives);
    const techName: string = getRandomElement(techNames);
    return `${adjective} ${techName}`;
}
