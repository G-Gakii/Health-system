export interface ProgramsInterface {
  id: string;
  enrollment_date: string;
  program: string;
  client?: string;
}

export default interface ClientInterface {
  age: number;
  client_id: string;
  fullName: string;
  gender: string;
  phone_number: string;
  programs: ProgramsInterface[];
  registration_date: string;
  updated_at: string;
}
