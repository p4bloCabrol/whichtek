
import './style.css';
import { detectCMS } from './api';

const form = document.getElementById('cms-form') as HTMLFormElement;
const input = document.getElementById('url-input') as HTMLInputElement;
const resultBox = document.getElementById('result-box') as HTMLDivElement;

if (form && input && resultBox) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = input.value;
    resultBox.textContent = 'Detectando...';
    resultBox.className = 'w-full p-4 rounded text-center font-medium bg-gray-100 text-gray-800 mt-4';
    try {
      const data = await detectCMS(url);
      let color = 'bg-green-100 text-green-800';
      let msg = `Parece ser ${data.cms} (${Math.round(data.confidence * 100)}% confianza)`;
      if (data.confidence < 0.3) {
        color = 'bg-sky-100 text-sky-800';
        msg = `Detección poco confiable: ${data.cms} (${Math.round(data.confidence * 100)}%)`;
      }
      if (data.cms === 'Desconocido' || data.confidence === 0) {
        color = 'bg-rose-100 text-rose-800';
        msg = 'No se pudo determinar el CMS';
      }
      resultBox.textContent = msg;
      resultBox.className = `w-full p-4 rounded text-center font-medium mt-4 ${color}`;
      resultBox.classList.remove('hidden');
    } catch (err) {
      resultBox.textContent = 'Error al conectar con el backend';
      resultBox.className = 'w-full p-4 rounded text-center font-medium mt-4 bg-rose-100 text-rose-800';
      resultBox.classList.remove('hidden');
    }
  });
}
