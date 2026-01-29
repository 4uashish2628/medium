import { Hono } from "hono";
import { routePath } from "hono/route";
import { Bindings } from "hono/types";
import { PrismaClient } from "../../generated/prisma";
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaPg } from '@prisma/adapter-pg';
import { sign } from 'hono/jwt';

export const userRouter = new Hono<({
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
})>();



userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		adapter: new PrismaPg({
			connectionString: c.env.DATABASE_URL,
		}),
	}).$extends(withAccelerate());
	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({
			jwt: token
		})
	} catch (e) {
		return c.status(403);
	}
})

userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		adapter: new PrismaPg({
			connectionString: c.env.DATABASE_URL,
		}),
	}).$extends(withAccelerate());
	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password: body.password
		}
	});
	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" })
	}
	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ token: jwt });
})



