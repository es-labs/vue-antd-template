import { rest } from 'msw'

export default [
  rest.get('http://127.0.0.1:8080/api/msw/test', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'it works :)'
      })
    )
  })
]
