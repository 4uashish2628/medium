import { Hono } from "hono";
import { PrismaClient } from "../../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@ashish2628/common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables: { userId: string; }
}>();

export const getPrisma = (accelerateUrl: string) => {
  return new PrismaClient({
    accelerateUrl,
  }).$extends(withAccelerate());
};

blogRouter.use('/*', async (c, next) => {
    try {
        const authHeader = await c.req.header("Authorization") || "";
        const user = await verify(authHeader, c.env.JWT_SECRET, "HS256")
        if (user) {
            c.set("userId", String(user.id));
            await next();
        } else {
            return c.json({
                message: "you are not logged in"
            }, 410)
        }
    }
    catch (e) {
        console.log("SIGNIN ERROR:", e);
        return c.json({ error: "Internal Server Error" }, 500);
    }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createPostInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message : "input does not validate"
            })
        }
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.get("userId");
    try {
        const blog = prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
        return c.json({
            id: (await blog).id
        })
    }
    catch (e) {
        c.status(410);
        c.json({ message: "error occured"})
    }
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const {success} = updatePostInput.safeParse(body);
        if(!success){
            c.status(411);
            return c.json({
                message : "input does not validate"
            })
        }
    const prisma = getPrisma(c.env.DATABASE_URL);
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({ id: blog.id, message: "blog updated" });
})

blogRouter.get('/bulk', async (c) => {
    const prisma =getPrisma(c.env.DATABASE_URL);
    const blogs = await prisma.post.findMany();
    return c.json({ blogs });
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = getPrisma(c.env.DATABASE_URL);
    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: id
            }
        })
        if (!blog) return c.text('not found');
        return c.json({ blog });
    } catch (e) {
        c.status(411);
        return c.json({ message: "error while fetching post" })
    }
})

