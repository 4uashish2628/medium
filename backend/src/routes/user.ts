import { Hono } from "hono";
import { PrismaClient } from "../../generated/prisma";
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput } from "@ashish2628/common";

export const userRouter = new Hono<({
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
})>();

export const getPrisma = (accelerateUrl: string) => {
  return new PrismaClient({
    accelerateUrl,
  }).$extends(withAccelerate());
};

userRouter.post('/signup', async (c) => {
	const body = await c.req.json();
	const parsed = signupInput.safeParse(body);
	if(!parsed.success){
		console.log(parsed.error)
		c.status(411);
		return c.json({
			message : "input does not validate" ,
			error: parsed.error.format()
		})
	}
	const prisma = getPrisma(c.env.DATABASE_URL);
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name : body.username,
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({
			token: jwt
		})
	} catch (e) {
		return c.status(403);
	}
})

userRouter.post('/signin', async (c) => {
	const body = await c.req.json();
	const {success} = signinInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			message : "input does not validate"
		})
	}
	const prisma = getPrisma(c.env.DATABASE_URL);
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



