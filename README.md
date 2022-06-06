# Proyect Md-Links 🔗
## Qué es Md-Links ❓
Md-links es un framework de Javascript que te permite reconocer URLs dentro de una archivo Markdown,
validarlas mediante un llamado HTTP y obtener información estadistica de estos: estado de enlace,
enlaces totales en un archivo, enlaces únicos y enlaces rotos. Válido para carpetas o documentos.
![md-links](https://user-images.githubusercontent.com/98667463/172027048-aebe0a9e-9f9a-4345-a1ab-e0a4307e8d91.png)

## Manual de uso
### Instalación ⬇️
El framework es instalable a través de `npm install <arelizoyarce>/md-links>`
### Funcionamiento
Luego de haber instalado el framework, este sería ejecutable a través de `md-links <nombre del archivo>`
o `md-links <nombre del archivo> <option>`.
Las posibles opciones a ejecutar son:
`--validate`
`--stats`
`--validate --stats` o `--stats --validate`
### Ejecución
# 1. 
Al colocar en la consola unicamente el nombre del archivo, te mostrará los links, la ruta de cada uno y
el texto que los envuelve.
![onlyFile](https://user-images.githubusercontent.com/98667463/172187012-da9d6bfc-9fcc-49e0-83c3-81dbcebcc8ac.png)

# 2.
Si implementa la opción `--validate` se validará cada link dentro del archivo, mostrando su estado y un mensaje de
aprobación o negación.
![fileAndValidate](https://user-images.githubusercontent.com/98667463/172187002-3ef781bc-e68a-40b0-b4ff-bd6a422b9385.png)

# 3.
Si implementa la opción `--stats` se mostrará el total de links que hay en un archivo y cuántos de estos son únicos.
![stats](https://user-images.githubusercontent.com/98667463/172191844-a106496a-b724-43bc-8244-1851a0e0bcd4.png)
# 4.
si implementa la opción `--validate --stats` se mostraran los links totales y únicos dentro del archivo y cuántos links
están rotos
![ValidateStats](https://user-images.githubusercontent.com/98667463/172187018-d663ba97-0871-4b7c-97b5-01df61d9baf3.png)

# Autoria:
📌[Areliz Oyarce](https://www.linkedin.com/in/arelizoyarce/)