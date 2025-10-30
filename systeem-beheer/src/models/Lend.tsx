import Hardware from "./Hardware";
import Accessory from "./Accessory";

interface Lend {
  id: string;
  borrowerId: string;
  hardwareId: string;
  hardware: Hardware;
  startDate: Date;
  plannedReturnDate: Date;
  returnDate?: Date;
  accessoryIds: string[];
  accessories: Accessory[];
}

export default Lend;