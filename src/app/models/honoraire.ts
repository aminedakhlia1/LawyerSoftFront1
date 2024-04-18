import { Affaire } from "./affaire";

export class Honoraire {
    idHonoraire: number;
    montant: number;
    date: string;
    titre: string;
    type: string;
    reste: string;  
    qrCodeImage: string;
    affaire: Affaire; 
  
   /* constructor(
      idHonoraire: number,
      montant: number,
      date: string,
      titre: string,
      type: string,
      reste: string,
      affaire: Affaire
    ) {
      this.idHonoraire = idHonoraire;
      this.montant = montant;
      this.date = date;
      this.titre = titre;
      this.type = type;
      this.reste = reste;
      this.affaire = affaire;
    }*/
  }
  