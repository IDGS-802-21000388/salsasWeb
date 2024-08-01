export interface Direccion {
    idDireccion: number;
    estado: string;
    municipio: string;
    codigoPostal: string;
    colonia: string;
    calle: string;
    numExt: string;
    numInt?: string;
    referencia?: string;
}

export interface Usuario {
    idUsuario: number;
    nombre: string;
    nombreUsuario: string;
    correo: string;
    contrasenia: string;
    rol: string;
    estatus: number;
    telefono: string;
    intentos: number;
    direccion: Direccion; // Incluye la dirección como un objeto anidado
    dateLastToken?: Date;
}
