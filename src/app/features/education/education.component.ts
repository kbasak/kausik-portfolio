import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Education } from '../../core/models/portfolio.model';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  standalone: true,
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  imports: [CommonModule, ScrollRevealDirective, SectionTitleComponent]
})
export class EducationComponent {
  @Input() education!: Education;
}
