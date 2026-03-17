# 📘 Angular 19 — Complete Developer Reference
### Everything you need to start building on your own

> Built from real experience developing a full Angular 19 portfolio.
> Sections marked 🏗️ were used in the portfolio project.
> Sections marked 📚 are essential concepts for production Angular development.

---

## 📌 Table of Contents

### From the Portfolio Project 🏗️
1. [Project Architecture](#1-project-architecture)
2. [Standalone Components](#2-standalone-components)
3. [Data Flow — @Input()](#3-data-flow--input)
4. [Template Directives](#4-template-directives)
5. [Event Binding & Host Listeners](#5-event-binding--host-listeners)
6. [ngClass & Dynamic Styling](#6-ngclass--dynamic-styling)
7. [Lifecycle Hooks](#7-lifecycle-hooks)
8. [Reusable Components](#8-reusable-components)
9. [Custom Directives](#9-custom-directives)
10. [Template-Driven Forms](#10-template-driven-forms)
11. [TypeScript Patterns](#11-typescript-patterns)
12. [SCSS Architecture](#12-scss-architecture)

### Essential for Production Development 📚
13. [Broadcaster — Event Bus Pattern](#13-broadcaster--event-bus-pattern)
14. [Services & Dependency Injection](#14-services--dependency-injection)
15. [RxJS & Observables](#15-rxjs--observables)
16. [HttpClient — API Calls](#16-httpclient--api-calls)
17. [Routing & Navigation](#17-routing--navigation)
18. [Reactive Forms](#18-reactive-forms)
19. [Component Communication — @Output & EventEmitter](#19-component-communication--output--eventemitter)
20. [ViewChild & ElementRef](#20-viewchild--elementref)
21. [Pipes — Built-in & Custom](#21-pipes--built-in--custom)
22. [Route Guards](#22-route-guards)
23. [HTTP Interceptors](#23-http-interceptors)
24. [Angular Signals](#24-angular-signals)
25. [Change Detection](#25-change-detection)
26. [Lazy Loading](#26-lazy-loading)
27. [Environment Variables](#27-environment-variables)
28. [Angular Best Practices](#-angular-best-practices)

---

---

# PART 1 — FROM THE PORTFOLIO PROJECT 🏗️

---

## 1. Project Architecture

### Recommended Folder Structure

```
src/app/
├── core/              ← Interfaces, models, singleton services
│   ├── models/        ← TypeScript interfaces
│   ├── services/      ← App-wide singleton services
│   └── guards/        ← Route guards
├── data/              ← Static data (single source of truth)
├── features/          ← One folder per page/feature
│   ├── hero/
│   ├── about/
│   └── contact/
└── shared/            ← Reusable components, directives, pipes
    ├── components/
    ├── directives/
    └── pipes/
```

### Single Source of Truth Pattern
All content lives in ONE file — `portfolio.data.ts`:

```typescript
export const PORTFOLIO_DATA: PortfolioData = {
  personal: { name: 'Kausik Basak', role: 'Java Backend Developer' },
  experience: [ { company: 'Infosys', role: 'Associate Consultant' } ],
};
```

`AppComponent` imports this once and passes slices to sections via `@Input()`.
Changing your job title means editing ONE place, not hunting through components.

---

## 2. Standalone Components

### What Changed in Angular 14+
Before Angular 14, every component had to be declared in an `NgModule`.
Angular 19 uses **standalone components** — no NgModule required.

```typescript
// ❌ Old way — required NgModule declaration
@NgModule({ declarations: [HeroComponent], imports: [CommonModule] })
export class AppModule {}

// ✅ New way — standalone (Angular 14+, default in Angular 17+)
@Component({
  standalone: true,
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [CommonModule],   // ← dependencies declared here directly
})
export class HeroComponent {}
```

### What Goes in `imports[]`?
```typescript
imports: [
  CommonModule,              // *ngFor, *ngIf, [ngClass], [ngStyle]
  FormsModule,               // [(ngModel)] template-driven forms
  ReactiveFormsModule,       // FormGroup, FormControl reactive forms
  RouterModule,              // routerLink, router-outlet
  HttpClientModule,          // HttpClient for API calls
  SkillBadgeComponent,       // other standalone components
  ScrollRevealDirective,     // custom directives
  DatePipe,                  // standalone pipes
]
```

### Bootstrap in `main.ts`
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

---

## 3. Data Flow — @Input()

### The Golden Rule
Data flows **DOWN** — parent to child via `@Input()`.

```typescript
export class ExperienceComponent {
  @Input() experience!: Experience[];
  // ! = non-null assertion — "Angular will set this, don't warn me"
}
```

```html
<!-- Parent passes a slice of data, not the whole object -->
<app-experience [experience]="portfolioData.experience"></app-experience>
```

### Input with Default Values
```typescript
@Input() revealDelay: number = 0;       // Has a default — no ! needed
@Input() category: string = 'backend';
```

### Input Transform (Angular 16+)
```typescript
import { Input, booleanAttribute, numberAttribute } from '@angular/core';

@Input({ transform: booleanAttribute }) disabled = false;
// Now <app-btn disabled> works instead of <app-btn [disabled]="true">

@Input({ transform: numberAttribute }) count = 0;
// Now <app-list count="5"> works instead of <app-list [count]="5">
```

---

## 4. Template Directives

### `*ngFor`
```html
<div *ngFor="let skill of skills">{{ skill.name }}</div>
<div *ngFor="let skill of skills; let i = index; let last = last">
  {{ i + 1 }}. {{ skill.name }} <span *ngIf="last">← last!</span>
</div>
```

### `*ngIf`
```html
<span *ngIf="exp.isCurrent">● Current</span>
<div *ngIf="isLoaded; else loadingTemplate">Content here</div>
<ng-template #loadingTemplate><p>Loading...</p></ng-template>
```

### `*ngFor` + `*ngIf` — Never on Same Element
```html
<!-- ❌ WRONG -->
<li *ngFor="let item of list" *ngIf="item.isVisible"></li>

<!-- ✅ CORRECT — ng-container is invisible in the DOM -->
<ng-container *ngFor="let item of list">
  <li *ngIf="item.isVisible">{{ item.name }}</li>
</ng-container>
```

### `*ngSwitch`
```html
<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">Active</p>
  <p *ngSwitchCase="'pending'">Pending</p>
  <p *ngSwitchDefault>Unknown</p>
</div>
```

---

## 5. Event Binding & Host Listeners

```html
<button (click)="onClick()">Click</button>
<input (input)="onInput($event)" (blur)="onBlur()">
<form (ngSubmit)="onSubmit(form)">
```

### `@HostListener` — Window/Document Events
```typescript
@HostListener('window:scroll')
onScroll(): void {
  this.isScrolled = window.scrollY > 50;
}

@HostListener('window:resize', ['$event'])
onResize(event: Event): void {
  this.isMobile = window.innerWidth < 768;
}

@HostListener('document:keydown.escape')
onEscapeKey(): void {
  this.closeModal();
}
```

---

## 6. ngClass & Dynamic Styling

```html
<!-- String: one dynamic class -->
<span [ngClass]="'badge-' + category">...</span>

<!-- Object: multiple conditional classes -->
<div [ngClass]="{ 'card--current': exp.isCurrent, 'card--expanded': isExpanded }">

<!-- Array: mix static and dynamic -->
<div [ngClass]="['base-card', isActive ? 'active' : 'inactive']">

<!-- Shorthand for single class -->
<nav [class.scrolled]="isScrolled">

<!-- Dynamic styles -->
<div [style.background]="getDomainColor(project.domain)">
<div [style.width]="(+cgpa / 10 * 100) + '%'">
```

---

## 7. Lifecycle Hooks

```typescript
export class MyComponent implements OnInit, OnChanges, OnDestroy {

  // Runs ONCE after component is initialized
  // @Input() values ARE available here
  ngOnInit(): void { this.loadData(); }

  // Runs when ANY @Input() value changes
  // Runs BEFORE ngOnInit on first render
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      console.log('Previous:', changes['userId'].previousValue);
      console.log('Current:', changes['userId'].currentValue);
    }
  }

  // Runs after view + child views are initialized (ONCE)
  ngAfterViewInit(): void {
    // Safe to access @ViewChild() refs here
  }

  // Runs ONCE before component is destroyed — CLEANUP HERE
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    this.observer.disconnect();
    this.subscription.unsubscribe();
  }
}
```

### Cleanup Checklist for `ngOnDestroy`
```typescript
ngOnDestroy(): void {
  clearInterval(this.intervalId);        // setInterval
  clearTimeout(this.timeoutId);          // setTimeout
  this.observer.disconnect();            // IntersectionObserver
  this.subscription.unsubscribe();       // RxJS subscription
  this.destroy$.next();                  // RxJS takeUntil pattern
  this.destroy$.complete();
}
```

---

## 8. Reusable Components

### SkillBadgeComponent — Micro-Component
```typescript
@Component({
  selector: 'app-skill-badge',
  template: `<span [ngClass]="'badge-' + category">{{ name }}</span>`,
})
export class SkillBadgeComponent {
  @Input() name!: string;
  @Input() category!: string;
}
```

### SectionTitleComponent — DRY Pattern
```html
<!-- Before: 7 lines repeated in every section -->
<!-- After: 1 reusable component -->
<app-section-title
  tag="Where I've Worked"
  title="Work"
  highlight="Experience"
  subtitle="My professional journey...">
</app-section-title>
```

**Rule:** If you're copy-pasting the same HTML more than twice → make it a component.

---

## 9. Custom Directives

### What is a Directive?
```
Component  = HTML template + logic + styles
Directive  = logic only (no template) — enhances existing elements
```

### ScrollRevealDirective
```typescript
@Directive({
  standalone: true,
  selector: '[appScrollReveal]',   // Usage: <div appScrollReveal>
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay: number = 0;  // Directives support @Input() too

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('scroll-hidden');

    if (this.revealDelay > 0) {
      element.style.transitionDelay = `${this.revealDelay}s`;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.classList.remove('scroll-hidden');
          element.classList.add('scroll-visible');
          this.observer.unobserve(element);  // Animate once only
        }
      });
    }, { threshold: 0.1 });

    this.observer.observe(element);
  }

  ngOnDestroy(): void { this.observer.disconnect(); }
}
```

```html
<div class="section-header" appScrollReveal></div>
<div class="skills__grid" appScrollReveal [revealDelay]="0.15"></div>
```

---

## 10. Template-Driven Forms

### Setup
```typescript
imports: [FormsModule]  // Required in every component using [(ngModel)]
```

### Two-Way Binding
```html
<!-- Every field needs: [(ngModel)] + unique name attribute -->
<input
  [(ngModel)]="formData.name"
  name="name"
  required
  minlength="2"
  #nameField="ngModel">

<span *ngIf="nameField.invalid && nameField.touched">
  Name is required
</span>
```

### Validation States
| Property | Meaning |
|---|---|
| `.valid` | All validators pass |
| `.invalid` | At least one fails |
| `.touched` | User focused + blurred |
| `.dirty` | User has typed |
| `.pristine` | User hasn't typed |

### Form-Level Validity
```html
<form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
  <button [disabled]="contactForm.invalid">Submit</button>
</form>
```

---

## 11. TypeScript Patterns

```typescript
// Interface — data contract
interface Experience {
  role: string;
  isCurrent: boolean;
  highlights: string[];
}

// Record — lookup table / dictionary
domainColors: Record<string, string> = {
  'Banking': '#38bdf8',
  'Fintech': '#818cf8',
};

// Union type — restricts to specific values
submitState: 'idle' | 'sending' | 'success' | 'error' = 'idle';

// String-to-number conversion
[style.width]="(+education.cgpa / 10 * 100) + '%'"

// Typed interval ID
private intervalId!: ReturnType<typeof setInterval>;
```

---

## 12. SCSS Architecture

### CSS Custom Properties
```scss
:root {
  --color-accent: #38bdf8;
  --font-mono: 'JetBrains Mono', monospace;
  --transition-medium: 0.3s ease;
}
```

### SCSS Nesting
```scss
.exp-card {
  border: 1px solid var(--color-border);

  &:hover { border-color: var(--color-accent); }         // .exp-card:hover
  &.exp-card--current { border-color: rgba(...); }       // .exp-card.exp-card--current
  .exp-card--current & { background: var(--color-accent); }  // parent context
}
```

### Responsive Typography
```scss
font-size: clamp(2rem, 4vw, 3rem);  // min, ideal, max — no media queries
```

---

# PART 2 — ESSENTIAL FOR PRODUCTION DEVELOPMENT 📚

---

## 13. Broadcaster — Event Bus Pattern

### What is a Broadcaster?
A **Broadcaster** (also called an Event Bus) is a service that lets
**any component** communicate with **any other component** — without
them being parent/child. It's the Angular equivalent of a pub/sub system.

```
Component A  →  broadcasts event  →  BroadcastService
Component B  ←  listens to event  ←  BroadcastService
Component C  ←  listens to event  ←  BroadcastService
```

Uses: notification toasts, global loading spinner, auth state changes,
cart updates, modal triggers — anything that multiple unrelated components care about.

### Simple Broadcaster Service

```typescript
// core/services/broadcaster.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// Define all possible event types in one place
export enum BroadcastEvent {
  USER_LOGGED_IN     = 'USER_LOGGED_IN',
  USER_LOGGED_OUT    = 'USER_LOGGED_OUT',
  RESUME_SAVED       = 'RESUME_SAVED',
  SHOW_TOAST         = 'SHOW_TOAST',
  LOADING_START      = 'LOADING_START',
  LOADING_STOP       = 'LOADING_STOP',
}

interface BroadcastMessage {
  type: BroadcastEvent;
  payload?: any;
}

@Injectable({ providedIn: 'root' })
export class BroadcasterService {

  // Single Subject that all events flow through
  private eventBus$ = new Subject<BroadcastMessage>();

  // Broadcast an event — any component can call this
  broadcast(type: BroadcastEvent, payload?: any): void {
    this.eventBus$.next({ type, payload });
  }

  // Listen for a specific event type — returns an Observable
  on<T>(type: BroadcastEvent): Observable<T> {
    return this.eventBus$.pipe(
      filter(msg => msg.type === type),        // Only matching events
      map(msg => msg.payload as T)             // Extract payload
    );
  }
}
```

### Broadcasting an Event (Sender)

```typescript
// resume-editor.component.ts
export class ResumeEditorComponent {
  constructor(private broadcaster: BroadcasterService) {}

  saveResume(): void {
    this.resumeService.save(this.resume).subscribe(saved => {

      // Broadcast to any component that's listening
      this.broadcaster.broadcast(BroadcastEvent.RESUME_SAVED, saved);
      this.broadcaster.broadcast(BroadcastEvent.SHOW_TOAST, {
        message: 'Resume saved successfully!',
        type: 'success'
      });

    });
  }
}
```

### Listening to an Event (Receiver)

```typescript
// toast.component.ts — completely unrelated to ResumeEditorComponent
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private destroy$ = new Subject<void>();

  constructor(private broadcaster: BroadcasterService) {}

  ngOnInit(): void {
    // Listen for SHOW_TOAST events from anywhere in the app
    this.broadcaster.on<Toast>(BroadcastEvent.SHOW_TOAST).pipe(
      takeUntil(this.destroy$)   // Auto-unsubscribe on destroy
    ).subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast), 3000);
    });
  }

  removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Multiple Listeners — Same Event

```typescript
// navbar.component.ts — also listens for auth events
ngOnInit(): void {
  this.broadcaster.on<User>(BroadcastEvent.USER_LOGGED_IN).pipe(
    takeUntil(this.destroy$)
  ).subscribe(user => {
    this.currentUser = user;
    this.showUserMenu = true;
  });

  this.broadcaster.on<void>(BroadcastEvent.USER_LOGGED_OUT).pipe(
    takeUntil(this.destroy$)
  ).subscribe(() => {
    this.currentUser = null;
    this.showUserMenu = false;
  });
}

// sidebar.component.ts — ALSO listens for the same auth events
// Both Navbar and Sidebar update independently when auth state changes
ngOnInit(): void {
  this.broadcaster.on<User>(BroadcastEvent.USER_LOGGED_IN).pipe(
    takeUntil(this.destroy$)
  ).subscribe(user => this.loadUserMenuItems(user));
}
```

### Global Loading Spinner Pattern

```typescript
// A classic broadcaster use case — any HTTP call can show/hide the spinner

// http.service.ts — any service making API calls
saveData(): Observable<any> {
  this.broadcaster.broadcast(BroadcastEvent.LOADING_START);

  return this.http.post('/api/data', payload).pipe(
    tap(() => this.broadcaster.broadcast(BroadcastEvent.LOADING_STOP)),
    catchError(err => {
      this.broadcaster.broadcast(BroadcastEvent.LOADING_STOP);
      return throwError(() => err);
    })
  );
}

// spinner.component.ts — listens globally
ngOnInit(): void {
  this.broadcaster.on(BroadcastEvent.LOADING_START).pipe(
    takeUntil(this.destroy$)
  ).subscribe(() => this.isVisible = true);

  this.broadcaster.on(BroadcastEvent.LOADING_STOP).pipe(
    takeUntil(this.destroy$)
  ).subscribe(() => this.isVisible = false);
}
```

### Broadcaster vs BehaviorSubject — When to Use Which

| | Broadcaster (Event Bus) | BehaviorSubject |
|---|---|---|
| **Best for** | One-time events (save, delete, toast) | Ongoing state (current user, cart count) |
| **New subscribers** | Miss past events | Get last emitted value immediately |
| **Example** | "Resume was just saved" | "User is currently logged in" |
| **Direction** | Fire and forget | Always queryable |

---

## 14. Services & Dependency Injection

### What is a Service?
A service is a class that holds **shared logic or shared data** — API calls,
business logic, state — that multiple components can use.

```typescript
// core/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'   // ← Singleton — one instance for the entire app
})
export class UserService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
}
```

### Injecting a Service into a Component
```typescript
// Angular reads the constructor parameter type and injects the service
export class UserListComponent implements OnInit {
  users: User[] = [];

  // Dependency Injection — Angular creates and manages UserService
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
```

### `providedIn: 'root'` vs Component-Level
```typescript
// Singleton — shared across entire app (most common)
@Injectable({ providedIn: 'root' })

// New instance per component — provide in component's providers array
@Component({
  providers: [LocalService]   // New instance just for this component
})
```

---

## 15. RxJS & Observables

### What is an Observable?
An Observable is like a **stream of values over time** — vs a Promise
which gives one value and is done.

```
Promise:    single value → resolve or reject (done)
Observable: stream of values over time → can emit multiple values
```

### Core RxJS Concepts
```typescript
import { Observable, Subject, BehaviorSubject, of, from, interval } from 'rxjs';
import { map, filter, tap, switchMap, catchError, takeUntil, debounceTime } from 'rxjs/operators';

// Create observables
const obs1$ = of(1, 2, 3);           // Emits 1, 2, 3 then completes
const obs2$ = from([1, 2, 3]);        // Same — from an array
const obs3$ = interval(1000);         // Emits 0, 1, 2... every second

// Subscribe (start listening)
obs1$.subscribe({
  next: (value) => console.log(value),   // Called for each emission
  error: (err) => console.error(err),    // Called on error
  complete: () => console.log('Done'),   // Called when stream ends
});
```

### Essential Operators
```typescript
// map — transform each value
users$.pipe(
  map(users => users.filter(u => u.isActive))
)

// filter — only pass values that match condition
clicks$.pipe(
  filter(event => event.target.id === 'submit')
)

// tap — side effects without changing the value (for logging)
http.get('/api/users').pipe(
  tap(data => console.log('Got data:', data))
)

// switchMap — cancel previous, start new (e.g. search)
searchInput$.pipe(
  debounceTime(300),                          // Wait 300ms after typing stops
  switchMap(query => this.search(query))      // Cancel old, start new search
)

// catchError — handle errors gracefully
http.get('/api/users').pipe(
  catchError(error => {
    console.error(error);
    return of([]);   // Return empty array on error
  })
)

// takeUntil — auto-unsubscribe when another observable emits
// (Clean pattern for component destruction)
private destroy$ = new Subject<void>();

someObservable$.pipe(
  takeUntil(this.destroy$)
).subscribe(...);

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
```

### Subject vs BehaviorSubject
```typescript
// Subject — no initial value, only new subscribers get future emissions
const subject$ = new Subject<string>();
subject$.next('hello');  // Emits to current subscribers only

// BehaviorSubject — has initial value, new subscribers get LAST value immediately
// Use this for shared state between components
const currentUser$ = new BehaviorSubject<User | null>(null);
currentUser$.next(user);          // Update state
currentUser$.getValue();          // Get current value synchronously
currentUser$.asObservable();      // Expose as observable (hide .next())
```

### Real-World Service Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  // BehaviorSubject for shared state
  private currentUser$ = new BehaviorSubject<User | null>(null);

  // Expose as observable — components can't accidentally call .next()
  user$ = this.currentUser$.asObservable();

  login(credentials: Credentials): Observable<User> {
    return this.http.post<User>('/api/login', credentials).pipe(
      tap(user => this.currentUser$.next(user)),  // Update state on success
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.currentUser$.next(null);
  }
}

// In component:
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.authService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 16. HttpClient — API Calls

### Setup in `app.config.ts`
```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),   // ← Required for HttpClient to work
  ]
};
```

### Basic CRUD Operations
```typescript
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // GET — fetch list
  getAll(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.baseUrl}/resumes`);
  }

  // GET with query params — ?page=1&size=10
  getPaged(page: number, size: number): Observable<Resume[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Resume[]>(`${this.baseUrl}/resumes`, { params });
  }

  // GET single item
  getById(id: number): Observable<Resume> {
    return this.http.get<Resume>(`${this.baseUrl}/resumes/${id}`);
  }

  // POST — create
  create(resume: CreateResumeDto): Observable<Resume> {
    return this.http.post<Resume>(`${this.baseUrl}/resumes`, resume);
  }

  // PUT — full update
  update(id: number, resume: UpdateResumeDto): Observable<Resume> {
    return this.http.put<Resume>(`${this.baseUrl}/resumes/${id}`, resume);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/resumes/${id}`);
  }
}
```

### Consuming in a Component
```typescript
export class ResumeListComponent implements OnInit {
  resumes: Resume[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAll().subscribe({
      next: (resumes) => {
        this.resumes = resumes;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load resumes';
        this.isLoading = false;
      }
    });
  }
}
```

```html
<div *ngIf="isLoading">Loading...</div>
<div *ngIf="error" class="error">{{ error }}</div>
<div *ngFor="let resume of resumes">{{ resume.title }}</div>
```

### Using `async` Pipe (Better Pattern)
```typescript
export class ResumeListComponent {
  // Observable directly in component — no manual subscribe/unsubscribe
  resumes$ = this.apiService.getAll();
  constructor(private apiService: ApiService) {}
}
```

```html
<!-- async pipe subscribes and unsubscribes automatically -->
<div *ngIf="resumes$ | async as resumes; else loading">
  <div *ngFor="let resume of resumes">{{ resume.title }}</div>
</div>
<ng-template #loading>Loading...</ng-template>
```

---

## 17. Routing & Navigation

### Setup in `app.config.ts`
```typescript
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
```

### Defining Routes
```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',          component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'resume/:id', component: ResumeDetailComponent },  // :id = route param
  { path: '**',         component: NotFoundComponent },       // wildcard — 404

  // Lazy loaded route (loaded only when visited)
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component')
      .then(m => m.AdminComponent)
  },
];
```

### `<router-outlet>` — Where Routed Components Render
```html
<!-- app.component.html -->
<app-navbar></app-navbar>
<router-outlet></router-outlet>   <!-- Routed components render here -->
<app-footer></app-footer>
```

### Navigation in Templates
```html
<!-- routerLink — like href but Angular-aware (no page reload) -->
<a routerLink="/dashboard">Dashboard</a>
<a [routerLink]="['/resume', resume.id]">View Resume</a>

<!-- Active class — auto-applied when route matches -->
<a routerLink="/dashboard" routerLinkActive="active-link">Dashboard</a>
```

### Navigation in Component Class
```typescript
import { Router, ActivatedRoute } from '@angular/router';

export class ResumeComponent implements OnInit {
  resumeId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Read route parameter :id
    this.route.params.subscribe(params => {
      this.resumeId = +params['id'];   // + converts string to number
    });

    // Read query parameter ?tab=education
    this.route.queryParams.subscribe(params => {
      console.log(params['tab']);   // 'education'
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToResume(id: number): void {
    this.router.navigate(['/resume', id]);
  }

  goWithQueryParams(): void {
    this.router.navigate(['/dashboard'], { queryParams: { tab: 'resumes' } });
  }
}
```

---

## 18. Reactive Forms

### When to Use Reactive vs Template-Driven
| | Template-Driven | Reactive |
|---|---|---|
| Setup | Simple — just `[(ngModel)]` | More code upfront |
| Validation | HTML attributes | TypeScript code |
| Dynamic fields | Hard | Easy |
| Testing | Hard | Easy |
| Use when | Simple forms | Complex / dynamic forms |

### Setup
```typescript
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Define form structure + validators in TypeScript
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false],
    });
  }

  // Easy to read values
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    console.log(email, password);
  }

  // Reset form
  reset(): void { this.loginForm.reset(); }
}
```

### Template
```html
<form [formGroup]="loginForm" (ngSubmit)="onSubmit()">

  <input formControlName="email" type="email" placeholder="Email">
  <!-- Access validation state via get() -->
  <span *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
    Valid email required
  </span>

  <input formControlName="password" type="password" placeholder="Password">

  <button type="submit" [disabled]="loginForm.invalid">Login</button>

</form>
```

### Dynamic Form Arrays
```typescript
// Add/remove fields dynamically — e.g. list of phone numbers
import { FormArray } from '@angular/forms';

this.form = this.fb.group({
  name: [''],
  phones: this.fb.array([])   // ← Dynamic array of controls
});

get phones(): FormArray {
  return this.form.get('phones') as FormArray;
}

addPhone(): void {
  this.phones.push(this.fb.control(''));
}

removePhone(index: number): void {
  this.phones.removeAt(index);
}
```

```html
<div formArrayName="phones">
  <div *ngFor="let phone of phones.controls; let i = index">
    <input [formControlName]="i" placeholder="Phone">
    <button (click)="removePhone(i)">Remove</button>
  </div>
</div>
<button (click)="addPhone()">Add Phone</button>
```

---

## 19. Component Communication — @Output & EventEmitter

### Child to Parent Communication
While `@Input()` passes data DOWN, `@Output()` sends events UP.

```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

export class ResumeCardComponent {
  @Output() deleteClicked = new EventEmitter<number>();
  @Output() editClicked   = new EventEmitter<Resume>();

  onDelete(id: number): void {
    this.deleteClicked.emit(id);   // Fire event up to parent
  }

  onEdit(resume: Resume): void {
    this.editClicked.emit(resume);
  }
}
```

```html
<!-- parent.component.html -->
<app-resume-card
  [resume]="resume"
  (deleteClicked)="handleDelete($event)"   <!-- $event = the emitted value -->
  (editClicked)="handleEdit($event)">
</app-resume-card>
```

```typescript
// parent.component.ts
handleDelete(id: number): void {
  this.resumes = this.resumes.filter(r => r.id !== id);
}

handleEdit(resume: Resume): void {
  this.selectedResume = resume;
  this.showEditModal = true;
}
```

### Sibling Communication — via Service
When two components aren't parent/child, use a shared service:

```typescript
@Injectable({ providedIn: 'root' })
export class SharedStateService {
  private refreshTrigger$ = new Subject<void>();
  refresh$ = this.refreshTrigger$.asObservable();

  triggerRefresh(): void {
    this.refreshTrigger$.next();
  }
}

// Component A — triggers refresh
this.sharedState.triggerRefresh();

// Component B — listens for refresh
this.sharedState.refresh$.subscribe(() => this.loadData());
```

---

## 20. ViewChild & ElementRef

### `@ViewChild` — Access Child Component or DOM Element

```typescript
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

export class CanvasComponent implements AfterViewInit {

  // Access a DOM element by template reference variable
  @ViewChild('myCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  // Access a child component instance
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;

  // Must use AfterViewInit — not available in OnInit
  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx?.fillRect(0, 0, 100, 100);

    // Call a method on child component
    this.navbar.closeMenu();
  }
}
```

```html
<!-- Template reference variable — #myCanvas -->
<canvas #myCanvas width="500" height="300"></canvas>
<app-navbar #navbarRef></app-navbar>
```

### `@ViewChildren` — Access Multiple Children
```typescript
import { ViewChildren, QueryList } from '@angular/core';

@ViewChildren('cardRef') cards!: QueryList<ElementRef>;

ngAfterViewInit(): void {
  this.cards.forEach(card => {
    console.log(card.nativeElement);
  });
}
```

---

## 21. Pipes — Built-in & Custom

### Built-in Pipes
```html
<!-- Date -->
{{ user.createdAt | date }}                   <!-- Jan 15, 2025 -->
{{ user.createdAt | date:'dd/MM/yyyy' }}       <!-- 15/01/2025 -->
{{ user.createdAt | date:'fullDate' }}          <!-- Wednesday, January 15 -->

<!-- Number & Currency -->
{{ price | currency }}                          <!-- $1,234.56 -->
{{ price | currency:'INR':'symbol':'1.0-0' }}   <!-- ₹1,235 -->
{{ score | number:'1.2-2' }}                    <!-- 9.16 -->
{{ ratio | percent }}                           <!-- 91.6% -->

<!-- String -->
{{ name | uppercase }}   <!-- KAUSIK BASAK -->
{{ name | lowercase }}   <!-- kausik basak -->
{{ name | titlecase }}   <!-- Kausik Basak -->

<!-- Array/Object -->
{{ users | json }}                              <!-- Useful for debugging -->
{{ longText | slice:0:100 }}                    <!-- First 100 characters -->

<!-- Async — subscribes/unsubscribes automatically -->
{{ user$ | async }}
<div *ngFor="let user of users$ | async">{{ user.name }}</div>
```

### Custom Pipe
```typescript
// shared/pipes/truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'truncate'  // Used in template as: value | truncate:50
})
export class TruncatePipe implements PipeTransform {

  // value = the input, limit = first argument, suffix = second (optional)
  transform(value: string, limit: number = 100, suffix: string = '...'): string {
    if (!value || value.length <= limit) return value;
    return value.substring(0, limit) + suffix;
  }
}
```

```html
<!-- Import in component, then use in template -->
{{ description | truncate:150 }}
{{ description | truncate:50:'… read more' }}
```

---

## 22. Route Guards

### What is a Guard?
A guard decides if a route can be **activated** or **deactivated**.
Used for authentication — block unauthenticated users from protected routes.

```typescript
// core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Functional guard (Angular 15+ preferred way)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;   // ✅ Allow navigation
  }

  // ❌ Block and redirect to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
```

### Apply to Routes
```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'login',     component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]   // ← Guard applied here
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard]   // ← Multiple guards
  },
];
```

### `canDeactivate` — Prevent Leaving Unsaved Changes
```typescript
export const unsavedChangesGuard: CanDeactivateFn<ResumeEditorComponent> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};
```

---

## 23. HTTP Interceptors

### What is an Interceptor?
Middleware that runs on EVERY HTTP request/response.
Used for: adding auth tokens, logging, error handling, loading spinners.

```typescript
// core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Clone the request and add Authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};
```

### Error Interceptor
```typescript
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expired — redirect to login
        router.navigate(['/login']);
      }
      if (error.status === 403) {
        router.navigate(['/unauthorized']);
      }
      return throwError(() => error);
    })
  );
};
```

### Register Interceptors in `app.config.ts`
```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
  ]
};
```

---

## 24. Angular Signals

### What are Signals? (Angular 16+)
Signals are Angular's new reactive primitive — a simpler alternative to RxJS
for component state. Angular knows exactly when to re-render.

```typescript
import { signal, computed, effect } from '@angular/core';

