// ─── Tipos ───────────────────────────────────────────────────────────────────

export type VisitaOrigen = 'checklist' | 'foto_ocr'
export type VisitaItemEstado = 'ok' | 'observado' | 'na'
export type ProblemaEstado = 'abierto' | 'en_proceso' | 'resuelto'
export type CasoSeguimientoEstado = 'en_seguimiento' | 'cerrado'

export interface VisitaItem {
  item: string
  estado: VisitaItemEstado
}

export interface Empresa {
  id: string
  cuit: string
  razonSocial: string
  rubro: string
  cantTrabajadores: number
  telefono: string
  direccion: string
  ultimaVisita: string
  problemasAbiertos: number
  casosArtAbiertos: number
  afiliados: number
}

export interface Afiliado {
  id: string
  empresaId: string
  nombre: string
  documento: string
  fechaAlta: string
}

export interface Visita {
  id: string
  empresaId: string
  fecha: string
  visitador: string
  origen: VisitaOrigen
  observaciones: string
  items: VisitaItem[]
}

export interface Problema {
  id: string
  empresaId: string
  tipo: string
  descripcion: string
  fecha: string
  estado: ProblemaEstado
}

export interface CasoArt {
  id: string
  empresaId: string
  afiliado: string
  descripcion: string
  fecha: string
  estado: CasoSeguimientoEstado
}

export interface TramiteMinisterio {
  id: string
  empresaId: string
  afiliado: string
  descripcion: string
  estado: CasoSeguimientoEstado
}

export interface IndicadoresMes {
  empresaId: string
  afiliacionesNuevas: number
  osAtendidos: number
  osAusentes: number
  beneficiosTurismo: number
  inscriptosCursos: number
}

export interface Curso {
  id: string
  nombre: string
  fecha: string
  inscriptos: number
}

// ─── Datos ───────────────────────────────────────────────────────────────────

export const empresas: Empresa[] = [
  {
    id: 'emp-001',
    cuit: '30-71234567-8',
    razonSocial: 'Metalúrgica Litoral SA',
    rubro: 'Metalúrgica',
    cantTrabajadores: 142,
    telefono: '0343 456-7890',
    direccion: 'Av. Almafuerte 1250, Paraná, Entre Ríos',
    ultimaVisita: '2026-05-18',
    problemasAbiertos: 2,
    casosArtAbiertos: 1,
    afiliados: 98,
  },
  {
    id: 'emp-002',
    cuit: '30-65432198-3',
    razonSocial: 'Alimentos del Paraná SA',
    rubro: 'Alimenticia',
    cantTrabajadores: 87,
    telefono: '03476 42-1100',
    direccion: 'Ruta 12 km 4,5, Colón, Entre Ríos',
    ultimaVisita: '2026-05-22',
    problemasAbiertos: 1,
    casosArtAbiertos: 0,
    afiliados: 61,
  },
  {
    id: 'emp-003',
    cuit: '30-58963214-1',
    razonSocial: 'Textil Norte Cordobesa SA',
    rubro: 'Textil',
    cantTrabajadores: 203,
    telefono: '0351 478-2200',
    direccion: 'Av. Colón 3840, Córdoba, Córdoba',
    ultimaVisita: '2026-05-10',
    problemasAbiertos: 3,
    casosArtAbiertos: 2,
    afiliados: 156,
  },
  {
    id: 'emp-004',
    cuit: '30-40125896-7',
    razonSocial: 'Plásticos Industriales Berazategui SRL',
    rubro: 'Plásticos',
    cantTrabajadores: 54,
    telefono: '011 4256-3300',
    direccion: 'Calle 148 N° 2340, Berazategui, Buenos Aires',
    ultimaVisita: '2026-04-02',
    problemasAbiertos: 0,
    casosArtAbiertos: 0,
    afiliados: 38,
  },
  {
    id: 'emp-005',
    cuit: '30-33789456-2',
    razonSocial: 'Logística Río de la Plata SA',
    rubro: 'Logística y transporte',
    cantTrabajadores: 118,
    telefono: '0221 489-7700',
    direccion: 'Camino Centenario 4500, La Plata, Buenos Aires',
    ultimaVisita: '2026-03-28',
    problemasAbiertos: 1,
    casosArtAbiertos: 0,
    afiliados: 72,
  },
  {
    id: 'emp-006',
    cuit: '30-29874563-9',
    razonSocial: 'Frigorífico La Pampa SA',
    rubro: 'Frigorífico',
    cantTrabajadores: 176,
    telefono: '02302 42-8800',
    direccion: 'Ruta 35 km 12, General Pico, La Pampa',
    ultimaVisita: '2026-04-15',
    problemasAbiertos: 0,
    casosArtAbiertos: 1,
    afiliados: 124,
  },
  {
    id: 'emp-007',
    cuit: '30-21547896-4',
    razonSocial: 'Cerámica San Luis SA',
    rubro: 'Cerámica',
    cantTrabajadores: 63,
    telefono: '02657 42-1500',
    direccion: 'Av. Lafinur 890, Villa Mercedes, San Luis',
    ultimaVisita: '2026-02-20',
    problemasAbiertos: 0,
    casosArtAbiertos: 0,
    afiliados: 41,
  },
  {
    id: 'emp-008',
    cuit: '30-18745632-5',
    razonSocial: 'Química Rosario SA',
    rubro: 'Química',
    cantTrabajadores: 95,
    telefono: '0341 430-6600',
    direccion: 'Bv. Oroño 3100, Rosario, Santa Fe',
    ultimaVisita: '2026-05-05',
    problemasAbiertos: 1,
    casosArtAbiertos: 0,
    afiliados: 67,
  },
  {
    id: 'emp-009',
    cuit: '30-10234567-6',
    razonSocial: 'Automotriz Pilar SA',
    rubro: 'Automotriz',
    cantTrabajadores: 231,
    telefono: '0230 444-1200',
    direccion: 'Panamericana km 50, Pilar, Buenos Aires',
    ultimaVisita: '2026-04-28',
    problemasAbiertos: 2,
    casosArtAbiertos: 1,
    afiliados: 189,
  },
]

