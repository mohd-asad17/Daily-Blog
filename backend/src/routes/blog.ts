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
  const jwt = c.req.header('Authorization') || "";
  const token = jwt.split(' ')[1];
  try {
    const userToken = await verify(token, c.env.JWT_SECRET);
    if (userToken) {
      c.set('userId', String(userToken.id));
      await next();
    }
    else {
      c.status(403);
      return c.json({
        message: "you are not logged in"
      })
    }
  }
  catch (e) {
    c.status(403);
    return c.json({
      message: "you are not logged in"
    })
  }
});


blogRouter.post('/', async (c) => {
  const authorId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: Number(authorId)
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
      authorId: Number(authorId)
    },
    data: {
      title: body.title,
      content: body.content
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
  const findMultiplePost = await prisma.post.findMany(
    /*     {
        where:{
            id
        }
    } */
  )
  return c.json({
    findMultiplePost
  });
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
  return c.json({
    post: findPost,
    message: "read your post"
  })
})

