export interface User{
    user_id?        : number;
    username        : string;
    first_name     : string;
    last_name      : string;
    email           : string;
    pass            : string;
    gro_ups         : string;
    user_permission : string;
    is_staff        : boolean;
    is_active       : boolean;
    is_superuser    : boolean;
    last_login?     : string;
    date_joined?    : string;
    money?          : number
}