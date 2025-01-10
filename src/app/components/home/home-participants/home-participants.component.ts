import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../spinner/spinner.component';

import { Hospital } from '../../../models/hospital.model';
import { Role } from '../../../enums/role.enum';

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

  mapRole(role: Role): string {
    switch (role) {
      case Role.NULL:
        return 'Null';
      case Role.TRAINER:
        return 'Trainer';
      case Role.MINER:
        return 'Miner';
      case Role.PARTICIPANT:
        return '';
      default:
        return 'Unknown';
    }
  }

  totalParticipants(): number {
    let total = 0;
    this.hospitals?.forEach(h => {
      if (this.hasHospitalJoined(h)) {
        total++;
      }
    });
    return total;
  }
  
  hasHospitalJoined(hospital: Hospital | null): boolean {
    return hospital?.role !== Role.NULL;
  }

  onJoinButtonClick(): void {
    this.onJoin.emit();
  }

  onLeaveButtonClick(): void {
    this.onLeave.emit();
  }
}
