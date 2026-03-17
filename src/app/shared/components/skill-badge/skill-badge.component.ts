// SKILL BADGE COMPONENT — Reusable micro-component
//
// Renders a single skill tag. Receives the skill name and
// its category via @Input(), and applies category-specific
// styling using [ngClass].
//
// This is a purely presentational component — no logic,
// no lifecycle hooks, just receives data and displays it.

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-skill-badge',
  templateUrl: './skill-badge.component.html',
  styleUrls: ['./skill-badge.component.scss'],
  imports: [CommonModule]
})
export class SkillBadgeComponent {

  // The skill name to display — e.g. "Java", "Spring Boot"
  @Input() name!: string;

  // The category determines the badge color
  // We use a union type to restrict to only valid values
  @Input() category: 'backend' | 'frontend' | 'testing' | 'database' | 'cloud' | 'tools' = 'backend';
}