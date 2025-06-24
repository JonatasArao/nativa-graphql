import express from 'express'

import { Router, Request, Response } from 'express'

const app = express()

const route = Router()

const port = 3000

app.use(express.json())

function getRandomIndex(min : number, max : number) : number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

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
]

route.get('/dica-do-dia', (req: Request, res: Response) => {
  const randIndex = getRandomIndex(0, nativaPhrases.length)
  const dica = nativaPhrases[randIndex]
  res.status(200).json({ dica })
})

app.use(route)

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
})