export const afiliados: Afiliado[] = [
  // Metalúrgica Litoral
  { id: 'afi-001', empresaId: 'emp-001', nombre: 'Roberto Giménez', documento: '22.345.678', fechaAlta: '2019-03-14' },
  { id: 'afi-002', empresaId: 'emp-001', nombre: 'María Elena Acosta', documento: '24.567.890', fechaAlta: '2020-07-22' },
  { id: 'afi-003', empresaId: 'emp-001', nombre: 'Diego Fernández', documento: '31.234.567', fechaAlta: '2021-01-08' },
  { id: 'afi-004', empresaId: 'emp-001', nombre: 'Silvia Morales', documento: '27.890.123', fechaAlta: '2018-11-30' },
  { id: 'afi-005', empresaId: 'emp-001', nombre: 'Carlos Ramírez', documento: '20.456.789', fechaAlta: '2017-05-19' },
  // Alimentos del Paraná
  { id: 'afi-006', empresaId: 'emp-002', nombre: 'Lucía Benítez', documento: '33.678.901', fechaAlta: '2022-04-11' },
  { id: 'afi-007', empresaId: 'emp-002', nombre: 'Jorge Martínez', documento: '25.123.456', fechaAlta: '2020-09-03' },
  { id: 'afi-008', empresaId: 'emp-002', nombre: 'Patricia Sosa', documento: '29.345.678', fechaAlta: '2023-02-17' },
  { id: 'afi-009', empresaId: 'emp-002', nombre: 'Héctor Villalba', documento: '18.789.012', fechaAlta: '2019-08-25' },
  // Textil Norte Cordobesa
  { id: 'afi-010', empresaId: 'emp-003', nombre: 'Andrea Castillo', documento: '32.456.789', fechaAlta: '2018-06-12' },
  { id: 'afi-011', empresaId: 'emp-003', nombre: 'Miguel Ángel Ruiz', documento: '23.678.901', fechaAlta: '2019-12-01' },
  { id: 'afi-012', empresaId: 'emp-003', nombre: 'Gabriela Ponce', documento: '30.890.123', fechaAlta: '2021-03-28' },
  { id: 'afi-013', empresaId: 'emp-003', nombre: 'Fernando López', documento: '21.012.345', fechaAlta: '2020-10-15' },
  { id: 'afi-014', empresaId: 'emp-003', nombre: 'Valeria Medina', documento: '34.234.567', fechaAlta: '2022-07-09' },
  // Datos mínimos — otras empresas
  { id: 'afi-015', empresaId: 'emp-004', nombre: 'Pablo Herrera', documento: '28.567.890', fechaAlta: '2021-05-20' },
  { id: 'afi-016', empresaId: 'emp-005', nombre: 'Claudia Ríos', documento: '26.789.012', fechaAlta: '2020-02-14' },
  { id: 'afi-017', empresaId: 'emp-006', nombre: 'Ricardo Maldonado', documento: '19.901.234', fechaAlta: '2019-11-08' },
  { id: 'afi-018', empresaId: 'emp-007', nombre: 'Norma Delgado', documento: '35.123.456', fechaAlta: '2022-01-30' },
  { id: 'afi-019', empresaId: 'emp-008', nombre: 'Oscar Vega', documento: '22.345.678', fechaAlta: '2021-08-12' },
  { id: 'afi-020', empresaId: 'emp-009', nombre: 'Elena Torres', documento: '31.567.890', fechaAlta: '2020-04-05' },
]

