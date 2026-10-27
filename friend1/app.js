import '@material/web/all.js';
const field = document.querySelector('#destination');
const output = document.querySelector('#result');
const radios = document.querySelectorAll('md-radio');
const checks = document.querySelectorAll('md-checkbox');
const reminder = document.querySelector('#reminder');

document.querySelector('#create').addEventListener('click', () => {
  const city = field.value.trim();
  field.error = !city;
  field.errorText = 'Введите название города';
  if (!city) return;
  const transport = [...radios].find(item => item.checked)?.value || 'поезд';
  const things = [...checks].filter(item => item.checked).map(item => item.value);
  output.textContent = `Город: ${city}. Транспорт: ${transport}. Взять с собой: ${things.length ? things.join(', ') : 'ничего не выбрано'}. Напоминание ${reminder.selected ? 'включено' : 'выключено'}.`;
});
document.querySelector('#clear').addEventListener('click', () => {
  field.value = '';
  field.error = false;
  radios[0].checked = true;
  checks.forEach((item, index) => item.checked = index === 0);
  reminder.selected = false;
  output.textContent = 'Заполните форму и нажмите «Составить план».';
});
const dialog = document.querySelector('#info');
document.querySelector('#dialog-open').addEventListener('click', () => dialog.show());
document.querySelector('#close').addEventListener('click', () => dialog.close());
