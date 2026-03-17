// PROJECTS COMPONENT
//
// Displays featured projects as an interactive card grid.
// getDomainColor() is a method called directly from the template
// to map a domain name to its display color.
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../core/models/portfolio.model';
import { SkillBadgeComponent } from '../../shared/components/skill-badge/skill-badge.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  imports: [CommonModule, SkillBadgeComponent, ScrollRevealDirective]
})
export class ProjectsComponent {
  @Input() projects!: Project[];

  // TypeScript Record type — a key/value lookup table
  // Record<KeyType, ValueType> is equivalent to { [key: string]: string }
  domainColors: Record<string, string> = {
    'Banking':    '#38bdf8',
    'Fintech':    '#818cf8',
    'Healthcare': '#34d399',
  };

  getDomainColor(domain: string): string {
    return this.domainColors[domain] || '#94a3b8';
  }
}
