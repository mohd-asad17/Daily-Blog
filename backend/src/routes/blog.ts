import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';


 export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	},
    Variables:{
        userId: string
      }
}>();

  blogRouter.use('/*', async (c,next) =>{
    const authHeader = c.req.header('Authorization')|| "";
    const userToken = await verify(authHeader, c.env.JWT_SECRET);
    if (!userToken){
        c.status(403);
        return c.json({
            message: "error while logged in"
        }) 
    }
    c.set("jwtPayload",userToken.id);
    await next();
    })


  blogRouter.post('/', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get('userId');
    const body = await c.req.json();
    const blog =  await prisma.post.create({
        data:{
          title : body.title,
          content : body.content,
          authorId :userId
        }
      });
return c.json({
    id: blog.id
})
  })
  
  blogRouter.put('/', async (c) =>{
    const userId = c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const updateBlog = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
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
  
  blogRouter.get('/', async (c) =>{
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const findPost = await prisma.post.findUnique({
        where:{
             id
        }
    })
    return c.json({
        post: findPost,
        message: "read your post"
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

