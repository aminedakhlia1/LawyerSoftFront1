import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affaire } from 'src/app/models/affaire';
import { Honoraire } from 'src/app/models/honoraire';
import { AffaireService } from 'src/app/services/affaire.service';
import { HonoraireService } from 'src/app/services/honoraire.service';

@Component({
  selector: 'app-add-honoraire',
  templateUrl: './add-honoraire.component.html',
  styleUrls: ['./add-honoraire.component.scss']
})
export class AddHonoraireComponent implements OnInit {

  public honoraire: Honoraire = new Honoraire();
  public affaires: Affaire[] = [];
  selectedAffaireId: number;


  constructor(private honoraireService: HonoraireService,
              private affaireService: AffaireService,
              private router: Router) {}

  ngOnInit(): void {
  // Fetch the list of affaires
  this.affaireService.listAffaire().subscribe(
    (affaires) => {
      console.log('Affaires retrieved successfully:', affaires);
      this.affaires = affaires;
    },
    (error) => {
      console.error('Error retrieving affaires:', error);
    }
  );
  }

 /* submitForm() {
    this.honoraireService.addHonoraire(this.honoraire).subscribe(
      honoraire => {
        console.log('Affaire ajoutée avec succès:', honoraire);
        this.router.navigate(['list-honoraire']);
      },
      erreur => {
        console.error('Erreur lors de l\'ajout de l\'affaire:', erreur);
      }
    );
  }*/

  submitForm(): void {
    console.log('Selected Affaire ID:', this.selectedAffaireId);

    // Set the selected affaire in the honoraire object
    this.honoraire.affaire = this.affaires.find(affaire => affaire.idAffaire === this.selectedAffaireId);

    this.honoraireService.addHonoraireAndAffectToAffaire(this.honoraire, this.selectedAffaireId).subscribe(
      () => {
        console.log('Honoraire ajouté avec succès');
        this.router.navigate(['list-honoraire']);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'honoraire:', error);
      }
    );
  }


}
