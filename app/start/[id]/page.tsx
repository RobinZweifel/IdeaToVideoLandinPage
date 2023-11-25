import { kv } from '@vercel/kv';
import { notFound } from 'next/navigation';
import Body from '@/components/Body';

async function getAllKv(id: string) {
  const data = await kv.hgetall<{
    prompt: string;
    image?: string;
    website_url?: string;
    model_latency?: string;
  }>(id);

  return data;
}

export default async function Results({params}: {
  params: {
    id: string;
  };
}) {
  const data = await getAllKv(params.id);
  if (!data) {
    notFound();
  }
  return (
    <Body
    />
  );
}
