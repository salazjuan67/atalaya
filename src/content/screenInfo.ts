export interface ScreenInfo {
  title: string
  description: string
  bullets?: string[]
}

const screenInfoMap: Record<string, ScreenInfo> = {
  login: {
    title: 'Inicio de sesión',
    description:
      'Pantalla de acceso al sistema. En este prototipo no hay autenticación real: cualquier usuario y contraseña permiten ingresar al tablero principal.',
    bullets: [
      'Simula el ingreso de visitadores y personal de la delegación.',
      'Al confirmar, redirige al tablero gerencial.',
    ],
  },
  tablero: {
    title: 'Tablero',
    description:
      'Vista macro de toda la delegación pensada para control gerencial. Resume el estado general sin entrar en cada empresa.',
    bullets: [
      'Indicadores clave: empresas, visitas, problemas, ART y afiliados.',
      'Gráficos de tendencia para detectar patrones.',
      'Listado de empresas que requieren atención inmediata con acceso al detalle.',
    ],
  },
  empresas: {
    title: 'Empresas',
    description:
      'Listado de todas las empresas bajo la delegación. Permite buscar por razón social o CUIT y evaluar el estado de cada una de un vistazo.',
    bullets: [
      'Semáforos de última visita, problemas abiertos y casos ART.',
      'Indicador "Al día" cuando no hay pendientes.',
      'Click en una fila para abrir la vista Empresa 360.',
    ],
  },
  'empresa-360': {
    title: 'Empresa 360',
    description:
      'Vista consolidada de una empresa: el corazón operativo del sistema. Reúne en un solo lugar visitas, problemas, ART, trámites e indicadores.',
    bullets: [
      'Cabecera con datos de contacto y acceso rápido a cargar visita.',
      'Indicadores resumidos y secciones de problemas, ART y trámites.',
      'Historial completo de visitas con origen checklist u OCR.',
    ],
  },
  'cargar-visita': {
    title: 'Cargar visita',
    description:
      'Pantalla operativa para el visitador en campo. Permite registrar una visita mediante checklist manual o simulación de carga por foto (OCR).',
    bullets: [
      'Selector de empresa visitada.',
      'Checklist con ítems OK / Observado / N/A.',
      'Modo foto simula detección automática de campos.',
      'Observaciones libres siempre disponibles.',
    ],
  },
  afiliados: {
    title: 'Afiliados',
    description:
      'Consulta de la nómina de afiliados de la delegación. Permite buscar por nombre, documento o empresa de pertenencia.',
    bullets: [
      'Tabla con datos básicos de cada afiliado.',
      'Fecha de alta para seguimiento de incorporaciones.',
    ],
  },
  cursos: {
    title: 'Cursos',
    description:
      'Oferta formativa de la delegación. Muestra los cursos programados con fecha e inscriptos.',
    bullets: [
      'Vista en tarjetas para escaneo rápido.',
      'Cantidad de inscriptos por curso.',
    ],
  },
}

export function getScreenInfo(pathname: string): ScreenInfo {
  if (pathname.startsWith('/empresas/') && pathname !== '/empresas') {
    return screenInfoMap['empresa-360']
  }

  const key = pathname.replace(/^\//, '').replace(/\//g, '-') || 'login'
  const directKey = pathname === '/login' ? 'login' : key

  return (
    screenInfoMap[directKey] ??
    screenInfoMap[pathname.slice(1)] ?? {
      title: 'Atalaya',
      description: 'Sistema de gestión sindical para la delegación central.',
    }
  )
}

export function getScreenSubtitle(pathname: string): string | undefined {
  const subtitles: Record<string, string> = {
    '/tablero': 'Vista macro de la delegación',
    '/empresas': 'Búsqueda y estado general',
    '/cargar-visita': 'Registro operativo en campo',
    '/afiliados': 'Nómina de afiliados',
    '/cursos': 'Formación y capacitación',
  }
  if (pathname.startsWith('/empresas/') && pathname !== '/empresas') {
    return 'Vista consolidada de la empresa'
  }
  return subtitles[pathname]
}
