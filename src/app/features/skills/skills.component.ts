// SKILLS COMPONENT
//
// Displays all skill groups in a card grid.
// Each group card contains multiple SkillBadge components.
//
// Notice how this component's only job is to receive the data
// and pass it down further — it's an orchestrator.
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillGroup } from '../../core/models/portfolio.model';
import { SkillBadgeComponent } from '../../shared/components/skill-badge/skill-badge.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  imports: [
    CommonModule,
    SkillBadgeComponent,   // Import so we can use <app-skill-badge> in template
    ScrollRevealDirective,   // Import so we can use appScrollReveal in template
    SectionTitleComponent
  ]
})
export class SkillsComponent {
  @Input() skillGroups!: SkillGroup[];
}