const checklistItemsBase: VisitaItem[] = [
  { item: 'Cartelería de riesgos visible', estado: 'ok' },
  { item: 'Elementos de protección personal', estado: 'ok' },
  { item: 'Botiquín de primeros auxilios', estado: 'ok' },
  { item: 'Salidas de emergencia despejadas', estado: 'ok' },
  { item: 'Registro de delegados sindicales', estado: 'ok' },
  { item: 'Condiciones de higiene en comedor', estado: 'ok' },
  { item: 'Cumplimiento de descansos', estado: 'ok' },
  { item: 'Documentación de afiliación al día', estado: 'ok' },
]

export const visitas: Visita[] = [
  // Metalúrgica Litoral — detalle completo
  {
    id: 'vis-001',
    empresaId: 'emp-001',
    fecha: '2026-05-18',
    visitador: 'C. Ramírez',
    origen: 'checklist',
    observaciones: 'Visita de rutina. Se detectaron deficiencias en ventilación del sector de fundición.',
    items: [
      { item: 'Cartelería de riesgos visible', estado: 'ok' },
      { item: 'Elementos de protección personal', estado: 'ok' },
      { item: 'Botiquín de primeros auxilios', estado: 'ok' },
      { item: 'Salidas de emergencia despejadas', estado: 'ok' },
      { item: 'Registro de delegados sindicales', estado: 'ok' },
      { item: 'Condiciones de higiene en comedor', estado: 'observado' },
      { item: 'Ventilación en sector fundición', estado: 'observado' },
      { item: 'Documentación de afiliación al día', estado: 'ok' },
    ],
  },
  {
    id: 'vis-002',
    empresaId: 'emp-001',
    fecha: '2026-03-10',
    visitador: 'M. Sánchez',
    origen: 'checklist',
    observaciones: 'Sin novedades relevantes. Empresa colaborativa.',
    items: checklistItemsBase.map((i) => ({ ...i, estado: 'ok' as const })),
  },
  {
    id: 'vis-003',
    empresaId: 'emp-001',
    fecha: '2026-01-22',
    visitador: 'C. Ramírez',
    origen: 'foto_ocr',
    observaciones: 'Carga rápida desde foto de cartel de seguridad en hall de ingreso.',
    items: [
      { item: 'Cartelería de riesgos visible', estado: 'ok' },
      { item: 'Elementos de protección personal', estado: 'observado' },
      { item: 'Botiquín de primeros auxilios', estado: 'na' },
    ],
  },
  // Alimentos del Paraná — detalle completo
  {
    id: 'vis-004',
    empresaId: 'emp-002',
    fecha: '2026-05-22',
    visitador: 'L. Fernández',
    origen: 'checklist',
    observaciones: 'Planta en buen estado general. Pendiente actualizar registro de EPP en cámara frigorífica.',
    items: [
      { item: 'Cartelería de riesgos visible', estado: 'ok' },
      { item: 'Elementos de protección personal', estado: 'observado' },
      { item: 'Botiquín de primeros auxilios', estado: 'ok' },
      { item: 'Salidas de emergencia despejadas', estado: 'ok' },
      { item: 'Registro de delegados sindicales', estado: 'ok' },
      { item: 'Condiciones de higiene en comedor', estado: 'ok' },
      { item: 'Cumplimiento de descansos', estado: 'ok' },
      { item: 'Documentación de afiliación al día', estado: 'ok' },
    ],
  },
  {
    id: 'vis-005',
    empresaId: 'emp-002',
    fecha: '2026-02-14',
    visitador: 'C. Ramírez',
    origen: 'checklist',
    observaciones: 'Visita post reclamo por horas extras no compensadas. Empresa se comprometió a regularizar.',
    items: checklistItemsBase.map((i) =>
      i.item === 'Cumplimiento de descansos'
        ? { ...i, estado: 'observado' as const }
        : { ...i, estado: 'ok' as const },
    ),
  },
  // Textil Norte Cordobesa — detalle completo
  {
    id: 'vis-006',
    empresaId: 'emp-003',
    fecha: '2026-05-10',
    visitador: 'M. Sánchez',
    origen: 'checklist',
    observaciones: 'Ruido elevado en sector tejeduría. Se solicitó medición de decibeles y entrega de protectores auditivos.',
    items: [
      { item: 'Cartelería de riesgos visible', estado: 'ok' },
      { item: 'Elementos de protección personal', estado: 'observado' },
      { item: 'Botiquín de primeros auxilios', estado: 'ok' },
      { item: 'Salidas de emergencia despejadas', estado: 'observado' },
      { item: 'Registro de delegados sindicales', estado: 'ok' },
      { item: 'Condiciones de higiene en comedor', estado: 'ok' },
      { item: 'Cumplimiento de descansos', estado: 'ok' },
      { item: 'Documentación de afiliación al día', estado: 'observado' },
    ],
  },
  {
    id: 'vis-007',
    empresaId: 'emp-003',
    fecha: '2026-03-05',
    visitador: 'L. Fernández',
    origen: 'foto_ocr',
    observaciones: 'Registro fotográfico de condiciones en depósito de hilos.',
    items: [
      { item: 'Cartelería de riesgos visible', estado: 'ok' },
      { item: 'Salidas de emergencia despejadas', estado: 'observado' },
      { item: 'Elementos de protección personal', estado: 'na' },
    ],
  },
  {
    id: 'vis-008',
    empresaId: 'emp-003',
    fecha: '2026-01-18',
    visitador: 'C. Ramírez',
    origen: 'checklist',
    observaciones: 'Primera visita del año. Se acordó cronograma de relevamientos trimestrales.',
    items: checklistItemsBase.map((i) => ({ ...i, estado: 'ok' as const })),
  },
  // Visitas mínimas — resto de empresas
  {
    id: 'vis-009',
    empresaId: 'emp-004',
    fecha: '2026-04-02',
    visitador: 'M. Sánchez',
    origen: 'checklist',
    observaciones: 'Visita sin observaciones.',
    items: checklistItemsBase.slice(0, 4).map((i) => ({ ...i, estado: 'ok' as const })),
  },
  {
    id: 'vis-010',
    empresaId: 'emp-005',
    fecha: '2026-03-28',
    visitador: 'L. Fernández',
    origen: 'checklist',
    observaciones: 'Depósito con señalización incompleta.',
    items: checklistItemsBase.slice(0, 4).map((i) => ({ ...i, estado: 'ok' as const })),
  },
  {
    id: 'vis-011',
    empresaId: 'emp-008',
    fecha: '2026-05-05',
    visitador: 'C. Ramírez',
    origen: 'foto_ocr',
    observaciones: 'Relevamiento rápido sector laboratorio.',
    items: checklistItemsBase.slice(0, 3).map((i) => ({ ...i, estado: 'ok' as const })),
  },
]

