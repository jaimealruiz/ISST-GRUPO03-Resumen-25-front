# INSTRUCCIONES GENERALES PARA TRABAJAR CON EL REPOSITORIO

Guía para trabajar con el repositorio:

1. Clonar el repositorio
git clone https://github.com/jaimealruiz/ISST-GRUPO03-Resumen-25.git

2. Configurar vuestro usuario
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@example.com"

3. Moverse a la carpeta del proyecto y asegurarse de estar en la rama principal:
cd ISST-GRUPO03-Resumen-25
git checkout main

4. Para colaborar:
    4.1. Crear una rama para desarrollar sin afectar el código principal
    git checkout -b mi-rama

    4.2. Añadir cambios y subirlos al repo:
    git add .
    git commit -m "Descripción de los cambios"
    git push origin mi-rama

    4.3. Hacer un Pull Request (PR):
        * Ir a GitHub, al repositorio.
        * Aparecerá una opción para hacer un "Pull Request" (PR).
        * Seleccionar la rama y escribir una breve descripción.
        * Enviar el PR para revisión antes de fusionarlo con main.

5. Cada miembro debe actualizar su código antes de trabajar
git checkout main
git pull origin main
git checkout mi-rama
git merge main
