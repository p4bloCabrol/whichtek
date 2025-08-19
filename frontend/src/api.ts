export async function detectCMS(url: string): Promise<{ cms: string; confidence: number }> {
  const res = await fetch('/api/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  if (!res.ok) throw new Error('Error en la petición al backend');
  return res.json();
}
