import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Affaire } from 'src/app/models/affaire';
import { AffaireService } from 'src/app/services/affaire.service';

@Component({
  selector: 'app-update-affaire',
  templateUrl: './update-affaire.component.html',
  styleUrls: ['./update-affaire.component.scss']
})
export class UpdateAffaireComponent implements OnInit {

  constructor(private route: ActivatedRoute, private affaireService: AffaireService, private router: Router) { }
  affaire: Affaire = new Affaire();
  
  ngOnInit(): void {
    const idAffaire = this.route.snapshot.params['idAffaire'];
    this.affaireService.retrieveAffaire(idAffaire).subscribe(
      (data) => {
        this.affaire = data;
      },
      (erreur) => {
        console.error('Erreur lors de la récupération de l\'affaire:', erreur);
      }
    );
  }

  modifierAffaire(): void {
    this.affaireService.updateAffaire(this.affaire).subscribe(
      (data) => {
        console.log('Affaire modifiée avec succès:', data);
        this.router.navigate(['list-affaire']);
      },
      (erreur) => {
        console.error('Erreur lors de la modification de l\'affaire:', erreur);
      }
    );
  }

}
