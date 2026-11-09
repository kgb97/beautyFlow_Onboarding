// Indicador de carga único de iziSalon: el isotipo de la marca (dos arcos) girando. Toma el color del texto
// (currentColor), así sirve sobre un botón, una tarjeta o la pantalla. No lleva texto: acompañalo con uno
// ("Cargando…") o dale role="status" a quien lo envuelva. Estilos: .izi-spinner en el CSS global.
const Spinner = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg className={`izi-spinner${className ? ` ${className}` : ''}`} viewBox="0 0 200 200" width={size} height={size} aria-hidden="true" focusable="false">
    <path d="M49.6 142.1 A55 55 0 1 1 136.7 118.8" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round" />
    <path d="M150.4 57.9 A55 55 0 1 1 63.3 81.2" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round" opacity="0.55" />
  </svg>
);

export default Spinner;
