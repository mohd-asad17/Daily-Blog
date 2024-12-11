import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
}>();

app.post('/api/v1/signup', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate());
const body = await c.req.json();
const user =  await prisma.user.create({
  data:{
    email: body.email,
    password : body.password
  }
});
if(user){
const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
  return c.json({token: jwt});
}

});


app.post('/api/v1/signin', (c) =>{
  return c.text('hello sign in');
})

app.post('/api/v1/blog', (c)=>{
  return c.text('hello create a blog');
})

app.put('/api/v1/blog', (c) =>{
  return c.text('hello update the blog');
})

app.get('/api/v1/blog/:id', (c) =>{
  const id = c.req.param('id');
  console.log(id);
  return c.text('hello read the blog ');
})

export default app
