import CreateLender from "./CreateLender";

interface Lender extends CreateLender {
  id: string;
  lastTimeLent: Date;
}

export default Lender;