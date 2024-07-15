import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="center-block">
        <h2>Prueba técnica Idrica</h2>
        <h4>Oscar Morió Pastor</h4>
        <br />
        <div className="flex flex-row gap-x">
          <div>
            <h3>Contenido realizado:</h3>
            <ul className="margin-x padding-y">
              <li>
                Feed de los diferentes posts: <Link href="/posts">Posts</Link>
              </li>
              <li>Autenticación dummy para gestionar el estado del usuario</li>
              <li>Gestión de nombre de usuario</li>
              <li>Consultar datos de un post en especifico</li>
              <li>Eliminar posts</li>
              <li>Modificar posts</li>
            </ul>
          </div>
          <div className="margin-x">
            <h3>Notas</h3>
            <ul className="margin-x padding-y">
              <li>La edición y borrado de post solo están habilitados para usuarios registrados</li>
              <li>No he utilizado librerías a parte de NextJS para demostrar soltura a la hora de trabajar con react, typescript y css</li>
              <li>Al código le falta un refactor para limpiar y ordenar. Al final se me ha acumulado bastante código y no he tenido demasiado tiempo para revisarlo</li>
              <li>Los datos se reestablecen al refrescar la página, excepto los datos de sesión del usuario que se almacenan en localStorage</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
