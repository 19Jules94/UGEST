# Primeros pasos
#### Instalar NodeJS
Para ello nos dirigimos a https://nodejs.org/es/download/ y descargamos la versión LTS que es la 16.x y la instalamos. NOTA: Asegurarse de que viene instalado npm, por lo general es asi, hacer un `npm -version`.

#### Instalar angular cli
Para ello abrimos una consola de windows, preferiblemente CMD. En ella escribimos `npm install -g @angular/cli`.

 Clonar proyecto
Antes de nada, debemos tener instalado xammp. Para clonar el proyecto nos vamos a la carpeta de xammp, por defecto esta en el disco local C, y la ruta sería la siguiente: C:/xampp/htdocs y dentro de htdocs clonamos nuestro proyecto con `git clone https://github.com/19Jules94/UGEST.git`

#### Lanzar xammp
Importar la base de datos sced para que angular funcione correctamente

#### Lanzar angular

Accdedemos a la carpeta C:/xampp/htdocs/UGEST/ui con cmd y dentro de ui probamos a lanzar el servidor de angular con `ng serve` para ver que funciona correctamente.

# Crear componentes en angular

#### Crear guards 
Con cmd accedemos a la ruta `C:/xampp/htdocs/UGEST/ui/src/guards`. Una vez situados en guards, creamos los guards correspondientes con `ng g guard nombre-del-guard`. Nota si es l nombre tiene espacios, por ejemplo gestion de tutorias, en el guard escribir gestion-tutorias,muy imnportante  el -. Seleccionar la opcion CanActivate() y pulsar enter. Añadir el codigo pertinente

#### Crear wrappers
Con el propio VSCODE, en la carpeta services/wrappers, creamos los wrappers correspondientes con su respectivo codigo.

#### Crear modelos
Con el propio VSCODE, en la carpeta models, creamos las carpetas pertinentes con sus archivos correspondientes y su codigo.