# ElectroSpainPro — Architectural Decisions

Registro de decisiones importantes de arquitectura y desarrollo.

---

## ADR-001 — Next.js como framework principal

**Estado:** Adoptada

ElectroSpainPro utiliza Next.js como framework principal.

### Motivo

Permite combinar:

- Aplicación web moderna
- Routing
- Renderizado del lado servidor
- SEO
- Páginas dinámicas
- Arquitectura escalable

---

## ADR-002 — TypeScript

**Estado:** Adoptada

El proyecto utiliza TypeScript.

### Motivo

El catálogo de ElectroSpainPro tendrá múltiples entidades relacionadas.

El tipado permite reducir errores y mantener coherencia entre:

- Productos
- Marcas
- Categorías
- Comparativas
- Guías
- Relaciones
- Herramientas

---

## ADR-003 — App Router

**Estado:** Adoptada

El proyecto utiliza el App Router de Next.js.

Las rutas se organizan dentro de:

```text
app/