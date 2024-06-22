import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  irArriba(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  linkExterno() {
    if (confirm("Este enlace lleva al Figma")) {
      window.location.href='https://www.figma.com/proto/3UYPdaLTBNq9SibfRtYQeH/WEB%2FMOBILE?node-id=99-57'
    } else {}
  }
}
