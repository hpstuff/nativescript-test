export class Offer {
    constructor(
        public Id: number,
        public Title: string,
        public Description: string,
        public ModifiedDate: string,
        public ImageURL: string,
        public IsHero: boolean
    ) { }
}