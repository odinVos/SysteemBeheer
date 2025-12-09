import Hardware from "./Hardware";

interface Accessory
{
  id: string;
  name: string;
  hardware: Hardware;
}

export default Accessory;