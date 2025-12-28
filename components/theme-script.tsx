export function ThemeScript() {
  const themeScript = `
    (function() {
      const stored = localStorage.getItem('theme');
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const theme = stored || systemPreference;
      document.documentElement.classList.toggle('dark', theme === 'dark');
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}
