import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {
  candidateId: number;
  constructor(
    private activateRoutes: ActivatedRoute
  ) {
    this.candidateId = this.activateRoutes.snapshot.params['id'];
    console.log(this.candidateId)
  }

  ngOnInit(): void {

  }

}