export class CounterComponent {

  // signal() — wraps a value, Angular tracks reads/writes
  count = signal(0);

  // computed() — derived value, auto-updates when dependencies change
  doubled = computed(() => this.count() * 2);
  isPositive = computed(() => this.count() > 0);

  // effect() — side effect that runs when signals it reads change
  constructor() {
    effect(() => {
      console.log('Count changed to:', this.count());
    });
  }

  // Reading a signal — call it like a function
  getCount(): number {
    return this.count();   // Note: () to read the value
  }

  // Writing a signal
  increment(): void { this.count.set(this.count() + 1); }
  decrement(): void { this.count.update(v => v - 1); }
  reset():     void { this.count.set(0); }
}
```

```html
<!-- Read signal in template — same () syntax -->
<p>Count: {{ count() }}</p>
<p>Doubled: {{ doubled() }}</p>
<button (click)="increment()">+</button>
```

### Signals vs RxJS
| Signals | RxJS |
|---|---|
| Simpler syntax | More powerful operators |
| Synchronous | Supports async streams |
| Great for UI state | Great for HTTP, events |
| No subscribe/unsubscribe | Manual cleanup needed |
| Angular 16+ only | Works in all versions |

### `input()` and `output()` — Signal-Based @Input/@Output (Angular 17+)
```typescript
import { input, output } from '@angular/core';

