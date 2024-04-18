import { Tribunal } from "./tribunal";

export class Affaire {
    idAffaire: number;
    dateCreation: string; 
    dateCloture: string; 
    titre: string;
    description: string;
    etat: string;
    reference: string;
    phase: string;
    tribunalId: number; 

    constructor() {
        this.tribunalId = 0; 
    }

}