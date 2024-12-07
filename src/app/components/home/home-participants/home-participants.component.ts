import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { CommonModule } from '@angular/common';
import { Role } from '../../../enums/role.enum';

@Component({
  selector: 'app-home-participants',
  imports: [CommonModule],
  templateUrl: './home-participants.component.html'
})
export class HomeParticipantsComponent {
  @Input() hospitals: Hospital[] | null = [];
  @Input() hospital: Hospital | null = null;
  
  @Output() onJoin = new EventEmitter<void>();
  @Output() onLeave = new EventEmitter<void>();

  totalParticipants(): number {
    let totalParticipants = 0;

    this.hospitals?.forEach(hospital => {
      if(this.hasHospitalJoined(hospital)) {
        totalParticipants++;
      }
    });

    return totalParticipants;
  }

  hasHospitalJoined(hospital: Hospital | null): boolean {
    return hospital?.role === Role.Miner || hospital?.role === Role.Trainer;
  }

  onJoinButtonClick(): void {
    this.onJoin.emit();
  }

  onLeaveButtonClick(): void {
    this.onLeave.emit();
  }
}
