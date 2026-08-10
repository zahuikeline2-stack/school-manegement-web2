import promptSync from 'prompt-sync';

const prompt = promptSync();

export function poserQuestion(question) {
  return prompt(question);
}