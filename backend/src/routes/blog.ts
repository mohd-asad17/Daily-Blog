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
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const userToken = await verify(token, c.env.JWT_SECRET);
	if (!userToken) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', String(userToken.id));
	await next();
})


blogRouter.post('/', async (c) => {
	const authorId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
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
  
  blogRouter.put('/', async (c) =>{
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
            title : body.title,
            content : body.content
          }
    });
    return c.json({
        message: "update successfully",
        id: updateBlog.id
    })
})

blogRouter.get('/bulk', async (c) =>{
  const id = c.req.param('id');
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

  blogRouter.get('/:id', async (c) =>{
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const findPost = await prisma.post.findFirst({
        where:{
             id:id
        }
    })
    return c.json({
        post: findPost,
        message: "read your post"
    })
  })
 
