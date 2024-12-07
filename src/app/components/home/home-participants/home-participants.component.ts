import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-participants',
  imports: [CommonModule],
  templateUrl: './home-participants.component.html'
})
export class HomeParticipantsComponent {
  @Input() hospitals: Hospital[] | null = [];
  
  @Output() onJoin = new EventEmitter<void>();
  @Output() onLeave = new EventEmitter<void>();

  onJoinButtonClick(): void {
    this.onJoin.emit();
  }

  onLeaveButtonClick(): void {
    this.onLeave.emit();
  }
}
