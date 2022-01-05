"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuFrontEnd = void 0;
function getMenuFrontEnd(role = "USER_ROLE") {
    const menu = [
        {
            titulo: "Dashboard",
            icono: "mdi mdi-gauge",
            submenu: [
                {
                    titulo: "Main",
                    url: "/dashboard",
                },
                {
                    titulo: "ProgressBar",
                    url: "progress",
                },
                {
                    titulo: "Gráficas",
                    url: "grafica1",
                },
                {
                    titulo: "Promesas",
                    url: "promesas",
                },
                {
                    titulo: "RxJs",
                    url: "rxjs",
                },
            ],
        },
        {
            titulo: "Mantenimientos",
            icono: "mdi mdi-folder-lock-open",
            submenu: [
                {
                    titulo: "Hospitales",
                    url: "hospitales",
                },
                {
                    titulo: "Médicos",
                    url: "medicos",
                },
            ],
        },
    ];
    const usuario = {
        titulo: "Usuarios",
        url: "usuarios",
    };
    if (role === "ADMIN_ROLE") {
        menu[1].submenu.unshift(usuario);
    }
    return menu;
}
exports.getMenuFrontEnd = getMenuFrontEnd;
//# sourceMappingURL=menu-frontend.js.map