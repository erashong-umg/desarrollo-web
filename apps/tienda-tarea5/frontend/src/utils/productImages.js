// Carga perezosa de todas las miniaturas disponibles en src/img/products/.
// Si un archivo aún no existe, simplemente no aparece en el mapa (no rompe
// el build): en cuanto se agregue el archivo con el nombre esperado, la
// siguiente vez que Vite escanee el directorio quedará disponible.
const modules = import.meta.glob('../img/products/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const imagesByFilename = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => [path.split('/').pop(), url]),
)

export function getProductThumbnail(filename) {
  return filename ? imagesByFilename[filename] : undefined
}