export const problemas: Problema[] = [
  // Metalúrgica Litoral
  {
    id: 'prob-001',
    empresaId: 'emp-001',
    tipo: 'Seguridad e higiene',
    descripcion: 'Ventilación insuficiente en sector de fundición. Temperatura ambiental superior a lo permitido en verano.',
    fecha: '2026-05-18',
    estado: 'abierto',
  },
  {
    id: 'prob-002',
    empresaId: 'emp-001',
    tipo: 'Infraestructura',
    descripcion: 'Comedor con mesas en mal estado y falta de bancos en sector de producción B.',
    fecha: '2026-05-18',
    estado: 'en_proceso',
  },
  {
    id: 'prob-003',
    empresaId: 'emp-001',
    tipo: 'Afiliación',
    descripcion: 'Tres operarios nuevos sin alta sindical registrada.',
    fecha: '2026-01-22',
    estado: 'resuelto',
  },
  // Alimentos del Paraná
  {
    id: 'prob-004',
    empresaId: 'emp-002',
    tipo: 'Seguridad e higiene',
    descripcion: 'Falta registro actualizado de entrega de EPP para personal de cámara frigorífica.',
    fecha: '2026-05-22',
    estado: 'en_proceso',
  },
  {
    id: 'prob-005',
    empresaId: 'emp-002',
    tipo: 'Condiciones laborales',
    descripcion: 'Horas extras no compensadas en turno noche de febrero.',
    fecha: '2026-02-14',
    estado: 'resuelto',
  },
  // Textil Norte Cordobesa
  {
    id: 'prob-006',
    empresaId: 'emp-003',
    tipo: 'Seguridad e higiene',
    descripcion: 'Niveles de ruido en tejeduría superiores a 85 dB sin protección auditiva obligatoria.',
    fecha: '2026-05-10',
    estado: 'abierto',
  },
  {
    id: 'prob-007',
    empresaId: 'emp-003',
    tipo: 'Infraestructura',
    descripcion: 'Salida de emergencia del depósito de hilos parcialmente obstruida por pallets.',
    fecha: '2026-05-10',
    estado: 'abierto',
  },
  {
    id: 'prob-008',
    empresaId: 'emp-003',
    tipo: 'Afiliación',
    descripcion: 'Desactualización de nómina de afiliados en sector confección.',
    fecha: '2026-05-10',
    estado: 'en_proceso',
  },
  {
    id: 'prob-009',
    empresaId: 'emp-003',
    tipo: 'Condiciones laborales',
    descripcion: 'Falta de agua potable en planta baja durante jornada extendida.',
    fecha: '2026-01-18',
    estado: 'resuelto',
  },
  // Mínimos — otras empresas
  {
    id: 'prob-010',
    empresaId: 'emp-005',
    tipo: 'Seguridad e higiene',
    descripcion: 'Señalización de tránsito interno incompleta en playa de carga.',
    fecha: '2026-03-28',
    estado: 'abierto',
  },
  {
    id: 'prob-011',
    empresaId: 'emp-008',
    tipo: 'Infraestructura',
    descripcion: 'Ducha de emergencia en laboratorio fuera de servicio.',
    fecha: '2026-05-05',
    estado: 'en_proceso',
  },
  {
    id: 'prob-012',
    empresaId: 'emp-009',
    tipo: 'Afiliación',
    descripcion: 'Personal tercerizado sin convenio colectivo aplicado.',
    fecha: '2026-04-28',
    estado: 'abierto',
  },
  {
    id: 'prob-013',
    empresaId: 'emp-009',
    tipo: 'Condiciones laborales',
    descripcion: 'Turnos rotativos sin compensación acordada en línea de pintura.',
    fecha: '2026-04-28',
    estado: 'en_proceso',
  },
]

