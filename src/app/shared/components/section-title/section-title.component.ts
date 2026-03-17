import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  imports: [CommonModule]
})
export class SectionTitleComponent {
  @Input() tag!: string;        // e.g. "Who I Am"
  @Input() title!: string;      // e.g. "About"
  @Input() highlight!: string;  // e.g. "Me" — gets gradient color
  @Input() subtitle!: string;   // e.g. "A brief introduction..."
}