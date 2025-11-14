export async function registerAdmin(data) {
  const res = await fetch('http://localhost:8080/api/auth/enterprise/admin/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Ошибка регистрации');

  return res.json(); // вернётся token
}
