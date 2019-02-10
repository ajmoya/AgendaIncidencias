:: compilar para PRO
npm run build

:: navigar a la carpeta dist (salida)
cd dist

git init
git add -A
git commit -m 'deploy'

:: si estás desplegando a GitHub Pages: https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/ajmoya/agendaIncidencias.git master:gh-pages
