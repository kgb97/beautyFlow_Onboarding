import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FileText, AlertTriangle } from 'lucide-react';
import { PlatformSettingsService, type PlatformSettingsDto } from '../services/platformSettingsService';
import { TERMS_VERSION } from '../constants/legal';
import './LegalPage.css';

// Borrador de Términos y Condiciones / Política de Privacidad, versión TERMS_VERSION
// (ver src/constants/legal.ts). El checkbox de aceptación del registro guarda este
// mismo identificador en Company.TermsAcceptedVersion -- para saber exactamente qué
// texto aceptó un dueño en el pasado, se busca en el historial de git de este
// archivo la versión vigente en esa fecha.
//
// OJO: este texto lo redactó un asistente de IA como borrador de trabajo. NO
// sustituye revisión de un abogado. iziSalon todavía no está constituida como
// entidad legal formal -- mientras eso no cambie, la responsabilidad recae
// directamente sobre la persona titular del negocio, sin importar qué tan bien
// redactado esté este documento.
const TITULAR_PLACEHOLDER = '[NOMBRE COMPLETO O RAZÓN SOCIAL DEL TITULAR — completar antes de publicar]';

const TOC = [
  { id: 'terminos', label: 'Términos y Condiciones' },
  { id: 'privacidad', label: 'Política de Privacidad' },
  { id: 'fichas-tecnicas', label: 'Fichas técnicas de clientes' },
];

