// interfaz para manejar los usuarios

export interface User {
    user_id?            : number;
    username            : string;
    first_name?         : string;
    pass                : string;
    email?              : string;
    gro_ups?            : string;
    user_permission?    : string;
    is_staff?           : boolean;
    is_active?          : boolean;
    is_superuser?       : boolean; 
}