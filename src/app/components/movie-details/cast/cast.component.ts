import {Component, Input} from '@angular/core';
import {Cast} from '../../../models/cast.model';

@Component({
  selector: 'app-cast',
  imports: [],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.css'
})
export class CastComponent {
@Input() cast: Cast[] = [];
}