const LegalPage = () => {
  const [settings, setSettings] = useState<PlatformSettingsDto | null>(null);

  useEffect(() => {
    PlatformSettingsService.getSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-shell">
        <Link to="/registro" className="legal-back"><ChevronLeft size={16} /> Volver al registro</Link>

        <div className="legal-card glass-panel legal-draft-notice">
          <div className="legal-icon legal-icon-warn"><AlertTriangle size={22} /></div>
          <h1>Borrador en revisión — no es la versión legal final</h1>
          <p>
            Este documento es un <strong>borrador de trabajo</strong> preparado para que iziSalon
            pueda operar con reglas claras mientras se completa la revisión legal formal. Todavía
            no fue revisado ni aprobado por un abogado, y iziSalon <strong>aún no está constituida
            como una entidad legal formal</strong> (sociedad, empresa registrada, etc.). Mientras
            eso no cambie, quien opera el servicio lo hace a título personal, con la
            responsabilidad que eso implica — ninguna cláusula de este texto cambia esa realidad.
          </p>
          <p className="legal-meta">Versión: <strong>{TERMS_VERSION}</strong> · Titular: {TITULAR_PLACEHOLDER}</p>
        </div>

        <nav className="legal-toc glass-panel">
          <span className="legal-toc-label"><FileText size={16} /> Contenido</span>
          <ul>
            {TOC.map(item => (
              <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
            ))}
          </ul>
        </nav>

        <article className="legal-card glass-panel legal-prose">
          <section id="terminos">
            <h2>1. Términos y Condiciones de Uso</h2>

            <h3>1.1 Quiénes somos y a quién aplica</h3>
            <p>
              iziSalon es un software de gestión para salones de belleza y negocios similares
              ("el Servicio"), operado por {TITULAR_PLACEHOLDER} ("nosotros", "iziSalon"). Estos
              Términos aplican a toda persona o negocio que registra una cuenta ("el Salón", "vos")
              y a su personal autorizado. No aplican a los clientes finales del Salón, que
              interactúan solo con el módulo público de reservas sin crear cuenta.
            </p>

            <h3>1.2 Objeto del Servicio</h3>
            <p>
              iziSalon ofrece herramientas para administrar sucursales, personal, servicios,
              agenda de citas, clientes, inventario, facturación interna y comunicación
              automática con clientes finales (email y WhatsApp, cuando el Salón los tiene
              activos). El Servicio se ofrece "tal cual" ("as is"), en evolución continua —
              podemos agregar, modificar o retirar funciones, avisando con antelación razonable
              los cambios que afecten funciones que ya estés usando activamente.
            </p>

            <h3>1.3 Tu cuenta y tu responsabilidad</h3>
            <p>
              Sos responsable de mantener la confidencialidad de tus credenciales de acceso y de
              toda actividad que ocurra bajo tu cuenta. Debés darnos información veraz al
              registrarte y mantenerla actualizada. Si detectás un uso no autorizado de tu cuenta,
              avisanos de inmediato a {settings?.supportEmail || '[correo de soporte]'}.
            </p>
            <p>
              El Salón es responsable de las acciones de todo el personal al que le da acceso a
              su cuenta (roles Admin / Recepcionista), incluyendo qué datos de clientes registra y
              qué le comunica a sus propios clientes a través del Servicio.
            </p>

            <h3>1.4 Planes, precios y facturación</h3>
            <p>
              El Servicio se ofrece por planes de suscripción mensual, con límites de uso
              (sucursales, personal, servicios, clientes, citas) según el plan contratado. Algunos
              planes incluyen un período de prueba gratuito ("trial"); pasado ese período sin un
              plan pago activo, la cuenta entra en modo de solo lectura hasta regularizar el pago.
            </p>
            <p>
              El cobro es manual: no operamos una pasarela de pago automática. Confirmamos el pago
              cuando recibimos la transferencia o depósito correspondiente por los medios que te
              indiquemos. Mientras un ciclo de pago esté vencido sin confirmación, la cuenta puede
              quedar en modo de solo lectura.
            </p>
            <p>
              Las notificaciones automáticas por correo electrónico y WhatsApp hacia tus clientes
              finales son <strong>add-ons opcionales</strong>, facturados aparte del plan base. Se
              activan y desactivan a tu solicitud; mientras estén desactivados, no se envía ninguna
              notificación automática ni se cobra por ellos. Si activás un add-on a mitad de un
              ciclo de facturación ya en curso, se aplica un cargo retroactivo por el precio
              mensual completo del add-on para ese ciclo (sin prorrateo por días). Si lo
              desactivás, no hay reembolso de lo ya cobrado — simplemente no se vuelve a incluir en
              el ciclo siguiente.
            </p>

            <h3>1.5 Suspensión y terminación de cuenta</h3>
            <p>
              Podemos poner tu cuenta en modo de solo lectura automáticamente si el período de
              prueba vence sin plan pago, o si un ciclo de pago vence sin confirmación. Podemos
              inactivar una cuenta manualmente ante uso indebido, fraude, o incumplimiento de estos
              Términos, avisándote el motivo. Podés cancelar tu cuenta en cualquier momento
              escribiéndonos; los datos ya generados se conservan según lo descrito en la Política
              de Privacidad.
            </p>

            <h3>1.6 Uso aceptable</h3>
            <p>
              No está permitido usar el Servicio para actividades ilegales, enviar comunicaciones
              no solicitadas (spam) a través de los módulos de notificación, intentar vulnerar la
              seguridad de la plataforma, ni acceder a datos de otras cuentas sin autorización. El
              Servicio es multi-empresa: cada Salón solo puede ver y operar sus propios datos.
            </p>

            <h3>1.7 Propiedad intelectual</h3>
            <p>
              El software, marca, diseño y contenido propio de iziSalon nos pertenecen. Los datos
              que vos cargás (tus servicios, tu lista de clientes, tus precios, etc.) son tuyos —
              solo los usamos para prestarte el Servicio.
            </p>

            <h3>1.8 Limitación de responsabilidad</h3>
            <p>
              El Servicio se ofrece sin garantías de disponibilidad ininterrumpida. En la medida
              permitida por la ley, no somos responsables por daños indirectos, lucro cesante, ni
              pérdida de datos causada por uso indebido del Servicio, fallas de terceros
              (proveedores de hosting, internet, WhatsApp/EvolutionAPI, proveedores de correo), o
              fuerza mayor. Sí somos responsables de operar el Servicio con cuidado razonable y de
              corregir errores que reportes dentro de un plazo razonable.
            </p>

            <h3>1.9 Cambios a estos Términos</h3>
            <p>
              Podemos actualizar estos Términos. Un cambio material se te avisará dentro del
              Servicio o por correo antes de entrar en vigencia, con una nueva fecha de versión. El
              uso continuado del Servicio después de esa fecha implica aceptación de la nueva
              versión.
            </p>

            <h3>1.10 Ley aplicable</h3>
            <p>
              Estos Términos se rigen por las leyes de [PAÍS — completar según domicilio legal del
              titular una vez constituida la entidad]. Cualquier disputa se someterá a los
              tribunales competentes de esa jurisdicción, salvo que la ley aplicable disponga otra
              cosa.
            </p>
          </section>

          <section id="privacidad">
            <h2>2. Política de Privacidad</h2>

            <h3>2.1 Qué datos recolectamos</h3>
            <p>
              <strong>Del dueño del Salón y su personal:</strong> nombre, correo, teléfono,
              contraseña (guardada cifrada), y datos del negocio (nombre comercial, dirección,
              identificación fiscal). <strong>De los clientes finales del Salón:</strong> nombre,
              teléfono, y los datos que el propio Salón decida registrar sobre ellos (historial de
              citas, notas, y — si el Salón lo activa — fichas técnicas de tratamientos; ver
              sección 3).
            </p>

            <h3>2.2 Quién es responsable de qué dato</h3>
            <p>
              Para los datos del Salón y su personal, iziSalon es responsable directo del
              tratamiento. Para los datos de los <strong>clientes finales del Salón</strong>, el
              Salón es quien decide qué registrar y con qué fin (es el responsable / "controller"
              de esos datos); iziSalon actúa como proveedor técnico que almacena y procesa esa
              información por instrucción del Salón (encargado / "processor"). Esto significa que
              cada Salón es responsable de contar con la base legal necesaria (por ejemplo,
              consentimiento) para registrar los datos de sus propios clientes.
            </p>

            <h3>2.3 Para qué usamos los datos</h3>
            <p>
              Para operar el Servicio (agenda, facturación, notificaciones), para soporte técnico,
              para mejorar el producto (de forma agregada, sin identificar a personas), y para
              comunicarte novedades del Servicio. No vendemos datos personales a terceros.
            </p>

            <h3>2.4 Con quién compartimos datos</h3>
            <p>
              Con proveedores de infraestructura que hacen posible el Servicio: hosting de base de
              datos y del backend, y — cuando el Salón tiene esos add-ons activos — proveedores de
              envío de correo y de mensajería WhatsApp. Estos proveedores solo acceden a los datos
              necesarios para prestar su servicio técnico y están obligados a protegerlos.
            </p>

            <h3>2.5 Retención y eliminación</h3>
            <p>
              Conservamos los datos mientras la cuenta esté activa. Si cancelás tu cuenta, podés
              pedirnos la eliminación de tus datos y los de tus clientes escribiendo a{' '}
              {settings?.supportEmail || '[correo de soporte]'}; conservaremos únicamente lo que
              la ley nos obligue a retener (por ejemplo, registros de facturación).
            </p>

            <h3>2.6 Tus derechos</h3>
            <p>
              Podés pedir acceso, corrección o eliminación de tus datos personales en cualquier
              momento. Si sos cliente final de un Salón y querés ejercer estos derechos sobre tus
              propios datos, el primer punto de contacto es el Salón donde te atendés — es quien
              decidió registrarlos.
            </p>

            <h3>2.7 Seguridad</h3>
            <p>
              Usamos medidas técnicas razonables (cifrado de contraseñas, acceso restringido por
              rol, conexiones cifradas) para proteger los datos. Ningún sistema es 100% infalible;
              si detectamos un incidente que afecte tus datos, te avisaremos.
            </p>

            <h3>2.8 Menores de edad</h3>
            <p>
              El Servicio no está dirigido a menores de edad como usuarios del panel administrativo.
              Un Salón puede registrar citas de clientes finales menores de edad como parte normal
              de su negocio (por ejemplo, un corte de cabello infantil); esos datos quedan sujetos a
              las mismas reglas de esta Política y de la sección 3.
            </p>

            <h3>2.9 Cambios a esta Política</h3>
            <p>
              Igual que los Términos, un cambio material se avisará con antelación y quedará
              reflejado en una nueva fecha de versión.
            </p>
          </section>

          <section id="fichas-tecnicas">
            <h2>3. Fichas técnicas / historial de tratamientos de clientes</h2>
            <p>
              Algunos módulos de iziSalon permiten al Salón registrar una "ficha técnica" por
              cliente: historial de tratamientos (por ejemplo, alisados o procedimientos
              faciales), productos usados, reacciones, y notas del estilista o esteticista.
            </p>
            <ul className="legal-list">
              <li>
                iziSalon es una <strong>herramienta de registro para uso profesional del
                Salón</strong>, no un sistema de historia clínica médica ni un dispositivo médico.
                No está certificada como tal.
              </li>
              <li>
                El Salón es responsable de <strong>obtener el consentimiento informado de su
                cliente</strong> antes de registrar datos sensibles sobre su piel, cabello, alergias
                o condiciones relacionadas al tratamiento, y de explicarle cómo se van a usar esos
                datos.
              </li>
              <li>
                iziSalon <strong>no verifica la exactitud</strong> de lo que el personal del Salón
                carga en una ficha técnica — la responsabilidad profesional sobre el contenido
                clínico/técnico (por ejemplo, indicar un producto incompatible con una alergia
                registrada) es del Salón y su personal, no de iziSalon.
              </li>
              <li>
                Ante un reclamo de un cliente final relacionado con el mal manejo o mala
                interpretación de su ficha técnica, la <strong>responsabilidad primaria recae en el
                Salón</strong> que la registró y la usó — iziSalon responde únicamente por fallas
                atribuibles al funcionamiento técnico de la plataforma (por ejemplo, pérdida de
                datos por una falla nuestra), no por decisiones profesionales tomadas con base en
                esos datos.
              </li>
              <li>
                Estos datos se protegen con las mismas medidas de seguridad descritas en la sección
                2.7. El Salón puede eliminar la ficha técnica de un cliente en cualquier momento
                desde el panel.
              </li>
            </ul>
          </section>
        </article>

        <div className="legal-card glass-panel">
          <p>
            ¿Dudas sobre este documento o sobre cómo manejamos tus datos?
          </p>
          <ul className="legal-contact">
            {settings?.supportEmail && <li>Email: <a href={`mailto:${settings.supportEmail}`}>{settings.supportEmail}</a></li>}
            {settings?.supportPhone && <li>Teléfono: {settings.supportPhone}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
