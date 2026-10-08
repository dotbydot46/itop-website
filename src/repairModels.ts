// Suggestions identify devices; they do not promise repair support or stock.
const phones: Record<string, string[]> = {
  Apple: ['iPhone SE (2020)', 'iPhone SE (2022)', 'iPhone XR', 'iPhone XS', 'iPhone XS Max', ...[11,12,13,14,15,16].flatMap(n => ['iPhone ' + n, 'iPhone ' + n + ' Pro', 'iPhone ' + n + ' Pro Max']), 'iPhone 12 mini', 'iPhone 13 mini', 'iPhone 14 Plus', 'iPhone 15 Plus', 'iPhone 16 Plus'],
  Samsung: [...[20,21,22,23,24].flatMap(n => ['Galaxy S' + n, 'Galaxy S' + n + '+', 'Galaxy S' + n + ' Ultra']), 'Galaxy A14', 'Galaxy A15', 'Galaxy A16', 'Galaxy A34', 'Galaxy A35', 'Galaxy A54', 'Galaxy A55'],
  Google: [6,7,8,9].flatMap(n => ['Pixel ' + n, 'Pixel ' + n + ' Pro']),
};
export function repairModels(device: string, brand: string): string[] {
  return device === 'Phone' ? phones[brand] ?? [] : [];
}
