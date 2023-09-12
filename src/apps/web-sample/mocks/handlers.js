import { rest } from 'msw'

export default [
  rest.get('http://127.0.0.1:8080/api/msw/test', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'it works :)'
      })
    )
  }),
  rest.post('http://127.0.0.1:8080/api/auth/login', (req, res, ctx) => {
    const { cookies } = req
    console.log('cookies ? :', cookies)
    return res(ctx.json({ otp: 1 }))
  }),
  rest.post('http://127.0.0.1:8080/api/auth/otp', (req, res, ctx) => {
    // {"id":1,"pin":"111111"}
    return res(
      ctx.json({
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXBzIjoiVGVzdEdyb3VwIiwiaWF0IjoxNjk0NDk2NDA5LCJleHAiOjE2OTQ0OTkxMDl9.vW3XwxNIJ0LVdenwqcZZzl04T-ufJuTed7FvyVYb2Io',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk0NDk2NDA5LCJleHAiOjE2OTQ1MDAwMDl9.p3xFoXix9_xBJOOLgH2hkvomQnz5D4ct_Zk21tcsojE',
        user_meta: {
          email: 'test',
          groups: 'TestGroup'
        }
      })
    )
  }),
  rest.get('http://127.0.0.1:8080/api/auth/logout', (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'Logged Out'
      })
    )
  })
]
