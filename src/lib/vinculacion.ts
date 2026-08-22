// Esquema de los asistentes de vinculación (clientes y proveedores).
// Única fuente de verdad compartida por el componente WizardVinculacion
// (render de pasos y campos) y por /api/solicitud (mapa campo → celda para
// llenar la plantilla oficial de Excel con exceljs).
//
// Los ids de campo, celdas y listas provienen de los formatos oficiales:
//   FO-VC-001 Vinculación y Actualización de Clientes v0 (hoja "Formato Vinculación")
//   CA-FO-01 Vinculación y Actualización de Proveedores v1 (hoja "Formato Vinculación")
// Si gerencia cambia la versión de un formato, hay que revisar este mapa.

export const LISTAS: Record<string, string[]> = {
  TipoSolicitud: ['Vinculación nueva', 'Actualización de datos'],
  TipoPersona: ['Persona Natural', 'Persona Jurídica'],
  TipoIdentificacion: ['Registro civil, RC', 'Tarjeta de identidad, TI', 'Cédula de ciudadanía, CC', 'Cédula de extranjería, CE', 'Pasaporte, PAS', 'NIT'],
  SiNo: ['Sí', 'No'],
  AportaDoc: ['Aporta', 'No aporta', 'No aplica'],
  RegimenTributario: ['Responsable de IVA', 'No responsable de IVA', 'Régimen simple de tributación', 'Gran contribuyente', 'No aplica'],
  ResponsabilidadTributaria: ['Ninguna', 'Gran contribuyente', 'Autorretenedor', 'Agente de retención IVA', 'Régimen simple de tributación', 'Otra (ver observaciones)'],
  TipoEmpresa: ['S.A.S.', 'S.A.', 'Ltda.', 'Empresa Unipersonal', 'Sucursal de sociedad extranjera', 'Entidad sin ánimo de lucro', 'Persona natural comerciante', 'Otra'],
  FormaPago: ['Contado', 'Crédito'],
  TipoCuenta: ['Ahorros', 'Corriente'],
  Zona: ['Urbana', 'Rural'],
  NivelEducacion: ['Ninguno', 'Primaria', 'Secundaria', 'Técnico o tecnólogo', 'Universitario (Pregrado)', 'Postgrado (Especialización, maestría, doctorado)'],
  Ocupacion: ['Empleado', 'Independiente', 'Pensionado', 'Estudiante', 'Otro'],
  GrupoProteccion: ['No aplica', 'Niños, niñas y adolescentes', 'Mujer cabeza de familia', 'Pueblos indígenas', 'Mayores de 60 años', 'Víctima del conflicto armado', 'Población diversa / LGBTIQ+', 'Persona con discapacidad física, mental o sensorial', 'Persona en condición de pobreza extrema', 'Otro'],
  Departamentos: ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada', 'Exterior'],
};

export interface Campo {
  id: string;
  label: string;
  /** Celda destino en la hoja "Formato Vinculación" de la plantilla. */
  cell: string;
  /** text (default) | select | date | email | tel | number | textarea | checkbox */
  tipo?: string;
  /** Clave en LISTAS para selects. */
  opciones?: string;
  req?: boolean;
  hint?: string;
  /** Para checkbox: valor que se escribe en la celda cuando está marcado. */
  valorSi?: string;
}

export interface Paso {
  titulo: string;
  nota?: string;
  /** El paso solo aplica cuando el campo indicado tiene este valor. */
  condicion?: { campo: string; valor: string };
  campos: Campo[];
}

export interface FormularioVinculacion {
  clave: string;
  titulo: string;
  codigo: string;
  /** Plantilla oficial dentro del repo (se incluye en la función serverless). */
  plantilla: string;
  /** Nombre del archivo adjunto que se genera. */
  adjunto: string;
  /** Campo cuyo valor nombra la solicitud (asunto del correo). */
  campoNombre: string;
  /** Campo con el correo del solicitante (recibe copia del formato lleno). */
  campoCopia: string;
  /** Celda donde el servidor escribe la fecha de diligenciamiento. */
  celdaFecha: string;
  /** Celda (caja de firma) donde se anota la constancia de firma electrónica OTP. */
  celdaFirmaNota?: string;
  pasos: Paso[];
}

