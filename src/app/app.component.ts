import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { PORTFOLIO_DATA } from './data/portfolio.data';
import { PortfolioData } from './core/models/portfolio.model';
import { AboutComponent } from './features/about/about.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { EducationComponent } from './features/education/education.component';
import { CertificationsComponent } from './features/certifications/certifications.component';
import { ContactComponent } from './features/contact/contact.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    CertificationsComponent,
    ContactComponent,
  ]
})

export class AppComponent {
  // The entire portfolio data object — is stored here as a property of the AppComponent class.
  // This is the ONLY place in the app that imports PORTFOLIO_DATA
  portfolioData: PortfolioData = PORTFOLIO_DATA;
  title = 'kausik-portfolio';
}
