## Kanban project

github pages hosted at https://nappysprout.github.io/kanban

If using mobile, tapping the item followed by tapping the destination will swap/move the items

if site becomes unresponsive, remove "boards" from localStorage

```bash
localStorage.removeItem('boards')
```
to build Sveltekit project as a SPA, use adapter static
In svelte.config.js
- Under config.kit.adapter.fallback, provide an index.html
- Under config.kit provide prerender: {entries :[]}
- Under config.kit provide paths: {base:"/<your project name>"} //so that build directory file path will match the url file path
In +layout.svelte
```bash
	export const ssr = false;
	export const prerender = true;
```
use npm run deploy //the command make use of gh-pages as seen from package.json
remember to add a .nojekyll empty file in the build directory of the branch serving the github page (folders with "_" in their names will be parsed differently by jekyll)
