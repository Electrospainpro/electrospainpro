# ElectroSpainPro — Backlog

## 🔴 Prioridad crítica

### BL-001 — Auditoría del ESP Data Engine
- [ ] Revisar modelo de productos
- [ ] Revisar modelo de marcas
- [ ] Revisar categorías y subcategorías
- [ ] Revisar relaciones entre entidades
- [ ] Revisar comparativas
- [ ] Revisar guías
- [ ] Revisar ESP Score
- [ ] Identificar archivos incompletos
- [ ] Identificar lógica duplicada
- [ ] Identificar datos que todavía sean estáticos

### BL-002 — Consolidar modelo de productos
- [ ] Revisar `types/product.ts`
- [ ] Revisar `data/products.ts`
- [ ] Revisar `lib/products.ts`
- [ ] Revisar componentes de producto
- [ ] Definir estructura definitiva de especificaciones
- [ ] Definir relaciones de productos
- [ ] Definir productos alternativos
- [ ] Definir productos compatibles

### BL-003 — Sistema ESP Score
- [ ] Definir metodología del ESP Score
- [ ] Definir criterios de puntuación
- [ ] Definir pesos
- [ ] Definir cálculo
- [ ] Definir nivel de confianza
- [ ] Conectar Score con producto
- [ ] Mostrar Score correctamente en fichas
- [ ] Mostrar recomendación basada en Score

---

# 🟠 Alta prioridad

### BL-004 — Motor de comparativas
- [ ] Revisar modelo de comparativas
- [ ] Revisar criterios
- [ ] Revisar productos comparados
- [ ] Revisar tabla comparativa
- [ ] Revisar veredicto
- [ ] Conectar comparativas con productos
- [ ] Conectar comparativas con marcas
- [ ] Conectar comparativas con categorías
- [ ] Añadir SEO dinámico

### BL-005 — Motor de guías
- [ ] Revisar modelo de guías
- [ ] Revisar contenido
- [ ] Relacionar guías con productos
- [ ] Relacionar guías con comparativas
- [ ] Relacionar guías con categorías
- [ ] Añadir SEO dinámico

### BL-006 — Productos relacionados
- [ ] Definir reglas de relación
- [ ] Productos alternativos
- [ ] Productos compatibles
- [ ] Productos relacionados por categoría
- [ ] Productos relacionados por características
- [ ] Productos relacionados con guías
- [ ] Productos relacionados con comparativas

### BL-007 — Sistema de búsqueda
- [ ] Revisar búsqueda actual
- [ ] Búsqueda por producto
- [ ] Búsqueda por marca
- [ ] Búsqueda por categoría
- [ ] Búsqueda por especificaciones
- [ ] Filtros
- [ ] Ordenación
- [ ] Resultados relacionados

### BL-008 — SEO dinámico
- [ ] Revisar metadata
- [ ] Productos
- [ ] Marcas
- [ ] Categorías
- [ ] Comparativas
- [ ] Guías
- [ ] Herramientas
- [ ] Sitemap
- [ ] Robots
- [ ] Schema

---

# 🟡 Prioridad media

### BL-009 — Herramientas técnicas

- [ ] Calculadora de caída de tensión
- [ ] Calculadora de sección de cable
- [ ] Conversor AWG ↔ mm²
- [ ] Herramientas fotovoltaicas
- [ ] Validación de cálculos
- [ ] SEO de herramientas

### BL-010 — Contenido técnico

- [ ] Guías eléctricas
- [ ] Guías fotovoltaicas
- [ ] Guías de telecomunicaciones
- [ ] Guías de instrumentación
- [ ] Glosario técnico
- [ ] Knowledge base

### BL-011 — Afiliación

- [ ] Modelo de enlaces de afiliación
- [ ] Amazon
- [ ] ManoMano
- [ ] Leroy Merlin
- [ ] RS
- [ ] Farnell
- [ ] Seguimiento de enlaces
- [ ] Gestión de disponibilidad/precio

### BL-012 — Newsletter

- [ ] Formulario
- [ ] Validación
- [ ] Consentimiento
- [ ] Integración con proveedor
- [ ] Página de confirmación

---

# 🟢 Futuro

### BL-013 — IA
- [ ] Asistente técnico
- [ ] Recomendación inteligente
- [ ] Generación asistida de comparativas
- [ ] Generación asistida de contenido

### BL-014 — Área Premium
- [ ] Cuenta de usuario
- [ ] Herramientas avanzadas
- [ ] Comparativas profesionales
- [ ] Historial

### BL-015 — Marketplace
- [ ] Proveedores
- [ ] Productos
- [ ] Ofertas
- [ ] Gestión comercial

### BL-016 — Comunidad
- [ ] Usuarios
- [ ] Preguntas
- [ ] Respuestas
- [ ] Valoraciones

### BL-017 — Formación
- [ ] Cursos
- [ ] Recursos
- [ ] Material técnico

---

# Sprint 18

## Objetivo

Consolidar el ESP Data Engine y conectar las entidades principales de ElectroSpainPro.

## Tareas iniciales

- [ ] Auditoría del modelo de datos
- [ ] Auditoría del modelo de productos
- [ ] Auditoría del modelo de marcas
- [ ] Auditoría de categorías
- [ ] Auditoría de relaciones
- [ ] Auditoría de comparativas
- [ ] Auditoría de guías
- [ ] Auditoría del ESP Score
- [ ] Detectar componentes incompletos
- [ ] Detectar datos estáticos
- [ ] Detectar código duplicado
- [ ] Definir arquitectura definitiva del ESP Data Engine

## Criterio de finalización

El Sprint 18 se considerará terminado cuando:

1. Las entidades principales tengan modelos coherentes.
2. Las relaciones estén definidas.
3. Los datos fluyan correctamente hacia los componentes.
4. No existan componentes importantes creados pero sin implementación sin una razón documentada.
5. El ESP Score tenga una metodología definida.
6. El catálogo pueda crecer sin modificar la arquitectura principal.
7. La estructura quede preparada para incorporar productos reales a escala.

---

# Estados

- [ ] Pendiente
- [~] En progreso
- [x] Completado

---

# Regla del backlog

No añadir una tarea como pendiente si ya existe una implementación funcional.

Cuando una funcionalidad existente necesite mejoras, debe actualizarse su tarea en lugar de duplicarla.