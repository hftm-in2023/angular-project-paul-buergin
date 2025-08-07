// Das 'export'-Schlüsselwort macht diese Schnittstelle in der gesamten Anwendung importierbar.
// Sie dient als zentraler "Vertrag" dafür, wie ein Blog-Objekt auszusehen hat.

export interface Blog {
  id: number;
  title: string;
  author: string;
  publishDate: string; // Oder Date, je nachdem, wie das Backend die Daten sendet
  content: string;
  comments: any[];
  createdAt: string;
  createdByMe: boolean;
  likedByMe: boolean;
  likes: number;
  updatedAt: string;
}