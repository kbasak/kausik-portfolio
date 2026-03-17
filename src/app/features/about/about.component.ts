// ABOUT COMPONENT
//
// Displays personal summary, quick info cards, and achievements.
// Receives two slices of data via @Input() from AppComponent.
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfo, Achievement } from '../../core/models/portfolio.model';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  standalone: true,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  imports: [CommonModule, ScrollRevealDirective, SectionTitleComponent]
})
export class AboutComponent {

  @Input() personal!: PersonalInfo;
  @Input() achievements!: Achievement[];

  // Quick info items built from personal data
  // We define these as a getter so they automatically
  // update if personal data ever changes
  get infoItems() {
    return [
      { icon: '📍', label: 'Location', value: this.personal?.location },
      { icon: '✉️', label: 'Email', value: this.personal?.email },
      { icon: '🔗', label: 'LinkedIn', value: 'linkedin.com/in/basak-kausik', link: this.personal?.linkedin },
      { icon: '💼', label: 'Experience', value: '3.6+ Years' },
      { icon: '🏢', label: 'Domain', value: 'Banking • Credit Card • Insurance' },
    ];
  }
}