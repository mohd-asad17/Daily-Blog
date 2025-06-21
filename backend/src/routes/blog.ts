import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>();

blogRouter.use('/*', async (c, next) => {
	const header = c.req.header('Authorization');
	if (!header) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = header.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
  if (typeof payload.id !== 'string') {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set('userId', payload.id);
	await next()
})


blogRouter.post('/', async (c) => {
  const authorId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      description: body.description, 
      authorId: authorId
    }
  });
  return c.json({
    id: post.id
  });
})

blogRouter.put('/', async (c) => {
  const authorId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const updateBlog = await prisma.post.update({
    where: {
      id: body.id,
      authorId: authorId
    },
    data: {
      title: body.title,
      description: body.description
    }
  });
  return c.json({
    message: "update successfully",
    id: updateBlog.id
  })
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const findMultiplePost = await prisma.post.findMany({
    select: {
      description: true,
      title: true,
      id: true,
      author : {
        select : {
            name: true
        }
      }
    }
  });
  return c.json(findMultiplePost);
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const findPost = await prisma.post.findUnique({
    where: {
      id: id
    }
  })
  return c.json(findPost);
})