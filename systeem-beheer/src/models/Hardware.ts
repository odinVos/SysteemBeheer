interface Hardware
{
  id: string;
  name: string;
  barcode: string;
  totalCount: number;
  defectiveCount: number;
  deleted: boolean;
}

export default Hardware;