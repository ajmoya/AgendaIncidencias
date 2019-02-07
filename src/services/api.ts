import { Usuario } from '@/models/usuario';

export function login(usuario: Usuario) {
    const usuarioBd = getUsuarioBd();
    let autenticado = false;

    if (usuario.alias === '' || usuario.password === '') {
        // tslint:disable-next-line:no-console
        console.log('El usuario y password deben ser introducidos');
    } else if (usuario.alias === usuarioBd.alias && usuario.password === usuarioBd.password) {
        // tslint:disable-next-line:no-console
        console.log('El usuario y password son válidos!');
        autenticado = true;
    } else {
        // tslint:disable-next-line:no-console
        console.log('El usuario y/o password son incorrectos');
    }

    const errores = seErrores(usuario, usuarioBd);

    return { autenticado, errores };
}

function getUsuarioBd(): Usuario {
    const usuario: Usuario = { id: 1, alias: 'toni', password: '123456'};
    return usuario;
}

function seErrores(usuario: Usuario, usuarioBd: Usuario) {
    const errores = { alias: '', password: '' };

    if (usuario.alias === '') {
        errores.alias = 'Debe introducir un nombre';
    } else if (usuario.alias !== usuarioBd.alias) {
        errores.alias = 'Usuario incorrecto';
    }

    if (usuario.password === '') {
        errores.password = 'Debe introducir un password';
    } else if (usuario.password !== usuarioBd.password) {
        errores.password = 'Password incorrecto';
    }

    return errores;
}
