import Express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const app: Express.Application = Express()
const port: number | null = 5000 || process.env.PORT
const client: PrismaClient = new PrismaClient()

app.use(cors())

app.get('/', (req: Express.Request, res: Express.Response) => {
  res.send('Hello World!')
})
// get single pattern
app.get(
  '/patterns/:id',
  async (req: Express.Request, res: Express.Response) => {
    const lookup = await client.pattern.findUnique({
      where: {
        id: String(req.params.id)
      }
    })
    res.json(lookup)
  }
)
// get all patterns
app.get('/patterns', async (req: Express.Request, res: Express.Response) => {
  const lookup = await client.pattern.findMany()
  res.json(lookup)
})
// create pattern
app.post('/patterns', async (req: Express.Request, res: Express.Response) => {
  const pattern = await client.pattern.create({
    data: {
      meaning: req.body.meaning,
      patternData: req.body.pattern
    }
  })
  res.json(pattern)
})
// update pattern
app.put(
  '/patterns/:id',
  async (req: Express.Request, res: Express.Response) => {
    const pattern = await client.pattern.update({
      where: {
        id: String(req.params.id)
      },
      data: {
        meaning: req.body.meaning,
        patternData: req.body.pattern
      }
    })
    res.json(pattern)
  }
)
// delete pattern
app.delete(
  '/patterns/:id',
  async (req: Express.Request, res: Express.Response) => {
    const pattern = await client.pattern.delete({
      where: {
        id: String(req.params.id)
      }
    })
    res.json(pattern)
  }
)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