export class ResumeCardComponent {
  // Signal-based inputs — read with ()
  resume = input.required<Resume>();
  isEditable = input(false);  // with default value

  // Signal-based output
  deleted = output<number>();

  onDelete(): void {
    this.deleted.emit(this.resume().id);
  }
}
```

```html
<p>{{ resume().title }}</p>  <!-- Read signal input with () -->
```

---

## 25. Change Detection

### What is Change Detection?
Angular checks component properties and updates the DOM when values change.
By default it checks EVERY component on EVERY event. This can be slow.

### `ChangeDetectionStrategy.OnPush`
Only re-render when:
1. An `@Input()` reference changes
2. An event inside the component fires
3. An `async` pipe emits
4. You manually call `markForCheck()`

```typescript
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,  // ← Opt-in
})
export class ResumeCardComponent {
  @Input() resume!: Resume;

  constructor(private cdr: ChangeDetectorRef) {}

  // Manually trigger change detection when needed
  refreshView(): void {
    this.cdr.markForCheck();
  }
}
```

### When to Use `OnPush`
- Large lists with many items
- Components that receive data via `@Input()` only
- Components using Observables with `async` pipe
- When performance is a concern

### Immutability with `OnPush`
With OnPush, Angular only re-renders when the INPUT REFERENCE changes.
Mutating an object won't trigger re-render — you must create a new reference:

```typescript
// ❌ Won't trigger re-render with OnPush — same reference
this.resume.title = 'New Title';

