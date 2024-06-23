import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadIrealComponent } from './load-ireal/load-ireal.component';
import { IrealService } from './ireal.service';
import { CommonModule } from '@angular/common';
import { IrealContentsComponent } from './ireal-contents/ireal-contents.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadIrealComponent,
    IrealContentsComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'real2csc';

  constructor(public ireal: IrealService) {}
}
