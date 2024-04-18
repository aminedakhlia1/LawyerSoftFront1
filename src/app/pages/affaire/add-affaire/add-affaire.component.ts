import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affaire } from 'src/app/models/affaire';
import { Tribunal } from 'src/app/models/tribunal';
import { AffaireService } from 'src/app/services/affaire.service';
import { TribunalService } from 'src/app/services/tribunal.service';

@Component({
  selector: 'app-add-affaire',
  templateUrl: './add-affaire.component.html',
  styleUrls: ['./add-affaire.component.scss']
})
export class AddAffaireComponent implements OnInit {
  public affaire: Affaire = new Affaire();
  public tribunaux: Tribunal[] = [];
  selectedAffaireId: number;


  constructor(private affaireService: AffaireService,
              private tribunalService: TribunalService,
              private router: Router) {}

  ngOnInit(): void {
    this.tribunalService.listTribunal().subscribe(
      (tribunaux) => {
        console.log('Tribunaux retrieved successfully:', tribunaux);
        this.tribunaux = tribunaux;
      },
      (error) => {
        console.error('Error retrieving tribunaux:', error);
      }
    );
    
  }

  submitForm() {
    this.affaireService.addAffaire(this.affaire).subscribe(
      affaire => {
        console.log('Affaire ajoutée avec succès:', affaire);
        this.router.navigate(['list-affaire']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de l\'affaire:', erreur);
      }
    );
  }


  
  

}
