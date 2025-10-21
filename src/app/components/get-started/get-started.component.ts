import { Component } from '@angular/core';
import {LogoComponent} from "../logo/logo.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-get-started',
    imports: [
        LogoComponent,
        RouterLink
    ],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.css'
})
export class GetStartedComponent {

}
