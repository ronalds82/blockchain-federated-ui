import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { CommonModule } from '@angular/common';
import { Role } from '../../../enums/role.enum';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-home-participants',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './home-participants.component.html'
})
export class HomeParticipantsComponent {
  @Input() hospitals: Hospital[] | null = [];
  @Input() hospital: Hospital | null = null;
  @Input() actionInProgress: boolean = false;

  @Output() onJoin = new EventEmitter<void>();
  @Output() onLeave = new EventEmitter<void>();

  totalParticipants(): number {
    let totalParticipants = 0;

    this.hospitals?.forEach(hospital => {
      if (this.hasHospitalJoined(hospital)) {
        totalParticipants++;
      }
    });

    return totalParticipants;
  }

  hasHospitalJoined(hospital: Hospital | null): boolean {
    return hospital?.role === Role.PARTICIPANT;
  }

  onJoinButtonClick(): void {
    this.onJoin.emit();
  }

  onLeaveButtonClick(): void {
    this.onLeave.emit();
  }
}
