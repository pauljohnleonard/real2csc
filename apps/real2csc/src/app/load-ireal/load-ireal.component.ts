import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IrealService } from '../ireal.service';

@Component({
  selector: 'app-load-ireal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './load-ireal.component.html',
  styleUrl: './load-ireal.component.css',
})
export class LoadIrealComponent implements OnInit {
  constructor(public ireal: IrealService) {}
  ngOnInit() {
    document?.getElementById('file')?.addEventListener('change', (e: any) => {
      const file = e?.target?.files?.[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e?.target?.result;
        console.log(contents);
        this.ireal.load(contents.toString());
      };
      reader.readAsText(file);
    });

    document?.getElementById('url')?.addEventListener('change', (e: any) => {
      const url = e.target?.value;
      fetch(url)
        .then((response) => response.text())
        .then((contents) => this.ireal.load(contents))
        .catch(() =>
          console.log('Can’t access ' + url + ' response. Blocked by browser?')
        );
    });
  }
}
