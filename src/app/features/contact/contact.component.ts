// CONTACT COMPONENT
//
// Introduces:
// - FormsModule + ngModel (two-way binding)
// - Template-driven form validation
// - EmailJS for sending emails without a backend
// - Sending state management (idle / sending / success / error)
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';    // ← Required for ngModel
import emailjs from '@emailjs/browser';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [
    CommonModule,
    FormsModule,    // ← Import this to use [(ngModel)] in the template
    ScrollRevealDirective,
    SectionTitleComponent
  ]
})
export class ContactComponent implements OnInit {

  // ── Form Data Model ───────────────────────────────────────────
  // A plain object that holds the current values of all form fields.
  // Each field is bound to an input via [(ngModel)].
  // When the user types, this object updates automatically.
  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  // ── Submission State ──────────────────────────────────────────
  // Controls what the UI shows: idle, loading, success, or error.
  // Using a union type restricts it to only valid states.
  submitState: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  // ── EmailJS Config ────────────────────────────────────────────
  // Replace these with your actual EmailJS credentials
  private readonly SERVICE_ID = 'service_i8dqq9l';
  private readonly TEMPLATE_ID = 'template_2zrz7ql';
  private readonly PUBLIC_KEY = 'BJoYinOXIVzE-_YNP';

  // ── Quick Contact Links ───────────────────────────────────────
  contactLinks = [
    {
      icon: '✉️',
      label: 'Email',
      value: 'kausikbasak1999@gmail.com',
      href: 'mailto:kausikbasak1999@gmail.com',
    },
    {
      icon: '🔗',
      label: 'LinkedIn',
      value: 'linkedin.com/in/basak-kausik',
      href: 'https://linkedin.com/in/basak-kausik',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Kolkata, India',
      href: null,
    },
  ];

  ngOnInit(): void {
    // Initialize EmailJS with your public key ONCE when the component loads.
    // This registers your account — all subsequent sends use this.
    emailjs.init({ publicKey: this.PUBLIC_KEY });  // ← v4 syntax
  }

  // ── Form Submit Handler ───────────────────────────────────────
  //
  // Called when the form is submitted.
  // The `form` parameter is the NgForm instance from the template (#contactForm="ngForm").
  // We use it to check validity and reset the form after success.
  async onSubmit(form: any): Promise<void> {

    // Guard: don't submit if form is invalid
    if (form.invalid) {
      // Mark all fields as touched so validation errors show
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    this.submitState = 'sending';

    try {
      // emailjs.send() makes an API call to EmailJS servers.
      // It takes: serviceId, templateId, templateParams, publicKey
      // templateParams maps to the variables in your EmailJS template.
      await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message,
        },
        { publicKey: this.PUBLIC_KEY }
      );

      this.submitState = 'success';

      // Reset form and data after success
      form.resetForm();
      this.formData = { name: '', email: '', subject: '', message: '' };

      // Return to idle after 4 seconds
      setTimeout(() => this.submitState = 'idle', 4000);

    } catch (error) {
      console.error('EmailJS error:', error);
      this.submitState = 'error';
      setTimeout(() => this.submitState = 'idle', 4000);
    }
  }
}
