# Arnés de sesiones — cómo se abre y se cierra un chat

**Creado:** 2026-08-09
**Para qué:** que cualquier chat nuevo arranque sabiendo dónde está y termine dejando el
proyecto listo para el siguiente, sin que Luis tenga que recordar nada.

> Este archivo **no se carga solo**. Lo carga `CLAUDE.md` § 9 por referencia, y Claude lo
> lee cuando arranca una sesión. Es a propósito: el contexto permanente tiene que ser
> barato, y el protocolo se consulta una vez por chat.

---

## 1. El principio: una sesión = un chat = una entrega verificable

Un chat no termina "cuando se acabó el tiempo": termina cuando hay **algo terminado y
comprobado**. Si una tarea no cabe en un chat, **se parte antes de empezar**, no a mitad.

Regla de tamaño: si la sesión toca **más de 3 archivos del sitio** o mezcla **dos
decisiones sin tomar**, es demasiado grande. Pártela.

---

## 2. Abrir un chat (lo hace Claude, en este orden)

1. **Leer `docs/ESTADO.md`** — el tablero manda. Dice qué fase toca y qué quedó a medias.
2. **Leer la ficha de la sesión** en `docs/fases/`, si la hay.
3. **Decir en dos líneas qué se va a hacer y qué NO**, y esperar el visto bueno de Luis.

> ⚠️ El paso 3 no es cortesía. Es lo que evita el fallo más caro del proyecto: ponerse a
> trabajar sobre una suposición. Ha pasado, y cuesta un chat entero.

**Si Luis abre el chat con un tema que no es la fase que toca**, se le dice —una frase,
sin sermón— y se hace lo que pidió. El tablero informa, no bloquea.

---

## 3. Durante la sesión

| Regla | Por qué |
|---|---|
| **Backup antes de sobrescribir**: `Backup/DD-MM-nombre/`, carpeta **nueva y vacía** | No hay git. La carpeta nueva es la lección del accidente de la Fase 9, donde se perdió un backup por reusar nombre |
| **Subir el `?v=`** en las 7 páginas si se toca `styles.css` o `script.js` | El `.htaccess` cachea CSS y JS **un año**. Sin subirlo, Luis no ve el cambio nunca |
| **Verificar midiendo, no mirando** | El panel de vista previa no hace scroll, no dispara `IntersectionObserver`, devuelve estilos un recálculo tarde y **nunca tiene el foco**. Contar elementos y leer propiedades, no mirar la pantalla |
| **Probar los interruptores encendidos Y apagados** | `SHOPIFY_PARTNER`, `MARKETING`, y ahora `MERCADOS`. Un interruptor que solo se probó en una posición no está probado |
| **Dato que falta = `{{PENDIENTE: ...}}`** | Nunca inventarlo (`CLAUDE.md` § 6.3) |

---

## 4. Cerrar un chat (checklist, sin excepciones)

- [ ] **Marcar la fase** en la tabla de `docs/ESTADO.md` (⬜ → 🟡 → ✅).
- [ ] **Entrada en el Registro de avance**: fecha, fase, una línea de qué se hizo.
- [ ] **Bloque "Detalle de la Fase N"** con: qué se hizo, **qué se verificó y cómo**, y
      **§ Lo aprendido**.
- [ ] **Pendientes nuevos de Luis** → tabla § Pendientes, con el número siguiente.
- [ ] **Defectos encontrados y no arreglados** → § Backlog. **Encontrar y no anotar es
      peor que no encontrar**: la próxima sesión lo arreglará "por accidente" y nadie
      aprenderá a buscarlo.
- [ ] **Aviso de publicación**: qué archivos hay que subir por FTP y con qué `?v=`.
- [ ] **Frase de arranque del chat siguiente**, literal y copiable (plantilla abajo).

### § Lo aprendido no es decorativo

Es la parte que hace que el arnés mejore solo. Va lo que **no estaba en la ficha** y se
descubrió trabajando: el fallo que solo se ve midiendo, la trampa del entorno, la
suposición que resultó falsa. Si una sesión no aprendió nada, probablemente no verificó
lo suficiente.

---

## 5. Plantilla del traspaso

Al final de cada sesión, en `docs/ESTADO.md` § Siguiente paso, va exactamente esto:

```
## Siguiente paso

[Una línea: qué toca y por qué toca eso.]

Abre un chat nuevo en esta carpeta y pega:

    Lee docs/ESTADO.md y ejecuta [la sesión X de la Fase N].

[Si depende de algo de Luis:]
⛔ Antes hace falta que tú: [qué, en una línea]. Sin eso la sesión se bloquea a mitad.
```

**La frase tiene que funcionar pegada tal cual, sin editar.** Si hay que explicarle a
Luis cómo adaptarla, está mal escrita.

---

## 6. Cómo se parte un trabajo grande en sesiones

Cuatro cortes que funcionan, en este orden:

1. **Decidir** — sin tocar código. Cierra las decisiones abiertas y escribe la ficha.
   *(Es lo que hizo la Fase 6 y destapó dos defectos que llevaban meses publicados.)*
2. **Cimentar** — la estructura de datos o los tokens que todo lo demás va a usar.
3. **Construir** — una sesión por pieza visible.
4. **Verificar y publicar** — repaso completo, accesibilidad, aviso de FTP.

El corte que **nunca** hay que hacer es por porcentaje ("hago la mitad hoy"). Deja el
sitio en un estado que no es publicable ni revertible, y el chat siguiente empieza
adivinando.

---

## 7. Estado del arnés hoy

| Pieza | Archivo |
|---|---|
| Contexto permanente (se carga solo) | `CLAUDE.md` |
| Tablero: fase, avance, pendientes, backlog | `docs/ESTADO.md` |
| Protocolo de sesión | este archivo |
| Fichas de fase | `docs/fases/FASE-*.md` |
| Sistema de diseño | `docs/DISENO.md` |
| Competencia | `docs/COMPETENCIA.md` |
| Guía de anuncios (para Luis) | `docs/GUIA-PUBLICIDAD.md` |
| Publicar en el blog (para Luis) | `blog/README.md` |
