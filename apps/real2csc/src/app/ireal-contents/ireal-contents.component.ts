import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IrealService } from '../ireal.service';

@Component({
  selector: 'app-ireal-contents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ireal-contents.component.html',
  styleUrl: './ireal-contents.component.css',
})
export class IrealContentsComponent {
  constructor(public ireal: IrealService) {}
}
