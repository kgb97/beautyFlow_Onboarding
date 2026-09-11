---
target: onboarding (landing + wizard de registro 5 pasos)
total_score: 31
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/home/kgb/Documentos/Salones/iziSalon_Onboarding/src/pages/RegistrationPage.tsx"
target_fingerprint: "sha256:27f0177accc61dd5e0a0fb7c8fae6700d8c142dc8318920f0128a7d8171a363a"
target_path: /home/kgb/Documentos/Salones/iziSalon_Onboarding/src/pages/RegistrationPage.tsx
timestamp: 2026-09-10T23-55-11Z
slug: src-pages-registrationpage-tsx
---
# Critique: iziSalon_Onboarding

Method: dual-agent (Assessment A: design review · Assessment B: detector + browser evidence)

## Design Health Score

Puntuado principalmente contra `/registro` (modo Operate, la superficie principal asignada). La landing (`/`) es Persuade y solo se referencia en el análisis.

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Porcentaje de progreso, checks verdes por campo en vivo, banners motivacionales por paso, spinner de envío. Excelente. |
| 2 | Match System / Real World | 3 | Copy en español natural; el placeholder del teléfono (`+5491112345678`, Argentina) no coincide con el selector País por defecto (Nicaragua +505) |
| 3 | User Control and Freedom | 3 | Anterior/Siguiente en cada paso, "Editar" desde el resumen vuelve al paso exacto. Sin autoguardado si se cierra la pestaña a mitad de camino |
| 4 | Consistency and Standards | 3 | Estilo de campos/validación/iconografía consistente; la pareja País/Teléfono es la única inconsistente |
| 5 | Error Prevention | 4 | `formatField()` enmascara el input en vivo (RUC, teléfono, nombres) — previene errores al teclear, no solo al enviar |
| 6 | Recognition Rather Than Recall | 4 | El paso 5 (Revisar) re-muestra cada campo de cada paso con link de edición — cero carga de memoria antes de crear la cuenta |
| 7 | Flexibility and Efficiency | 2 | `autoComplete` correcto por campo, pero sin atajos, sin saltos, sin camino rápido por teclado |
| 8 | Aesthetic and Minimalist Design | 3 | Contenido enfocado por paso; las decoraciones flotantes (peine/esmalte/tijeras) agregan un poco de ruido no funcional en una tarea Operate |
| 9 | Error Recovery | 4 | El banner de error global muestra el mensaje exacto del backend y detecta "email" para agregar un link contextual a "Iniciar Sesión" |
| 10 | Help and Documentation | 1 | Sin ayuda contextual más allá de placeholders. El único "documento" al que se pide aceptar (Términos y Condiciones) es un `<span>`, no un link real — ambos legales marcados "(próximamente)" en el footer |
| **Total** | | **31/40** | **Good** |

## Veredicto de Especificidad de Diseño

**Mixto — carácter de producto real sobre un esqueleto de SaaS genérico.** Específico de verdad: la mascota SalonBuddy que reacciona al campo enfocado/errores/progreso; el ícono de tijeras que literalmente "corta" el string de la contraseña mientras se escribe; decoraciones flotantes de peine/esmalte/tijeras; copy que mantiene la voz todo el flujo ("¡Sigue así!", "Crear mi Salón ✨"). Lo que resta especificidad: el esqueleto visual (glassmorphism, blobs de gradiente, tarjetas con tilt-on-hover, CTAs con pulse-glow) es el mismo kit "landing de startup de IA 2024" que se ve en cualquier categoría — quitando el copy y la mascota, la estructura Landing→wizard de 5 pasos→confirmación con confeti es intercambiable.

**Escaneo determinístico** (`detect.mjs` sobre `src`, exit 2): 16 hallazgos — `bounce-easing` ×11 (el patrón más repetido de todo el escaneo, en Confirmation/Landing/Registration/animations.css), `layout-transition` ×2 (`padding` en landing, `width` en la barra de progreso del wizard), `overused-font` ×1 (Plus Jakarta Sans, portal-wide), `gradient-text` ×1, `side-tab` ×1.

