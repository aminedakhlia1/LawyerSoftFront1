import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tribunal } from 'src/app/models/tribunal';
import { TribunalService } from 'src/app/services/tribunal.service';

@Component({
  selector: 'app-add-tribunal',
  templateUrl: './add-tribunal.component.html',
  styleUrls: ['./add-tribunal.component.scss']
})
export class AddTribunalComponent implements OnInit {

  public tribunal: Tribunal = new Tribunal();
  
  constructor(private tribunalService: TribunalService,
              private router: Router) {}

  ngOnInit(): void {
  }

  submitForm() {
    this.tribunalService.addTribunal(this.tribunal).subscribe(
      tribunal => {
        console.log('Affaire ajoutée avec succès:', tribunal);
        this.router.navigate(['list-tribunal']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de l\'affaire:', erreur);
      }
    );
  }
}
