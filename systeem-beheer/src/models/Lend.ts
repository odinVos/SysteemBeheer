import Borrower from './Borrower';
import Hardware from './Hardware';
import Accessory from './Accessory';

export interface Lend {
  id: string;
  borrower: Borrower;
  hardware: Hardware;
  accessories: Accessory[];
  startDate: Date; 
  plannedReturnDate: Date;
  returnDate: Date | null; 
}

export default Lend;