// ✅ New reference — OnPush detects the change
this.resume = { ...this.resume, title: 'New Title' };
```

---

## 26. Lazy Loading

### What is Lazy Loading?
Instead of loading ALL components upfront, lazy loading loads feature modules/
components only when the user navigates to that route.
Result: **faster initial page load**.

```typescript
// app.routes.ts — lazy load entire feature
export const routes: Routes = [
  { path: '', component: HomeComponent },  // Eager — always loaded

  // Lazy — AdminComponent only loaded when user visits /admin
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then(m => m.AdminComponent)
  },

  // Lazy load a whole routes file (multiple routes at once)
  {
    path: 'resume',
    loadChildren: () =>
      import('./features/resume/resume.routes').then(m => m.resumeRoutes)
  },
];
```

```typescript
// features/resume/resume.routes.ts
export const resumeRoutes: Routes = [
  { path: '',      component: ResumeListComponent },
  { path: ':id',   component: ResumeDetailComponent },
  { path: 'new',   component: ResumeEditorComponent },
];
```

### Preloading Strategy — Best of Both Worlds
```typescript
import { PreloadAllModules } from '@angular/router';

provideRouter(routes, withPreloading(PreloadAllModules))
// Loads lazily but preloads in the background after initial load
```

---

## 27. Environment Variables

### Setup
Angular generates two environment files:

```typescript
// src/environments/environment.ts — Development
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  emailJsPublicKey: 'dev_key_abc',
};

