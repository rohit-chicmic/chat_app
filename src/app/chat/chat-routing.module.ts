import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { UserDataResolverService} from '../services/user-data-resolver.service'
const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    // resolve: {
    //  users: UserDataResolverService
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
