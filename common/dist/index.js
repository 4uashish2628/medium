import z from "zod";
export const signupInput = z.object({
    email: z.email(),
    password: z.string(),
    username: z.string().optional(),
});
export const signinInput = z.object({
    email: z.email(),
    password: z.string(),
});
export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
});
export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});
//# sourceMappingURL=index.js.map