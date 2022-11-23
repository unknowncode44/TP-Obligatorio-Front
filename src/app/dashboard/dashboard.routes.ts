import { Routes } from "@angular/router";
import { AdduserComponent } from "./adduser/adduser.component";
import { SeeusersComponent } from "./seeusers/seeusers.component";
import { FundsComponent } from "./funds/funds.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

export const dashboardRoutes: Routes = [
    { path: 'dashboard'  , component : AdduserComponent   },
    { path: 'users'      , component : SeeusersComponent  },
    { path: 'funds'      , component : FundsComponent     },
    { path: 'sidebar'    , component : SidebarComponent   }
]