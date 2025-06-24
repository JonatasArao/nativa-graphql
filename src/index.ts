import express from 'express'

import { Router, Request, Response } from 'express';

const app = express();

const route = Router()

const port = 3000

app.use(express.json())

route.get('/dica-do-dia', (req: Request, res: Response) => {
  res.json({ dica: 'uma frase inspiradora da Nativa' })
})

app.use(route)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})