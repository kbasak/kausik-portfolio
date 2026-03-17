import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Certification } from '../../core/models/portfolio.model';

@Component({
  standalone: true,
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
  imports: [CommonModule, ScrollRevealDirective]
})
export class CertificationsComponent {
  @Input() certifications!: Certification[];

  // Map issuer names to their brand colors
  issuerColors: Record<string, string> = {
    'Amazon Web Services': '#FF9900',
    'Udemy': '#A435F0',
  };

  // Map issuer names to emojis
  issuerIcons: Record<string, string> = {
    'Amazon Web Services': '☁️',
    'Udemy': '🎓',
  };

  getIssuerColor(issuer: string): string {
    return this.issuerColors[issuer] || '#38bdf8';
  }

  getIssuerIcon(issuer: string): string {
    return this.issuerIcons[issuer] || '📜';
  }
}