**Evidencia en navegador** (6 páginas: landing + los 5 pasos del wizard, sin llegar a enviar el paso final): el overlay en vivo encontró contraste bajo real y medido en varios puntos — insignia del hero 4.3:1, título de sección paso 2 en 4.4:1, botón primario blanco-sobre-`#6366f1` en 4.47:1 (los tres justo debajo del piso AA de 4.5:1), y en el paso 5 (Revisar, el más importante): texto de éxito de contraseña verde-sobre-blanco en **3.3:1** y el botón "Crear mi Salón" blanco-sobre-verde en **3.3:1** — ambos claramente por debajo del estándar, en el CTA más importante de todo el flujo. También detectó texto de 9.6px en las etiquetas de los pasos (bajo el piso de 11px) y saltos de jerarquía de encabezado (h1→h4 sin h2) en varias páginas. Tres falsos positivos identificados y descartados: `text-occlusion` (las propias etiquetas del overlay se superponen entre sí, no es contenido real), `ai-color-palette` (señal de gusto subjetivo), `icon-tile-stack` ×6 (una sola decisión de diseño repetida, contada 6 veces).

## Impresión General

El arco emocional del wizard está genuinamente bien construido (mascota, animación de contraseña, confeti final) y la prevención de error es de las mejores de todo el ecosistema iziSalon. La grieta real: se pide aceptar un documento legal que no existe, y el botón de conversión final del flujo entero tiene un contraste de color que falla WCAG AA de forma medible.

## Lo que Funciona

1. **Mascota SalonBuddy + animación de tijeras cortando la contraseña** — el detalle raro que sí es específico de este producto, y refuerza personalidad justo en el paso (contraseña) que suele ser el más árido.
2. **Enmascarado + validación en tiempo real** (`formatField`/`validateField` en cada tecla) — previene el error en vez de solo rechazarlo después.
3. **El resumen del paso 5** — recapitula cada respuesta con link de "Editar" directo al paso correspondiente, sin carga de memoria antes de la única acción irreversible del flujo.

## Problemas Prioritarios

**[P1] Se exige aceptar Términos y Condiciones que no existen** — el checkbox obligatorio del paso 4 dice "He leído y acepto los Términos y Condiciones..." pero ese texto es un `<span>`, no un link, y el footer de la landing marca ambos documentos "(próximamente)". Invisible además para lectores de pantalla (un `<span>` no se anuncia como interactivo).
**Fix**: publicar términos/privacidad mínimos reales antes de lanzar, o no exigir el checkbox sobre una promesa que el producto no puede cumplir todavía.
**Comando sugerido**: `$impeccable harden`

**[P1] Contraste de color falla WCAG AA en el CTA más importante del flujo** — en el paso 5 (Revisar), el botón "Crear mi Salón" (blanco sobre `#16a34a`) y el texto de éxito de contraseña (verde sobre blanco) miden **3.3:1**, muy por debajo del piso AA de 4.5:1. El botón primario del paso 2 (4.47:1) y varios textos de la landing (4.3-4.4:1) están justo debajo también.
**Fix**: oscurecer el verde del botón/texto o usar texto más grueso/oscuro hasta pasar 4.5:1, verificado con una herramienta de contraste real, no solo a ojo.
**Comando sugerido**: `$impeccable harden`

**[P2] El placeholder del teléfono contradice el selector de país por defecto** — País por defecto es Nicaragua (+505), pero el placeholder de Teléfono está fijo en formato argentino (+54). Cambiar el país no toca el placeholder, la máscara ni la validación del teléfono en absoluto.
**Fix**: derivar el placeholder/código de país del selector País, o fusionar ambos campos en un control de teléfono consciente del país.
**Comando sugerido**: `$impeccable clarify`

**[P2] Los toggles de mostrar/ocultar contraseña están muy por debajo del mínimo de 44×44px** — `.icon-right { padding: 0.25rem }` deja un hit-target de ~26×26px, dos veces seguidas en el paso de Seguridad — justo donde un toque equivocado (mostrar contraseña en público) es más costoso. Ya estaba anotado como pendiente en el propio CLAUDE.md del proyecto, confirmado que sigue sin arreglarse.
**Fix**: subir el padding a ≥0.6rem o fijar un hit-box explícito de 44×44px.
**Comando sugerido**: `$impeccable harden`

