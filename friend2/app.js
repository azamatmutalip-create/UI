const $ = (s) => document.querySelector(s);
let toastTimer;
function toast(text) {
  $('#toast').textContent = text;
  $('#toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').hidden = true, 3000);
}
try {
  await import('@material/web/all.js');
  $('#loading').textContent = 'Компоненты загружены';
} catch {
  $('#loading').textContent = 'Не удалось загрузить Material Web. Проверь интернет и обнови страницу.';
}
for (const card of document.querySelectorAll('[data-doc]')) {
  const example = card.querySelector('[data-example]').innerHTML.trim();
  const footer = document.createElement('div');
  footer.className = 'card-footer';
  const button = document.createElement('md-text-button');
  button.textContent = 'Копировать HTML';
  button.onclick = async () => {
    try { await navigator.clipboard.writeText(example); toast('HTML-код скопирован'); }
    catch { details.open = true; toast('Выдели и скопируй код под примером'); }
  };
  const link = document.createElement('a');
  link.className = 'doc-link';
  link.href = `https://github.com/material-components/material-web/blob/main/docs/components/${card.dataset.doc}.md`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Документация ↗';
  footer.append(button, link);
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = 'Посмотреть HTML';
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = example;
  pre.append(code);
  details.append(summary, pre);
  card.append(footer, details);
}
$('#save').onclick = () => { $('#button-status').textContent = 'Изменения сохранены ✓'; toast('Готово! Изменения сохранены'); };
$('#more').onclick = () => { $('#button-status').textContent = 'Filled — главное действие, Outlined — второстепенное, Text — дополнительное.'; };
$('#reset').onclick = () => { $('#button-status').textContent = 'Пример сброшен. Нажми на любую кнопку'; };
// Цветовая схема применяется через системные CSS-переменные Material 3.
const availableColors = ['blue', 'purple', 'green'];
const savedColor = localStorage.getItem('material-color');
const initialColor = availableColors.includes(savedColor) ? savedColor : 'blue';
document.body.dataset.colorTheme = initialColor;
document.querySelector(`input[name="color-theme"][value="${initialColor}"]`).checked = true;
for (const option of document.querySelectorAll('input[name="color-theme"]')) {
  option.addEventListener('change', () => {
    if (option.checked) {
      document.body.dataset.colorTheme = option.value;
      localStorage.setItem('material-color', option.value);
    }
  });
}
$('#theme').selected = localStorage.getItem('material-theme') === 'dark';
const applyTheme = () => { document.body.classList.toggle('dark', $('#theme').selected); localStorage.setItem('material-theme', $('#theme').selected ? 'dark' : 'light'); };
applyTheme();
$('#theme').addEventListener('change', applyTheme);
$('#notifications').addEventListener('change', () => { $('#notify-status').textContent = `Уведомления ${$('#notifications').selected ? 'включены' : 'выключены'}`; });
$('#greet').onclick = () => {
  const name = $('#name').value.trim();
  $('#name').error = !name;
  $('#name').errorText = 'Сначала введи имя';
  $('#greeting').textContent = name ? `Привет, ${name}! ` : 'Введи имя в поле выше';
};
for (const box of document.querySelectorAll('.feature')) box.addEventListener('change', () => { $('#features').textContent = `Выбрано: ${[...document.querySelectorAll('.feature')].filter(b => b.checked).length} из 3`; });
for (const radio of document.querySelectorAll('md-radio')) radio.addEventListener('change', () => { if (radio.checked) $('#device-status').textContent = `Выбрано: ${radio.value}`; });
$('#sample').style.fontSize = '24px';
$('#size').addEventListener('input', () => { $('#sample').style.fontSize = `${$('#size').value}px`; $('#size-value').textContent = `${$('#size').value} px`; });
const panels = ['Material Design — система оформления интерфейсов от Google.', 'Компоненты подключаются из @material/web и используются как обычные HTML-теги.', 'На этой странице показаны девять примеров использования компонентов.'];
$('#tabs').addEventListener('change', () => { $('#tab-panel').textContent = panels[$('#tabs').activeTabIndex]; });
$('#open-dialog').onclick = () => $('#dialog').show();
$('#close-dialog').onclick = () => { $('#dialog').close(); $('#dialog-status').textContent = 'Действие отложено'; };
$('#confirm-dialog').onclick = () => { $('#dialog').close(); $('#dialog-status').textContent = 'Действие подтверждено'; toast('Действие подтверждено'); };
$('#start-progress').onclick = () => {
  const button = $('#start-progress');
  button.disabled = true;
  let value = 0;
  $('#progress').value = 0;
  $('#progress-value').textContent = '0%';
  const timer = setInterval(() => {
    value += 5;
    $('#progress').value = value / 100;
    $('#progress-value').textContent = `${value}%`;
    if (value >= 100) { clearInterval(timer); button.disabled = false; button.textContent = 'Повторить загрузку'; toast('Демонстрационная загрузка завершена'); }
  }, 100);
};
for (const link of document.querySelectorAll('aside a')) link.onclick = () => {
  document.querySelector('aside a.active')?.classList.remove('active');
  link.classList.add('active');
};