export const FORMULARIOS: Record<string, FormularioVinculacion> = {
  'vinculacion-cliente': {
    clave: 'vinculacion-cliente',
    titulo: 'Vinculación de clientes',
    codigo: 'FO-VC-001 v0',
    plantilla: 'docs/formatos/FO-VC-001-vinculacion-clientes.xlsx',
    adjunto: 'FO-VC-001-vinculacion-cliente.xlsx',
    campoNombre: 'razonSocial',
    campoCopia: 'contactoCorreo',
    celdaFecha: 'L49',
    celdaFirmaNota: 'G50',
    pasos: [
      {
        titulo: 'Identificación',
        nota: 'Datos como aparecen en el RUT y la Cámara de Comercio. TMI los verificará contra los documentos que anexes.',
        campos: [
          { id: 'tipoSolicitud', label: 'Tipo de solicitud', cell: 'D13', tipo: 'select', opciones: 'TipoSolicitud', req: true },
          { id: 'tipoCliente', label: 'Tipo de cliente', cell: 'J13', tipo: 'select', opciones: 'TipoPersona', req: true },
          { id: 'razonSocial', label: 'Nombre completo / Razón social', cell: 'E17', req: true },
          { id: 'tipoId', label: 'Tipo de identificación', cell: 'D18', tipo: 'select', opciones: 'TipoIdentificacion', req: true },
          { id: 'numId', label: 'Número de identificación', cell: 'H18', req: true },
          { id: 'dv', label: 'DV (solo NIT)', cell: 'L18' },
          { id: 'direccion', label: 'Dirección de domicilio principal', cell: 'E19', req: true },
          { id: 'departamento', label: 'Departamento', cell: 'D20', tipo: 'select', opciones: 'Departamentos', req: true },
          { id: 'municipio', label: 'Municipio / Ciudad', cell: 'H20', req: true },
          { id: 'zona', label: 'Zona', cell: 'L20', tipo: 'select', opciones: 'Zona' },
          { id: 'correoNotif', label: 'Correo de notificación judicial', cell: 'E21', tipo: 'email', hint: 'El registrado en Cámara de Comercio' },
          { id: 'ciiu', label: 'Actividad económica principal (CIIU)', cell: 'D22' },
          { id: 'regimen', label: 'Régimen tributario', cell: 'J22', tipo: 'select', opciones: 'RegimenTributario' },
          { id: 'responsabilidad', label: 'Responsabilidad tributaria relevante (RUT)', cell: 'D23', tipo: 'select', opciones: 'ResponsabilidadTributaria' },
          { id: 'tipoEmpresa', label: 'Tipo de empresa (si aplica)', cell: 'J23', tipo: 'select', opciones: 'TipoEmpresa' },
        ],
      },
      {
        titulo: 'Persona jurídica',
        nota: 'Con base en el Certificado de Cámara de Comercio (vigencia no mayor a 30 días).',
        condicion: { campo: 'tipoCliente', valor: 'Persona Jurídica' },
        campos: [
          { id: 'tipoSociedad', label: 'Tipo de sociedad', cell: 'D25' },
          { id: 'fechaConstitucion', label: 'Fecha de constitución', cell: 'J25', tipo: 'date' },
          { id: 'matricula', label: 'N° de matrícula mercantil', cell: 'D26' },
          { id: 'vigenciaCert', label: 'Fecha de expedición del certificado', cell: 'J26', tipo: 'date' },
          { id: 'rlNombre', label: 'Representante legal (nombre completo)', cell: 'D27', req: true },
          { id: 'rlTipoId', label: 'Tipo de identificación del RL', cell: 'H27', tipo: 'select', opciones: 'TipoIdentificacion' },
          { id: 'rlNumId', label: 'N° de identificación del RL', cell: 'L27' },
        ],
      },
      {
        titulo: 'Información bancaria',
        nota: 'Como aparece en la certificación bancaria (no mayor a 30 días).',
        campos: [
          { id: 'banco', label: 'Entidad bancaria', cell: 'E30' },
          { id: 'tipoCuenta', label: 'Tipo de cuenta', cell: 'D31', tipo: 'select', opciones: 'TipoCuenta' },
          { id: 'numCuenta', label: 'Número de cuenta', cell: 'H31' },
          { id: 'titularCuenta', label: 'Titular de la cuenta', cell: 'L31' },
        ],
      },
      {
        titulo: 'Contactos y condiciones',
        campos: [
          { id: 'contactoNombre', label: 'Nombre contacto comercial / compras', cell: 'D33', req: true },
          { id: 'contactoCargo', label: 'Cargo', cell: 'H33' },
          { id: 'contactoTel', label: 'Teléfono / celular', cell: 'L33', tipo: 'tel', req: true },
          { id: 'contactoCorreo', label: 'Correo contacto comercial', cell: 'D34', tipo: 'email', req: true, hint: 'A este correo te enviaremos copia del formato diligenciado' },
          { id: 'correoFactura', label: 'Correo para facturación electrónica', cell: 'J34', tipo: 'email' },
          { id: 'pagosNombre', label: 'Nombre contacto de pagos / tesorería', cell: 'D35' },
          { id: 'pagosTel', label: 'Teléfono contacto de pagos', cell: 'H35', tipo: 'tel' },
          { id: 'pagosCorreo', label: 'Correo contacto de pagos', cell: 'L35', tipo: 'email' },
          { id: 'formaPago', label: 'Forma de pago solicitada', cell: 'D36', tipo: 'select', opciones: 'FormaPago' },
          { id: 'promesaEntrega', label: 'Promesa de entrega esperada (días)', cell: 'J36', tipo: 'number' },
          { id: 'dirEntrega', label: 'Dirección de entrega de pedidos', cell: 'E37', hint: 'Solo si es diferente al domicilio principal' },
        ],
      },
      {
        titulo: 'Líneas de interés',
        nota: 'Marca las líneas de producto o servicio que le interesan a tu institución.',
        campos: [
          { id: 'lineaMedicamentos', label: 'Medicamentos', cell: 'G57', tipo: 'select', opciones: 'SiNo' },
          { id: 'lineaDispositivos', label: 'Dispositivos médicos', cell: 'G58', tipo: 'select', opciones: 'SiNo' },
          { id: 'lineaEquipos', label: 'Equipos biomédicos', cell: 'G59', tipo: 'select', opciones: 'SiNo' },
          { id: 'lineaLaboratorio', label: 'Laboratorio clínico', cell: 'G60', tipo: 'select', opciones: 'SiNo' },
          { id: 'lineaInsumos', label: 'Insumos médicos', cell: 'G61', tipo: 'select', opciones: 'SiNo' },
          { id: 'lineaTransporte', label: 'Transporte / gestión logística', cell: 'G62', tipo: 'select', opciones: 'SiNo' },
          { id: 'lineaOtro', label: 'Otro', cell: 'G63', tipo: 'select', opciones: 'SiNo' },
          { id: 'lineaOtroObs', label: 'Si marcaste "Otro", especifica', cell: 'I63' },
        ],
      },
      {
        titulo: 'Declaraciones y firma',
        nota: 'El cliente declara que la información suministrada y los documentos anexos son veraces y verificables.',
        campos: [
          { id: 'aceptoDatos', label: 'Acepto el tratamiento de datos personales (Ley 1581 de 2012), conforme a la Política de Tratamiento de Datos Personales de TMI', cell: 'D47', tipo: 'checkbox', valorSi: 'Sí', req: true },
          { id: 'autorizoVerificacion', label: 'Autorizo la consulta y verificación de la información suministrada', cell: 'J47', tipo: 'checkbox', valorSi: 'Sí', req: true },
          { id: 'firmaNombre', label: 'Nombre de quien firma (cliente / representante legal)', cell: 'D49', req: true },
          { id: 'firmaCargo', label: 'Cargo', cell: 'H49' },
        ],
      },
    ],
  },

  'vinculacion-proveedor': {
    clave: 'vinculacion-proveedor',
    titulo: 'Vinculación de proveedores',
    codigo: 'CA-FO-01 v1',
    plantilla: 'docs/formatos/CA-FO-01-vinculacion-proveedores.xlsx',
    adjunto: 'CA-FO-01-vinculacion-proveedor.xlsx',
    campoNombre: 'razonSocial',
    campoCopia: 'correo',
    celdaFecha: 'J66',
    celdaFirmaNota: 'B68',
    pasos: [
      {
        titulo: 'Identificación',
        campos: [
          { id: 'tipoSolicitud', label: 'Tipo de solicitud', cell: 'D13', tipo: 'select', opciones: 'TipoSolicitud', req: true },
          { id: 'tipoProveedor', label: 'Tipo de proveedor', cell: 'J13', tipo: 'select', opciones: 'TipoPersona', req: true },
          { id: 'razonSocial', label: 'Nombre completo / Razón social', cell: 'E16', req: true },
          { id: 'tipoId', label: 'Tipo de identificación', cell: 'D17', tipo: 'select', opciones: 'TipoIdentificacion', req: true },
          { id: 'numId', label: 'Número de identificación', cell: 'H17', req: true },
          { id: 'dv', label: 'DV (solo NIT)', cell: 'L17' },
          { id: 'correo', label: 'Correo electrónico', cell: 'D18', tipo: 'email', req: true, hint: 'A este correo te enviaremos copia del formato diligenciado' },
          { id: 'telefono', label: 'Teléfono / celular', cell: 'J18', tipo: 'tel', req: true },
          { id: 'departamento', label: 'Departamento', cell: 'D19', tipo: 'select', opciones: 'Departamentos', req: true },
          { id: 'municipio', label: 'Municipio / Ciudad', cell: 'H19', req: true },
          { id: 'zona', label: 'Zona', cell: 'L19', tipo: 'select', opciones: 'Zona' },
          { id: 'direccion', label: 'Dirección de domicilio / notificación', cell: 'E20', req: true },
        ],
      },
      {
        titulo: 'Persona natural',
        condicion: { campo: 'tipoProveedor', valor: 'Persona Natural' },
        campos: [
          { id: 'fechaNacimiento', label: 'Fecha de nacimiento', cell: 'D22', tipo: 'date' },
          { id: 'paisResidencia', label: 'País de residencia', cell: 'H22' },
          { id: 'nacionalidad', label: 'Nacionalidad (si CE o PAS)', cell: 'L22' },
          { id: 'deptoNacimiento', label: 'Departamento de nacimiento', cell: 'D23', tipo: 'select', opciones: 'Departamentos' },
          { id: 'municipioNacimiento', label: 'Municipio de nacimiento', cell: 'J23' },
          { id: 'nivelEducacion', label: 'Nivel de educación', cell: 'D24', tipo: 'select', opciones: 'NivelEducacion' },
          { id: 'ocupacion', label: 'Ocupación', cell: 'J24', tipo: 'select', opciones: 'Ocupacion' },
          { id: 'grupoProteccion', label: 'Grupo de protección especial constitucional', cell: 'E25', tipo: 'select', opciones: 'GrupoProteccion' },
          { id: 'grupoOtro', label: 'Si seleccionaste "Otro", descríbelo', cell: 'E26' },
          { id: 'empresaNombre', label: 'Empresa donde labora (nombre)', cell: 'D28', hint: 'Si eres empleado o independiente vinculado' },
          { id: 'empresaActividad', label: 'Actividad económica de esa empresa', cell: 'H28' },
          { id: 'empresaCiiu', label: 'CIIU', cell: 'L28' },
        ],
      },
      {
        titulo: 'Persona jurídica',
        nota: 'El NIT y DV se registran en el paso de identificación.',
        condicion: { campo: 'tipoProveedor', valor: 'Persona Jurídica' },
        campos: [
          { id: 'paisConstitucion', label: 'País de constitución', cell: 'D33' },
          { id: 'tipoSociedad', label: 'Tipo de sociedad / empresa', cell: 'H33', tipo: 'select', opciones: 'TipoEmpresa' },
          { id: 'regimen', label: 'Régimen tributario', cell: 'L33', tipo: 'select', opciones: 'RegimenTributario' },
          { id: 'actividad', label: 'Actividad económica principal', cell: 'D34' },
          { id: 'ciiu', label: 'Código CIIU', cell: 'J34' },
          { id: 'rlNombre', label: 'Representante legal (nombre completo)', cell: 'D35', req: true },
          { id: 'rlTipoId', label: 'Tipo de identificación del RL', cell: 'H35', tipo: 'select', opciones: 'TipoIdentificacion' },
          { id: 'rlNumId', label: 'N° de identificación del RL', cell: 'L35' },
        ],
      },
      {
        titulo: 'Facturación y condiciones',
        campos: [
          { id: 'correoFacturacion', label: 'Correo para facturación electrónica', cell: 'D37', tipo: 'email', req: true },
          { id: 'correoCartera', label: 'Correo para gestión de cartera', cell: 'J37', tipo: 'email' },
          { id: 'formaPago', label: 'Forma de pago', cell: 'D38', tipo: 'select', opciones: 'FormaPago' },
          { id: 'promesaEntrega', label: 'Promesa de entrega (días)', cell: 'J38', tipo: 'number' },
        ],
      },
      {
        titulo: 'Contactos',
        nota: 'Relaciona los contactos que apliquen (nombre, teléfono y correo).',
        campos: [
          { id: 'jefeComercialNombre', label: 'Jefe comercial / ventas — nombre', cell: 'E41' },
          { id: 'jefeComercialTel', label: 'Jefe comercial — teléfono', cell: 'I41', tipo: 'tel' },
          { id: 'jefeComercialCorreo', label: 'Jefe comercial — correo', cell: 'K41', tipo: 'email' },
          { id: 'repVentasNombre', label: 'Representante de ventas — nombre', cell: 'E42' },
          { id: 'repVentasTel', label: 'Representante de ventas — teléfono', cell: 'I42', tipo: 'tel' },
          { id: 'repVentasCorreo', label: 'Representante de ventas — correo', cell: 'K42', tipo: 'email' },
          { id: 'facturacionNombre', label: 'Facturación — nombre', cell: 'E43' },
          { id: 'facturacionTel', label: 'Facturación — teléfono', cell: 'I43', tipo: 'tel' },
          { id: 'facturacionCorreo', label: 'Facturación — correo', cell: 'K43', tipo: 'email' },
          { id: 'carteraNombre', label: 'Cartera — nombre', cell: 'E44' },
          { id: 'carteraTel', label: 'Cartera — teléfono', cell: 'I44', tipo: 'tel' },
          { id: 'carteraCorreo', label: 'Cartera — correo', cell: 'K44', tipo: 'email' },
          { id: 'dirTecnicaNombre', label: 'Dirección técnica / regulatorios — nombre', cell: 'E45' },
          { id: 'dirTecnicaTel', label: 'Dirección técnica — teléfono', cell: 'I45', tipo: 'tel' },
          { id: 'dirTecnicaCorreo', label: 'Dirección técnica — correo', cell: 'K45', tipo: 'email' },
          { id: 'despachoPedidos', label: 'Despacho de pedidos (días y horarios si hay restricciones)', cell: 'E46', tipo: 'textarea' },
        ],
      },
      {
        titulo: 'Documentos que aportas',
        nota: 'Indica qué documentos enviarás en PDF junto con el formato firmado.',
        campos: [
          { id: 'docIdentificacion', label: 'Fotocopia del documento de identificación', cell: 'H49', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docCamara', label: 'Certificado de existencia y representación legal (Cámara)', cell: 'H50', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docRut', label: 'RUT actualizado', cell: 'H51', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docBancaria', label: 'Certificación bancaria (≤ 30 días)', cell: 'H52', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docInvima', label: 'Registro / notificación sanitaria INVIMA vigente', cell: 'H53', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docBpm', label: 'Certificado CCAD / BPM / BPD vigente (si aplica)', cell: 'H54', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docFicha', label: 'Ficha técnica / hoja de seguridad (si aplica)', cell: 'H55', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docDevolucion', label: 'Política de devolución (medicamentos y dispositivos)', cell: 'H56', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docPoliza', label: 'Póliza de responsabilidad civil extracontractual', cell: 'H57', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docOtros', label: 'Otros documentos', cell: 'H58', tipo: 'select', opciones: 'AportaDoc' },
          { id: 'docOtrosObs', label: 'Observaciones (especifica los otros documentos)', cell: 'J58' },
        ],
      },
      {
        titulo: 'Declaraciones y firma',
        nota: 'Certifico que la información suministrada es veraz; autorizo el tratamiento de mis datos personales (Ley 1581 de 2012) y la verificación de la información; declaro conocer las políticas comerciales y los requisitos de selección, contratación y evaluación de TMI.',
        campos: [
          { id: 'aceptoDeclaraciones', label: 'Declaro que he leído y acepto la totalidad de las declaraciones y autorizaciones anteriores', cell: 'E63', tipo: 'checkbox', valorSi: 'Sí', req: true },
          { id: 'firmaNombre', label: 'Nombre de quien firma (proveedor / representante legal)', cell: 'D66', req: true },
        ],
      },
    ],
  },
};