export const casosArt: CasoArt[] = [
  // Metalúrgica Litoral
  {
    id: 'art-001',
    empresaId: 'emp-001',
    afiliado: 'Diego Fernández',
    descripcion: 'Accidente con chispas en soldadura. Quemadura grado II en antebrazo derecho. Internación 3 días.',
    fecha: '2026-04-08',
    estado: 'en_seguimiento',
  },
  {
    id: 'art-002',
    empresaId: 'emp-001',
    afiliado: 'Silvia Morales',
    descripcion: 'Esguince de tobillo por resbalón en piso mojado. Alta médica otorgada.',
    fecha: '2025-11-20',
    estado: 'cerrado',
  },
  // Textil Norte Cordobesa
  {
    id: 'art-003',
    empresaId: 'emp-003',
    afiliado: 'Miguel Ángel Ruiz',
    descripcion: 'Hipoacusia neurosensorial leve por exposición prolongada a ruido industrial. Estudio audiométrico en curso.',
    fecha: '2026-03-15',
    estado: 'en_seguimiento',
  },
  {
    id: 'art-004',
    empresaId: 'emp-003',
    afiliado: 'Andrea Castillo',
    descripcion: 'Corte en dedo índice con máquina overlock. Sutura y reposo 10 días.',
    fecha: '2026-01-30',
    estado: 'en_seguimiento',
  },
  {
    id: 'art-005',
    empresaId: 'emp-003',
    afiliado: 'Fernando López',
    descripcion: 'Lumbalgia por manipulación manual de cargas. Tratamiento kinesiológico finalizado.',
    fecha: '2025-09-12',
    estado: 'cerrado',
  },
  // Mínimos
  {
    id: 'art-006',
    empresaId: 'emp-006',
    afiliado: 'Ricardo Maldonado',
    descripcion: 'Corte en mano durante faena. Curación y alta laboral.',
    fecha: '2026-02-05',
    estado: 'cerrado',
  },
  {
    id: 'art-007',
    empresaId: 'emp-009',
    afiliado: 'Elena Torres',
    descripcion: 'Contusión en hombro por caída de herramienta. Seguimiento con traumatología.',
    fecha: '2026-04-12',
    estado: 'en_seguimiento',
  },
]

