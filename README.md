# TMI COL — Sitio web

Sitio web estático (HTML/CSS/JS, sin build) para **TMI COL S.A.S. — Tecnologías Médicas Integrales**.

## Estado

**v0** — primera versión, usada para probar el despliegue en Vercel. El contenido y los datos de contacto (número de WhatsApp, correos) son de placeholder y se irán reemplazando en las próximas iteraciones.

## Desarrollo local

No requiere build ni dependencias. Basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático:

```bash
npx serve .
```

## Despliegue

El proyecto está pensado para desplegarse en [Vercel](https://vercel.com) como sitio estático (sin framework, `index.html` en la raíz). Conectando el repositorio de GitHub a un proyecto de Vercel, cada push a `main` genera un despliegue automático.

Repo: https://github.com/bbarrios-ui/tmicol

## Pendientes conocidos

- Reemplazar el número de WhatsApp de placeholder (`573000000000`) por el real.
- Confirmar/crear los correos `@tmicol.co` (contacto, empleo, proveedores, director técnico).
- Agregar los PDF reales en la sección de Rendición de cuentas.
- Agregar enlaces reales de redes sociales en el footer.