**[P2] El selector de País no tiene propósito visible junto a Teléfono** — más allá de mandarse en el payload, no localiza ni valida el campo de teléfono al lado.
**Fix**: mismo arreglo de raíz que el issue anterior — atar visiblemente ambos campos (chip de bandera/código).
**Comando sugerido**: `$impeccable clarify`

**[P3] Errores de copy en español en la pantalla de decisión más importante** — el plan Prueba dice "15 Dias de prueba de nuestra plan Premium" (falta tilde, concordancia de género incorrecta). Además "Ilimitadas sucursal(es)"/"Ilimitado staff" en varias tipografías hace que la I mayúscula y la l minúscula se vean idénticas, leyéndose como "llimitadas" — confirmado con zoom directo sobre la página renderizada, no solo en el código fuente.
**Fix**: pasada de corrección de copy; considerar "Sin límite de..." para evitar la ambigüedad I/l sin importar la tipografía.
**Comando sugerido**: `$impeccable polish`

## Alertas de Personas

**Jordan (Primerizo)**: hace click en "Términos y Condiciones" esperando un documento y no pasa nada — justo antes de crear su contraseña. Lee "Ilimitadas" como "llimitadas" en la primerísima pantalla de decisión. El selector País junto a Teléfono no tiene relación explicada — no sabe si debe tocarlo. "RUC / NIT" no tiene explicación inline de qué es o por qué se pide.

**Casey (Móvil, distraído)**: los dos íconos de ojo para mostrar/ocultar contraseña son de ~26×26px, bajo el mínimo de pulgar, justo en el paso de más consecuencia si se toca mal. El estado del formulario vive solo en `useState` de React — sin persistencia en localStorage; si el teléfono se bloquea o la pestaña se descarga (típico de uso móvil interrumpido), los 4 pasos escritos se pierden sin recuperación.

**Sam (Accesibilidad)**: los botones de mostrar/ocultar contraseña sí tienen `aria-label` correcto — un punto positivo real — pero el hit-target sigue penalizando a cualquiera con un dispositivo de apuntar asistido. El `<span>` de Términos y Condiciones es invisible para navegación por rotor/Tab de lector de pantalla — Sam no tiene ningún camino al documento que está aceptando, peor que un usuario vidente (que al menos ve y hace click, sin éxito, en algo que parece un link).

## Observaciones Menores

- El título de la pestaña dice "iziSalon — Registro de Salón" incluso en la landing (`/`) — debería reflejar la página de marketing, no filtrar el título del wizard al home.
- Durante el scroll, la sección "Empezá en 3 pasos" mostró brevemente el paso 2 semi-transparente mientras 1 y 3 ya estaban sólidos — revisar el timing del stagger.
- El paso 5 muestra un emoji 💳 junto al plan "Prueba" (gratis, $0) — un ícono de tarjeta para un plan sin tarjeta involucrada es un desajuste.
- La página de confirmación muestra un checklist de "Próximos pasos" con ícono `CheckSquare` que sugiere que se puede marcar, pero nada permite hacerlo.
- La sección `FEATURES` de la landing tiene 7 tarjetas en una sola grilla sin agrupar — excede el límite de ≤4, aunque de bajo riesgo por ser contenido de marketing navegable, no un punto de decisión.

## Preguntas para Reflexionar

- ¿El checkbox de Términos y Condiciones debería ser obligatorio en el paso 4 antes de que ese documento exista, o debería esperar a que el contenido legal realmente se publique?
- Si el selector de país no maneja el formato del teléfono hoy, ¿necesita existir como campo separado, o un solo control de teléfono consciente del país sería más simple?
- La página de confirmación se ganó su momento de confeti — ¿el wizard que lleva hasta ahí se siente igual de cuidado, o un usuario diría que es "un formulario lindo" en vez de algo construido para dueños de salón?
</content>
