// src/api/signup.ts
import { db } from 'astro:db';
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const first_name = formData.get('first_name');
  const last_name = formData.get('last_name');
  const email = formData.get('email');
  const password = formData.get('password');

  await db.Users.insert({
    first_name,
    last_name,
    email,
    password,
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