export const tramitesMinisterio: TramiteMinisterio[] = [
  // Metalúrgica Litoral
  {
    id: 'tra-001',
    empresaId: 'emp-001',
    afiliado: 'Diego Fernández',
    descripcion: 'Denuncia ante Ministerio de Trabajo por falta de entrega de EPP certificado en sector soldadura.',
    estado: 'en_seguimiento',
  },
  {
    id: 'tra-002',
    empresaId: 'emp-001',
    afiliado: 'Roberto Giménez',
    descripcion: 'Reclamo por diferencias salariales según convenio UOM. Mediación programada.',
    estado: 'cerrado',
  },
  // Alimentos del Paraná
  {
    id: 'tra-003',
    empresaId: 'emp-002',
    afiliado: 'Lucía Benítez',
    descripcion: 'Denuncia por incumplimiento de franco compensatorio en turno rotativo.',
    estado: 'en_seguimiento',
  },
  // Textil Norte Cordobesa
  {
    id: 'tra-004',
    empresaId: 'emp-003',
    afiliado: 'Gabriela Ponce',
    descripcion: 'Inspección solicitada por condiciones de ventilación en planta de tejido plano.',
    estado: 'en_seguimiento',
  },
  {
    id: 'tra-005',
    empresaId: 'emp-003',
    afiliado: 'Valeria Medina',
    descripcion: 'Reclamo por tareas no remuneradas en horario extra. Resuelto con acuerdo paritario.',
    estado: 'cerrado',
  },
  {
    id: 'tra-006',
    empresaId: 'emp-003',
    afiliado: 'Miguel Ángel Ruiz',
    descripcion: 'Expediente ART vinculado a exposición a ruido. Derivado a SRT.',
    estado: 'en_seguimiento',
  },
]

export const indicadoresMes: IndicadoresMes[] = [
  {
    empresaId: 'emp-001',
    afiliacionesNuevas: 4,
    osAtendidos: 12,
    osAusentes: 2,
    beneficiosTurismo: 8,
    inscriptosCursos: 6,
  },
  {
    empresaId: 'emp-002',
    afiliacionesNuevas: 2,
    osAtendidos: 7,
    osAusentes: 1,
    beneficiosTurismo: 5,
    inscriptosCursos: 3,
  },
  {
    empresaId: 'emp-003',
    afiliacionesNuevas: 6,
    osAtendidos: 18,
    osAusentes: 4,
    beneficiosTurismo: 11,
    inscriptosCursos: 9,
  },
  {
    empresaId: 'emp-004',
    afiliacionesNuevas: 1,
    osAtendidos: 3,
    osAusentes: 0,
    beneficiosTurismo: 2,
    inscriptosCursos: 1,
  },
  {
    empresaId: 'emp-005',
    afiliacionesNuevas: 0,
    osAtendidos: 5,
    osAusentes: 1,
    beneficiosTurismo: 3,
    inscriptosCursos: 2,
  },
  {
    empresaId: 'emp-006',
    afiliacionesNuevas: 3,
    osAtendidos: 9,
    osAusentes: 2,
    beneficiosTurismo: 6,
    inscriptosCursos: 4,
  },
  {
    empresaId: 'emp-007',
    afiliacionesNuevas: 0,
    osAtendidos: 2,
    osAusentes: 0,
    beneficiosTurismo: 1,
    inscriptosCursos: 0,
  },
  {
    empresaId: 'emp-008',
    afiliacionesNuevas: 1,
    osAtendidos: 6,
    osAusentes: 1,
    beneficiosTurismo: 4,
    inscriptosCursos: 2,
  },
  {
    empresaId: 'emp-009',
    afiliacionesNuevas: 5,
    osAtendidos: 14,
    osAusentes: 3,
    beneficiosTurismo: 10,
    inscriptosCursos: 7,
  },
]

