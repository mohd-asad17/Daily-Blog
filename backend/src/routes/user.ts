import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { signUpInput } from '@mohd-asad17/common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "inputs are incorrect"
    })
  }
  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password
    }
  });
  if (user) {
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  }
  else {
    c.status(403);
    return c.json({
      msg: "error while"
    });
  }
});


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  });
  if (user) {
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      token: jwt
    });
  }
  else {
    c.status(403);
    return c.json({
      msg: "error while sign in "
    })
  }
});

