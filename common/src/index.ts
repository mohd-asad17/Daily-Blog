import { z } from 'zod';

export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signInInput = z.object({
    email: z.string().email(),
    password : z.string().min(6)
})

export const createBlog = z.object({
    title: z.string(),
    description : z.string()
})

export const updateBlog = z.object({
    title: z.string(),
    description : z.string(),
    id : z.string()
})

export type UpdateBlog = z.infer<typeof updateBlog>
export type CreateBlog = z.infer<typeof createBlog>
export type SignUpInput = z.infer<typeof signUpInput>
export type SignInInput = z.infer<typeof signInInput>