// src/environments/environment.prod.ts — Production
export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/api',
  emailJsPublicKey: 'prod_key_xyz',
};
```

### Using in a Service
```typescript
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Angular automatically swaps environment file at build time
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.baseUrl}/resumes`);
  }
}
```

### `angular.json` File Replacement
Angular swaps the file automatically:
```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ]
  }
}
```

```bash
ng serve                 # Uses environment.ts (dev)
ng build --configuration production  # Uses environment.prod.ts
```

---

## 🗺️ Quick Reference — Which Tool for What?

| Need | Use |
|---|---|
| Pass data to child | `@Input()` |
| Send event to parent | `@Output()` + `EventEmitter` |
| Share data between any components | Service + `BehaviorSubject` |
| Simple form | Template-driven + `[(ngModel)]` |
| Complex / dynamic form | Reactive Forms + `FormBuilder` |
| API calls | `HttpClient` in a Service |
| Handle HTTP errors globally | `HttpInterceptor` |
| Protect routes | Route Guard |
| Transform display values | Pipe |
| Access DOM element | `@ViewChild` + `ElementRef` |
| React to scroll/resize | `@HostListener` |
| Animate on scroll | `IntersectionObserver` + Directive |
| Component UI state | Signals (`signal()`) |
| Async data streams | RxJS + `async` pipe |
| Load feature on demand | Lazy Loading |
| Dev vs Prod config | `environment.ts` |

---

---

## 👍 Angular Best Practices

```typescript
// ✅ Always implement interface for lifecycle hooks
export class MyComponent implements OnInit, OnDestroy { }

// ✅ name attribute required on ALL ngModel inputs
<input [(ngModel)]="value" name="fieldName">

// ✅ Default import for @emailjs/browser
import emailjs from '@emailjs/browser';   // NOT { emailjs }

// ✅ Safe navigation operator for optional data
{{ personal?.name }}

// ✅ Always clean up in ngOnDestroy
ngOnDestroy(): void { clearInterval(this.id); }
```

---

*This document was built from real experience — every concept was applied in a production-grade Angular 19 project. Start here before anywhere else. 🚀*
