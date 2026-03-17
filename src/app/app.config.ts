// APP CONFIG — Application-level providers and settings
//
// This file replaces the old AppModule's providers array.
// provideAnimations() enables Angular's animation engine
// which we'll use in later steps for smooth transitions.

import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),    // Add this — enables Angular Animations app-wide
  ]
};