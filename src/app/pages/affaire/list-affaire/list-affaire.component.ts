import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affaire } from 'src/app/models/affaire';
import { AffaireService } from 'src/app/services/affaire.service';

@Component({
  selector: 'app-list-affaire',
  templateUrl: './list-affaire.component.html',
  styleUrls: ['./list-affaire.component.scss']
})
export class ListAffaireComponent implements OnInit {

    public affaire!: Affaire[];
    currentPage: number = 1;
    itemsPerPage: number = 5;
    searchTerm: string;
    searchedAffaire: Affaire[];
  
    constructor(private affaireService: AffaireService,
                private router: Router) { }
  
    ngOnInit(): void {
      this.listAffaire();
    }
  
    //Afficher la liste des affaire
    public listAffaire() {
      this.affaireService.listAffaire().subscribe(
        (data) => {
          this.affaire = data;
          this.searchedAffaire = data;
        }
      );
    }
  
    //Supprimer un courrier DE donné par son id
   /* public deleteCourrier(numeroCourrier: any) {
      this.courrierService.deleteCourrier(numeroCourrier).subscribe(
        () => {
          this.listCourriersDi();
          console.log("supp");
        }); (error) => {
          console.log("erreur");
        }
    }*/
  
  
    /*Recherche dynamique*/
    public onSearch(): void {
      const searchTermLowerCase = this.searchTerm.toLowerCase();
  
      if (searchTermLowerCase) {
        this.searchedAffaire = this.affaire.filter(aff => {
          return (
            aff.titre.toLowerCase().includes(searchTermLowerCase) ||
            aff.dateCreation.toLowerCase().includes(searchTermLowerCase) ||
            aff.dateCloture.toLowerCase().includes(searchTermLowerCase) ||
            aff.etat.toLowerCase().includes(searchTermLowerCase) ||
            aff.reference.toLowerCase().includes(searchTermLowerCase)     
          );
        });
      } else {
        this.searchedAffaire = this.affaire.slice();
      }
    }

    onAddAffaire() {
      this.router.navigateByUrl('/add-affaire');
    }

   public removeAffaire(idAffaire: any) {
    this.affaireService.removeAffaire(idAffaire).subscribe(
      () => {
        this.listAffaire();
        console.log("supp"); 
      }); (error) => {
        console.log("erreur");
      }

  }
  
    /*Redirection add*/
  /*  onAdd() {
      this.router.navigateByUrl('/add-di');
    }*/

  
  
    /*Pagination*/
    getTotalPages() {
        const totalItems = this.affaire.length;
        const itemsPerPage = this.itemsPerPage;
        return Math.ceil(totalItems / itemsPerPage);
    }
  
    getPages(): number[] {
        let pages: number[] = [];
        const totalPages = this.getTotalPages();
        const currentPage = this.currentPage;
        const maxPages = 5;
  
          if (totalPages <= maxPages) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
          } else {
            const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
            const endPage = Math.min(totalPages, startPage + maxPages - 1);
            pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  
            const hasLeftSpill = startPage > 1;
            const hasRightSpill = totalPages - endPage > 0;
            const spillOffset = maxPages - (endPage - startPage + 1);
  
            if (hasLeftSpill && !hasRightSpill) {
              const extraPages = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
              pages = [...extraPages, ...pages];
            } else if (!hasLeftSpill && hasRightSpill) {
              const extraPages = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
              pages = [...pages, ...extraPages];
            } else if (hasLeftSpill && hasRightSpill) {
              const leftSpill = Array.from({ length: spillOffset }, (_, i) => startPage - i - 1).reverse();
              const rightSpill = Array.from({ length: spillOffset }, (_, i) => endPage + i + 1);
              pages = [...leftSpill, ...pages, ...rightSpill];
            }
          }
  
          return pages;
        }
  
  
  }