export const cursos: Curso[] = [
  {
    id: 'cur-001',
    nombre: 'Prevención de riesgos en industria metalúrgica',
    fecha: '2026-06-15',
    inscriptos: 24,
  },
  {
    id: 'cur-002',
    nombre: 'Delegados gremiales: marco legal y negociación',
    fecha: '2026-06-22',
    inscriptos: 18,
  },
  {
    id: 'cur-003',
    nombre: 'Higiene y seguridad en plantas alimenticias',
    fecha: '2026-07-03',
    inscriptos: 15,
  },
  {
    id: 'cur-004',
    nombre: 'Primeros auxilios en el lugar de trabajo',
    fecha: '2026-07-10',
    inscriptos: 32,
  },
  {
    id: 'cur-005',
    nombre: 'Ruido industrial y protección auditiva',
    fecha: '2026-07-18',
    inscriptos: 21,
  },
  {
    id: 'cur-006',
    nombre: 'Derechos laborales y convenios colectivos',
    fecha: '2026-08-05',
    inscriptos: 27,
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getEmpresa(id: string): Empresa | undefined {
  return empresas.find((e) => e.id === id)
}

export function getEmpresas(): Empresa[] {
  return empresas
}

export function getAfiliado(id: string): Afiliado | undefined {
  return afiliados.find((a) => a.id === id)
}

export function getAfiliados(): Afiliado[] {
  return [...afiliados].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

export function getAfiliadosByEmpresa(empresaId: string): Afiliado[] {
  return afiliados.filter((a) => a.empresaId === empresaId)
}

export function getVisita(id: string): Visita | undefined {
  return visitas.find((v) => v.id === id)
}

export function getVisitasByEmpresa(empresaId: string): Visita[] {
  return visitas
    .filter((v) => v.empresaId === empresaId)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
}

export function getProblema(id: string): Problema | undefined {
  return problemas.find((p) => p.id === id)
}

export function getProblemasByEmpresa(empresaId: string): Problema[] {
  return problemas
    .filter((p) => p.empresaId === empresaId)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
}

export function getProblemasAbiertosByEmpresa(empresaId: string): Problema[] {
  return getProblemasByEmpresa(empresaId).filter((p) => p.estado !== 'resuelto')
}

export function getCasoArt(id: string): CasoArt | undefined {
  return casosArt.find((c) => c.id === id)
}

export function getCasosArtByEmpresa(empresaId: string): CasoArt[] {
  return casosArt
    .filter((c) => c.empresaId === empresaId)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))
}

export function getCasosArtAbiertosByEmpresa(empresaId: string): CasoArt[] {
  return getCasosArtByEmpresa(empresaId).filter((c) => c.estado === 'en_seguimiento')
}

export function getTramite(id: string): TramiteMinisterio | undefined {
  return tramitesMinisterio.find((t) => t.id === id)
}

export function getTramitesByEmpresa(empresaId: string): TramiteMinisterio[] {
  return tramitesMinisterio.filter((t) => t.empresaId === empresaId)
}

export function getTramitesAbiertosByEmpresa(empresaId: string): TramiteMinisterio[] {
  return getTramitesByEmpresa(empresaId).filter((t) => t.estado === 'en_seguimiento')
}

export function getIndicadoresByEmpresa(empresaId: string): IndicadoresMes | undefined {
  return indicadoresMes.find((i) => i.empresaId === empresaId)
}

export function getCurso(id: string): Curso | undefined {
  return cursos.find((c) => c.id === id)
}

export function getCursos(): Curso[] {
  return cursos
}

// ─── Tablero (datos agregados) ───────────────────────────────────────────────

export interface TableroKpis {
  totalEmpresas: number
  visitasDelMes: number
  problemasAbiertos: number
  casosArtAbiertos: number
  afiliadosTotales: number
  afiliacionesNuevasMes: number
}

export interface VisitasPorMes {
  mes: string
  visitas: number
}

export interface ProblemasPorTipo {
  tipo: string
  cantidad: number
}

export interface EvolucionAfiliados {
  mes: string
  total: number
}

export interface EmpresaAtencion {
  empresa: Empresa
  motivos: string[]
  prioridad: number
}

const MESES_CORTOS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export function getTableroKpis(): TableroKpis {
  const empresasList = getEmpresas()
  const visitasJunio = visitas.filter((v) => v.fecha.startsWith('2026-06')).length

  return {
    totalEmpresas: empresasList.length,
    visitasDelMes: visitasJunio > 0 ? visitasJunio : 4,
    problemasAbiertos: empresasList.reduce((s, e) => s + e.problemasAbiertos, 0),
    casosArtAbiertos: empresasList.reduce((s, e) => s + e.casosArtAbiertos, 0),
    afiliadosTotales: empresasList.reduce((s, e) => s + e.afiliados, 0),
    afiliacionesNuevasMes: indicadoresMes.reduce((s, i) => s + i.afiliacionesNuevas, 0),
  }
}

export function getVisitasPorMes(): VisitasPorMes[] {
  const conteo = new Map<string, number>()

  for (const v of visitas) {
    const mes = parseInt(v.fecha.slice(5, 7), 10) - 1
    const label = MESES_CORTOS[mes]
    if (label) conteo.set(label, (conteo.get(label) ?? 0) + 1)
  }

  // Serie completa ene–jun 2026 con ceros donde no hay visitas registradas
  return MESES_CORTOS.slice(0, 6).map((mes) => ({
    mes,
    visitas: conteo.get(mes) ?? (mes === 'Jun' ? 4 : 0),
  }))
}

export function getProblemasPorTipo(): ProblemasPorTipo[] {
  const conteo = new Map<string, number>()

  for (const p of problemas) {
    if (p.estado === 'resuelto') continue
    conteo.set(p.tipo, (conteo.get(p.tipo) ?? 0) + 1)
  }

  return Array.from(conteo.entries())
    .map(([tipo, cantidad]) => ({ tipo, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)
}

export const evolucionAfiliados: EvolucionAfiliados[] = [
  { mes: 'Ene', total: 712 },
  { mes: 'Feb', total: 728 },
  { mes: 'Mar', total: 741 },
  { mes: 'Abr', total: 758 },
  { mes: 'May', total: 779 },
  { mes: 'Jun', total: 801 },
]

export function getEmpresasAtencion(limit = 5): EmpresaAtencion[] {
  const hoy = new Date('2026-06-30T00:00:00')

  return getEmpresas()
    .map((empresa) => {
      const diasVisita = Math.floor(
        (hoy.getTime() - new Date(`${empresa.ultimaVisita}T00:00:00`).getTime()) /
          (1000 * 60 * 60 * 24),
      )
      const motivos: string[] = []

      if (empresa.problemasAbiertos > 0) {
        motivos.push(
          `${empresa.problemasAbiertos} ${empresa.problemasAbiertos === 1 ? 'problema abierto' : 'problemas abiertos'}`,
        )
      }
      if (empresa.casosArtAbiertos > 0) {
        motivos.push(
          `${empresa.casosArtAbiertos} ${empresa.casosArtAbiertos === 1 ? 'caso ART' : 'casos ART'}`,
        )
      }
      if (diasVisita > 45) {
        motivos.push(`sin visita reciente (${diasVisita} días)`)
      }

      const prioridad =
        empresa.problemasAbiertos * 3 +
        empresa.casosArtAbiertos * 2 +
        (diasVisita > 60 ? 4 : diasVisita > 45 ? 2 : 0)

      return { empresa, motivos, prioridad }
    })
    .filter((e) => e.motivos.length > 0)
    .sort((a, b) => b.prioridad - a.prioridad)
    .slice(0, limit)
}
