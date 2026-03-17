// EXPERIENCE COMPONENT
//
// Displays work history as a vertical timeline.
// Each entry shows: role, company, duration, highlights, tech stack.
//
// The isCurrent flag on each experience object lets us visually
// distinguish the current job from past ones.
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Component, Input, OnInit } from '@angular/core';  // ← add OnInit
import { CommonModule } from '@angular/common';
import { Experience } from '../../core/models/portfolio.model';
import { SkillBadgeComponent } from '../../shared/components/skill-badge/skill-badge.component';

@Component({
  standalone: true,
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  imports: [CommonModule, SkillBadgeComponent, ScrollRevealDirective]
})
export class ExperienceComponent implements OnInit {  // ← add implements OnInit

  // ── Properties first ──────────────────────────────────────
  @Input() experience!: Experience[];
  expandedIndex: number = -1;

  // ── Lifecycle hooks second ────────────────────────────────
  ngOnInit(): void {
    if (window.innerWidth <= 768) {
      this.expandedIndex = -2;
    }
  }

  // ── Methods last ──────────────────────────────────────────
  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === -2 || this.expandedIndex === index;
  }
}
