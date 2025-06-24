import { getRandomNumber } from '@/utils/math'; // Usando o alias do tsconfig!

const nativaPhrases = [
  "Nossa essência é cuidar da sua.",
  "A pureza da natureza brasileira em seu toque.",
  "Encontre o seu bem-estar em nossas raízes.",
  "Um ritual de conexão com a sua verdadeira natureza.",
  "Beleza que floresce da simplicidade.",
  "Cuidado que vai além da pele e toca a alma.",
  "Sinta a vitalidade do Brasil em cada gota.",
  "Pause, respire e se reconecte. Esse é o momento Nativa.",
  "Autenticidade que nutre, beleza que se revela.",
  "A sua beleza, em seu estado mais puro e nativo."
];

export function getDailyPhrase(): string {
  const randIndex = getRandomNumber(0, nativaPhrases.length);
  return nativaPhrases[randIndex];
}