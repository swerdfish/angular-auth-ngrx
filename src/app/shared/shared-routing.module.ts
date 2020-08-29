import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'sign-up', redirectTo: 'sign-up', pathMatch: 'full' },
    { path: 'sign-in', redirectTo: 'sign-in', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SharedRoutingModule { }