import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { Observable } from 'rxjs';
import { HospitalService } from '../../services/hospital.service';
import { VoteViewComponent } from './view/vote-view.component';
import { VoteValue } from '../../enums/vote-value.enum';

@Component({
  selector: 'app-vote',
  imports: [CommonModule, VoteViewComponent],
  templateUrl: './vote.component.html'
})
export class VoteComponent {
  hospitals$: Observable<Hospital[]> | null = null;
  hospital$: Observable<Hospital> | null = null;
  
  constructor(private hospitalService: HospitalService) {
    this.hospitals$ = this.hospitalService.getHospitals();
    this.hospital$ = this.hospitalService.hospital$;
  }

  onVote(vote: VoteValue): void {
    vote === VoteValue.Accept ? this.onAccept() : this.onDeny();
  }

  private async onAccept(): Promise<void> {
    return; // TODO: implement after BE is done
  }

  private async onDeny(): Promise<void> {
    return; // TODO: implement after BE is done
  }
}
