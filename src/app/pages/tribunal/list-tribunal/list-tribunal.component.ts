import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tribunal } from 'src/app/models/tribunal';
import { TribunalService } from 'src/app/services/tribunal.service';

@Component({
  selector: 'app-list-tribunal',
  templateUrl: './list-tribunal.component.html',
  styleUrls: ['./list-tribunal.component.scss']
})
export class ListTribunalComponent implements OnInit {

  public tribunal!: Tribunal[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  searchTerm: string;
  searchedTribunal: Tribunal[];

  constructor(private tribunalService: TribunalService,
              private router: Router) { }

  ngOnInit(): void {
    this.listTribunal();
  }

  //Afficher la liste des affaire
  public listTribunal() {
    this.tribunalService.listTribunal().subscribe(
      (data) => {
        this.tribunal = data;
        this.searchedTribunal = data;
      }
    );
  }


   /*Recherche dynamique*/
   public onSearch(): void {
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    if (searchTermLowerCase) {
      this.searchedTribunal = this.tribunal.filter(tr => {
        return (
          tr.nom.toLowerCase().includes(searchTermLowerCase) ||
          tr.type.toLowerCase().includes(searchTermLowerCase) ||
          tr.gouvernorat.toLowerCase().includes(searchTermLowerCase) ||
          tr.ville.toLowerCase().includes(searchTermLowerCase)   
        );
      });
    } else {
      this.searchedTribunal = this.tribunal.slice();
    }
  }

  onAddTribunal() {
    this.router.navigateByUrl('/add-tribunal');
  }

   /*Pagination*/
   getTotalPages() {
    const totalItems = this.tribunal.length;
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
